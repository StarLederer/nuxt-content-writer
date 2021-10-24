<template>
  <div class="_selectable-content">
    <SelectFile
      :dir="dir"
      :storage-file="storageFile"
      :storage-key="storageKey"
      @update="$fetch()"
    >
      Select content
    </SelectFile>
    <NuxtContent :document="content" />
  </div>
</template>

<script>
import SelectableContentProd from './SelectableContent.comm.vue'

export default {
  ...SelectableContentProd
}
</script>
