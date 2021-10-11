<template>
  <div class="_editor _select-file" @mouseenter="fetchFiles(); fileCreation.inProgress = false">
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
        <input ref="fileName" type="text">
        <button class="secondary" @click="createFile($refs.fileName.value)">
          Y
        </button>
      </li>
      <li v-show="!fileCreation.inProgress">
        <button class="new-file" @click="fileCreation.inProgress = true">
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
    storage: {
      type: String,
      default: 'editor-storage',
      require: true
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
        inProgress: false
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
      await fetch(`/_editor/${this.storage}.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selected: `${this.dir}/${fileName}` })
      })
    },

    deleteFile (fileName) {
      console.log(`Deleted ${this.dir}/${fileName}`)
    },

    createFile (fileName) {
      if (!fileName) { return }
      console.log(`Created ${this.dir}/${fileName}`)
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
    border-radius: 0.2rem;
    list-style: none;
    display: none;
    overflow: hidden;
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
    display: flex;
  }

  button,
  input {
    padding: 0 1rem;

    background: none;
    border: none;
    border-radius: 0.2rem;

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

  input {
    border: 1px solid black;
  }

  &:hover ul {
    display: block;
  }
}
</style>
