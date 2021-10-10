<template>
  <div>
    <button @click="test1">
      test 1
    </button>
    <button @click="test2">
      test 2
    </button>
  </div>
</template>

<script>
export default {
  name: 'SelectFile',

  methods: {
    async test1 () {
      const res = await fetch('/_editor')
      console.log(await res.json())
    },

    async test2 () {
      const res = await fetch(
        '/_editor',
        {
          method: 'POST',
          body: JSON.stringify({ tset: 5 })
        }
      )
      console.log(await res.text())
    }
  }
}
</script>
