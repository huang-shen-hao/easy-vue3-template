<script setup lang="ts">
let props = defineProps({
  name: {
    required: true,
    type: String,
  },
  fill: {
    default: 'white',
    type: String,
  },
  width: {
    default: '20',
    type: String,
  },
  height: {
    default: '20',
    type: String,
  },
})
</script>

<template>
  <svg :width="props.width" :height="props.height" aria-hidden="true">
    <use :xlink:href="`#icon-${props.name}`" :fill="`${props.fill}`"></use>
  </svg>
</template>

<style scoped lang="scss"></style>
