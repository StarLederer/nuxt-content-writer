<template>
  <div class="_editor _select-file" @mouseenter="showSelector">
    <div class="label">
      <slot />
    </div>
    <ul>
      <li v-for="file in files" :key="file">
        <button @click="selectFile(file)">
          {{ file }}
        </button>
        <button class="secondary" @click="deleteFile(file)">
          X
        </button>
      </li>
      <li v-show="fileCreation.inProgress">
        <form
          class="new-file-form"
          :class="{ 'is-invalid': fileCreation.isInvalid }"
          @submit="validateAndCreateFile"
        >
          <input ref="fileName" type="text" placeholder="Name.txt">
          <input type="submit" value="Y" class="secondary">
        </form>
      </li>
      <li v-show="!fileCreation.inProgress">
        <button class="new-file" @click="openCreateFileEditor">
          New
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SelectFile',

  props: {
    storageFile: {
      type: String,
      default: 'editor-storage',
      require: true
    },
    storageKey: {
      type: String,
      default: 'storage'
    },
    dir: {
      type: String,
      default: '',
      require: true
    }
  },

  data () {
    return {
      fileCreation: {
        inProgress: false,
        isInvalid: false
      },
      files: []
    }
  },

  mounted () {
    this.fetchFiles()
  },

  methods: {
    fetchFiles () {
      fetch(`/_editor/${this.dir}`)
        .then(response => response.json())
        .then(data => (this.files = data.contents))
    },

    async selectFile (fileName) {
      await fetch(`/_editor/${this.storageFile}.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          key: this.storageKey,
          value: `${this.dir}/${fileName}`
        })
      })
    },

    async deleteFile (fileName) {
      await fetch(`/_editor/${this.dir}/${fileName}`, { method: 'DELETE' })
      this.fetchFiles()
    },

    async createFile (fileName) {
      await fetch(`/_editor/${this.dir}/${fileName}`, {
        method: 'POST'
      })

      this.fetchFiles()
    },

    validateAndCreateFile (e) {
      const fileName = this.$refs.fileName.value

      if (!fileName) {
        this.fileCreation.isInvalid = true
        this.$refs.fileName.focus()
      } else {
        this.$refs.fileName.value = ''
        this.$refs.fileName.focus()
        this.createFile(fileName)
      }

      e.preventDefault()
    },

    openCreateFileEditor () {
      this.fileCreation.inProgress = true
      this.fileCreation.isInvalid = false
      window.requestAnimationFrame(() => {
        this.$refs.fileName.focus()
      })
    },

    showSelector () {
      this.fetchFiles()
      if (!this.$refs.fileName.value) {
        this.fileCreation.inProgress = false
      } else {
        this.openCreateFileEditor()
      }
    }
  }
}
</script>

<style lang="scss">
._editor,
._editor * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

._select-file {
  display: inline-block;
  cursor: pointer;

  ul {
    position: absolute;
    list-style: none;
    display: none;
    z-index: 1;
  }

  .label,
  li {
    height: 2rem;
  }

  .label {
    display: flex;
    align-items: center;
  }

  li {
    background: #f8f8f8;
    border-radius: 0.2rem;
    display: flex;
    overflow: hidden;
  }

  button,
  input {
    padding: 0 1rem;

    background: none;
    border: none;
    border-radius: 0;

    text-align: left;

    transition: 50ms;

    &:first-child {
      flex: 1;
    }

    &.secondary {
      width: 2rem;
      padding: 0;
      color: #0008;
      text-align: center;
    }

    &.new-file {
      width: 100%;
      color: #0008;
    }

    &:hover {
      background: #f0f0f0;
      color: #000;
    }
  }

  form {
    display: flex;

    input[type="text"] {
      &::placeholder {
        color: rgba(0, 0, 0, 0.4);
      }

      &:focus {
        background: white;
        border: none;
        border: 1px solid black;
        border-right: none;
        outline: none;
      }
    }

    &.is-invalid {
      input[type="text"] {
        border-color: red;
      }

      &:focus-within {
        input[type="submit"] {
          background: red;
          color: white;
        }
      }
    }

    &:focus-within {
      input[type="submit"] {
        background: black;
        color: white;
      }
    }
  }

  &:hover ul {
    display: block;
  }
}
</style>
