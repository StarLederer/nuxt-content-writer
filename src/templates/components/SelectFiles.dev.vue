<template>
  <div class="_editor _select-file" @mouseenter="showSelector">
    <div class="label">
      <slot />
    </div>

    <div class="popup">
      <!-- Selected -->
      <ul>
        <li><span class="li-content is-title">Selection</span></li>

        <li
          v-for="file in missingSelected"
          :key="file + 'missing'"
          class="is-invalid is-selected"
        >
          <button class="li-content is-interactive" @click="toggleFile(file)">
            {{ file }} (missing)
          </button>
        </li>

        <li v-for="(file, index) in validSelected" :key="file + 'selected'">
          <button class="li-content is-interactive" @click="toggleFile(file)">
            {{ file }}
          </button>
          <button
            v-if="index - 1 >= 0"
            class="li-content is-interactive is-secondary"
            @click="swap(index, index - 1)"
          >
            u
          </button>
          <button
            v-if="index + 1 < validSelected.length"
            class="li-content is-interactive is-secondary"
            @click="swap(index, index + 1)"
          >
            d
          </button>
          <div v-else class="li-content is-secondary" />
        </li>
      </ul>

      <!-- Available -->
      <ul>
        <li><span class="li-content is-title">Files</span></li>
        <li
          v-for="file in files"
          v-show="!selectedFiles.includes(file)"
          :key="file"
        >
          <button class="li-content is-interactive" @click="toggleFile(file)">
            {{ file }}
          </button>
          <button class="li-content is-interactive is-secondary" @click="deleteFile(file)">
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
          <button class="li-content is-interactive new-file" @click="openCreateFileEditor">
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
      selectedFiles: []
    }
  },

  computed: {
    validSelected () {
      const valid = []
      for (let i = 0; i < this.selectedFiles.length; ++i) {
        if (this.files.includes(this.selectedFiles[i])) {
          valid.push(this.selectedFiles[i])
        }
      }
      return valid
    },

    missingSelected () {
      const missing = []
      for (let i = 0; i < this.selectedFiles.length; ++i) {
        if (!this.files.includes(this.selectedFiles[i])) {
          missing.push(this.selectedFiles[i])
        }
      }
      return missing
    }
  },

  mounted () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      fetch(`/_editor/${this.dir}`)
        .then(response => response.json())
        .then((data) => { this.files = data.contents })

      fetch(`/_editor/${this.storageFile}.json?key=${this.storageKey}`)
        .then(response => response.json())
        .then((data) => {
          this.selectedFiles = data.value ?? []
        })
    },

    async toggleFile (fileName) {
      // Make changes locally
      const i = this.selectedFiles.indexOf(fileName)
      if (i > -1) {
        this.selectedFiles.splice(i, 1)
      } else {
        this.selectedFiles.push(fileName)
      }

      // Post changes
      await this.postUpdate()

      // Update UI
      document.activeElement.blur()
      this.fetchData()
    },

    async swap (a, b) {
      // Make changes locally
      const tmp = this.selectedFiles[a]
      this.selectedFiles[a] = this.selectedFiles[b]
      this.selectedFiles[b] = tmp

      // Post changes
      await this.postUpdate()

      // Update UI
      document.activeElement.blur()
      this.fetchData()
    },

    async postUpdate () {
      await fetch(`/_editor/${this.storageFile}.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          key: this.storageKey,
          value: this.selectedFiles
        })
      })
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
