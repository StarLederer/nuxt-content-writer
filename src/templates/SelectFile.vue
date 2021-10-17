<template>
  <div class="_editor _select-file" @mouseenter="showSelector">
    <div class="label">
      <slot />
    </div>
    <ul>
      <li
        v-for="file in files"
        :key="file"
        :class="{ selected: file === selectedFile }"
      >
        <button class="primary" @click="selectFile(file)">
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
          <input ref="fileName" class="primary" type="text" placeholder="Name.txt">
          <input class="secondary" type="submit" value="Y">
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
      files: [],
      selectedFile: ''
    }
  },

  mounted () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      fetch(`/_editor/${this.dir}`)
        .then(response => response.json())
        .then(data => (this.files = data.contents))

      fetch(`/_editor/${this.storageFile}.json?key=${this.storageKey}`)
        .then(response => response.text())
        .then((data) => {
          this.selectedFile = data
        })
    },

    async selectFile (fileName) {
      await fetch(`/_editor/${this.storageFile}.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          key: this.storageKey,
          value: `${fileName}`
        })
      })

      document.activeElement.blur()
      this.fetchData()
    },

    async deleteFile (fileName) {
      await fetch(`/_editor/${this.dir}/${fileName}`, { method: 'DELETE' })
      this.fetchData()
    },

    async createFile (fileName) {
      await fetch(`/_editor/${this.dir}/${fileName}`, {
        method: 'POST'
      })

      this.fetchData()
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
      this.fetchData()

      if (this.$refs.fileName !== document.activeElement) {
        this.fileCreation.inProgress = false
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

  .label,
  li {
    height: 2rem;
  }

  .label {
    display: flex;
    align-items: center;
  }

  // List
  ul {
    position: absolute;

    background: #f8f8f8;
    border-radius: 0.2rem;

    list-style: none;

    display: none;
    z-index: 1;
    overflow: hidden;
  }

  li {
    border-radius: 0.2rem;
    display: flex;
    overflow: hidden;

    &:first-child {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    &:last-child {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  // List item contents
  input,
  button {
    padding: 0 1rem;

    background: none;
    color: #000b;
    border: none;
    border-radius: 0;

    text-align: left;

    display: block;
    transition: 50ms;
    cursor: pointer;

    &:first-child {
      flex: 1;
    }

    &.secondary {
      width: 2rem;
      padding: 0;
      color: #0004;
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

  // Forms
  input[type="text"] {
    border: 1px solid transparent;
    cursor: text;

    &::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }

    &:focus {
      background: white;
      border-color: black;
      outline: none;
    }
  }

  input[type="submit"] {
    background: black;
    color: white;

    &:hover {
      background: #222;
    }
  }

  form {
    width: 100%;
    display: flex;

    &.is-invalid {
      border-color: red;

      &:focus-within {
        input[type="submit"] {
          background: red;
          color: white;
        }
      }
    }
  }

  // Selected
  li.selected {
    background: #f4f4f4;

    .primary {
      color: black;
      font-weight: bold;
    }
  }

  // Hover reveal
  &:hover,
  &:focus-within {
    ul {
      display: block;
    }
  }
}
</style>
