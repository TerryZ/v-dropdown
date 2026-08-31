<template>
  <Dropdown>
    <template #trigger>
      <DropdownTrigger />
    </template>
    <DropdownContent v-bind="$attrs">
      <slot> abc123 </slot>
    </DropdownContent>
  </Dropdown>
</template>

<script setup lang="ts">
import { Dropdown, DropdownContent, DropdownTrigger } from '../../'

defineOptions({
  inheritAttrs: false
})
</script>
