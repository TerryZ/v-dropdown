<template>
  <Dropdown>
    <template #trigger>
      <DropdownTrigger v-bind="$attrs">
        <slot />
        <template #append v-if="$slots.append">
          <slot name="append" />
        </template>
      </DropdownTrigger>
    </template>
    <DropdownContent> abc123 </DropdownContent>
  </Dropdown>
</template>

<script setup lang="ts">
import { Dropdown, DropdownContent, DropdownTrigger } from '../../'

defineOptions({
  inheritAttrs: false
})
</script>
