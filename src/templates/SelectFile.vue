<template>
  <div class="_editor _select-file" @mouseenter="fetchFiles">
    <div class="label">
      <slot />
    </div>
    <ul>
      <li
        v-for="file in files"
        :key="file"
        @click="selectFile(`${dir}/${file}`)"
      >
        {{ file }}
      </li>
      <li>New file</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SelectFile',

  props: {
    dir: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
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
    async selectFile (path) {
      await fetch('/_editor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path })
      })
    }
  }
}
</script>

<style>
._select-file * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

._select-file {
  display: inline-block;
  cursor: pointer;
}

._select-file ul {
  position: absolute;
  list-style: none;
  display: none;
  z-index: 1;
}

._select-file li,
._select-file .label {
  height: 2rem;
  display: flex;
  align-items: center;
}

._select-file li {
  padding: 0 1rem;
  background: #f8f8f8;
  border-radius: 0.2rem;
  transition: 50ms;
}

._select-file li:hover {
  background: #fafafa;
}

._select-file:hover ul {
  display: block;
}
</style>
