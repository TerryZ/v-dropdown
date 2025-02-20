<template>
  <div class="p-5">
    <div>0123456789</div>
    <div>0123456789</div>
    <div>0123456789</div>
    <div class="content-data-visible">
      visible: {{ visible }}
    </div>
    <div class="content-data-disabled">
      disabled: {{ disabled }}
    </div>
    <button
      class="btn btn-secondary content-data-close"
      @click="close"
    >
      Close
    </button>
  </div>
</template>

<script setup>
import { useDropdown } from '../src'

const { visible, disabled, close } = useDropdown()
</script>
