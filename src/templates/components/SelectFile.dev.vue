<template>
  <div class="_editor _select-file" @mouseenter="showSelector">
    <div class="label">
      <slot />
    </div>
    <div class="popup">
      <ul>
        <li
          v-if="selectedFile && !files.includes(selectedFile)"
          class="is-selected is-invalid"
        >
          <button class="li-content is-interactive" @click="deselectFile">
            {{ selectedFile }} (missing)
          </button>
        </li>
        <li
          v-for="file in files"
          :key="file"
          :class="{ 'is-selected': file === selectedFile }"
        >
          <button class="li-content is-interactive" @click="selectFile(file)">
            {{ file }}
          </button>
          <button
            class="li-content is-interactive is-secondary"
            @click="deleteFile(file)"
          >
            X
          </button>
        </li>
        <li v-show="fileCreation.inProgress">
          <form
            class="new-file-form"
            :class="{ 'is-invalid': fileCreation.isInvalid }"
            @submit="validateAndCreateFile"
          >
            <input
              ref="fileName"
              class="li-content"
              type="text"
              placeholder="Name.txt"
            >
            <input class="li-content is-interactive is-secondary" type="submit" value="Y">
          </form>
        </li>
        <li v-show="!fileCreation.inProgress">
          <button
            class="li-content is-interactive new-file"
            @click="openCreateFileEditor"
          >
            New
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
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

  methods: {
    fetchData () {
      fetch(`/_editor/${this.dir}`)
        .then(response => response.json())
        .then((data) => { this.files = data.contents })

      fetch(`/_editor/${this.storageFile}.json?key=${this.storageKey}`)
        .then(response => response.json())
        .then((data) => {
          this.selectedFile = data.value
        })
    },

    async selectFile (fileName) {
      this.selectedFile = fileName

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

      this.$emit('update')

      document.activeElement.blur()
      this.fetchData()
    },

    async deselectFile () {
      this.selectedFile = ''

      await fetch(`/_editor/${this.storageFile}.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          key: this.storageKey
        })
      })

      this.$emit('update')

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
