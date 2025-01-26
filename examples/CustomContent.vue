<template>
  <div class="p-5">
    <div>0123456789</div>
    <div>0123456789</div>
    <div>0123456789</div>
    <div>
      visible: {{ visible }}
    </div>
    <div>
      disabled: {{ disabled }}
    </div>
    <button
      class="btn btn-secondary"
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
