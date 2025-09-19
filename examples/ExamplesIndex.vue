<script setup>
import { ref } from 'vue'
import { Dropdown, DropdownContent, DropdownTrigger } from '@/'

import CustomContent from './CustomContent.vue'

const visible = ref(false)
const disabled = ref(false)
const disabledSlot = ref(false)

const dropdownInput = ref(null)
const toggleOff = ref(null)
const width = ref(450)
const height = ref(300)
const containerRounded = ref('medium')
const triggerRounded = ref('medium')
const gap = ref(5)
const align = ref('left')
const render = ref(true)
const zIndex = ref()

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const items = ref([])

function visibleChange (val) {
  visible.value = val
}
function handleVisibleChange (val) {
  console.log('visible: ', val)
}
function inputChange (e) {
  if (e.target.value === '3') {
    dropdownInput.value.display()
  } else {
    if (visible.value) {
      dropdownInput.value.close()
    }
  }
}
function toggleOffDisplay () {
  toggleOff.value.display()
}
function toggleOffClose () {
  toggleOff.value.close()
}
function changeContentSize () {
  if (width.value === 450) {
    width.value = 600
    height.value = 400
  } else {
    width.value = 450
    height.value = 300
  }
}
const onOpen = () => {
  console.log('open')
}
const onClose = () => {
  console.log('close')
}
const onOpened = () => {
  console.log('opened')
}
const onClosed = () => {
  console.log('closed')
}
function addItem () {
  items.value.push('aaabbbccc123456789')
}
function removeItems () {
  items.value = []
}
</script>

<template>
  <div class="p-2">
    <section>
      <h1>v-dropdown examples</h1>
    </section>

    <hr>

    <h5 class="mb-3">
      Trigger by click
    </h5>
    <div class="">
      <div class="mb-3 d-flex gap-3">
        <div class="d-flex align-items-center">
          Trigger rounded:
          <select
            class="form-select w-auto ms-3"
            v-model="triggerRounded"
          >
            <option value="small">
              small
            </option>
            <option value="medium">
              medium
            </option>
            <option value="large">
              large
            </option>
            <option value="pill">
              pill
            </option>
            <option value="circle">
              circle
            </option>
          </select>
        </div>
        <div class="d-flex align-items-center">
          Container rounded:
          <select
            class="form-select w-auto ms-3"
            v-model="containerRounded"
          >
            <option value="small">
              small
            </option>
            <option value="medium">
              medium
            </option>
            <option value="large">
              large
            </option>
          </select>
        </div>
      </div>
      <Dropdown
        class="abc"
      >
        <template #trigger>
          <DropdownTrigger :rounded="triggerRounded" />
        </template>
        <DropdownContent :rounded="containerRounded">
          <div class="p-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </DropdownContent>
      </Dropdown>
    </div>

    <h5 class="mt-5 mb-3">
      Trigger by hover
    </h5>
    <Dropdown
      trigger="hover"
    >
      <template #trigger>
        <DropdownTrigger rounded="circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-right-circle"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
            />
          </svg>
        </DropdownTrigger>
      </template>
      <template #default="{ close }">
        <DropdownContent>
          <div class="p-3">
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>
              <button
                type="button"
                class="btn btn-secondary"
                @click="close"
              >
                Close dropdown
              </button>
            </div>
          </div>
        </DropdownContent>
      </template>
    </Dropdown>

    <h5 class="mt-5 mb-3">
      Trigger by context menu(Block display)
    </h5>
    <div class="d-flex align-items-center mb-3">
      Align direction:
      <select
        class="form-select w-auto ms-3"
        v-model="align"
      >
        <option value="left">
          Left
        </option>
        <option value="center">
          Center
        </option>
        <option value="right">
          Right
        </option>
      </select>
    </div>
    <Dropdown
      trigger="contextmenu"
      :toggle="false"
      :align="align"
      block
      class=""
    >
      <template #trigger>
        <div
          class="
            d-flex align-items-center rounded-3 w-100
            bg-light text-secondary justify-content-center
          "
          style="height: 20rem;font-size: 30px;"
        >
          Mouse right click this area
        </div>
      </template>
      <DropdownContent>
        <div class="p-5">
          <div>0123456789</div>
          <div>0123456789</div>
          <div>0123456789</div>
        </div>
      </DropdownContent>
    </Dropdown>

    <h5 class="mt-5 mb-3">
      Disabled loop switch dropdown
    </h5>
    <div class="d-flex">
      <Dropdown
        :toggle="false"
        class="me-3"
        ref="toggleOff"
      >
        <template #trigger>
          <input
            type="text"
            class="form-control"
          >
        </template>
        <DropdownContent>
          <div class="p-5">
            <div>0123456789</div>
            <div>0123456789</div>
            <div>0123456789</div>
          </div>
        </DropdownContent>
      </Dropdown>

      <button
        type="button"
        class="btn btn-light me-3"
        @click="toggleOffDisplay"
      >
        open
      </button>
      <button
        type="button"
        class="btn btn-light"
        @click="toggleOffClose"
      >
        close
      </button>
    </div>

    <h5 class="mt-5 mb-3">
      Borderless and gap
    </h5>
    <div class="d-flex gap-3">
      <div>
        <Dropdown :gap="gap">
          <template #trigger="{ visible: dropVisible, disabled: dropDisabled }">
            <DropdownTrigger rounded="pill">
              visible: {{ dropVisible }}, disabled: {{ dropDisabled }}
            </DropdownTrigger>
          </template>
          <DropdownContent :border="false">
            <div class="p-5">
              <div>0123456789012345678901234567890123456789</div>
              <div>0123456789012345678901234567890123456789</div>
              <div>0123456789012345678901234567890123456789</div>
              <div>0123456789012345678901234567890123456789</div>
              <div>0123456789012345678901234567890123456789</div>
              <div>0123456789012345678901234567890123456789</div>
              <div>0123456789012345678901234567890123456789</div>
              <div>0123456789012345678901234567890123456789</div>
              <div>0123456789012345678901234567890123456789</div>
              <div>0123456789012345678901234567890123456789</div>
              <div>0123456789012345678901234567890123456789</div>
              <div>0123456789012345678901234567890123456789</div>
            </div>
          </DropdownContent>
        </Dropdown>
      </div>

      <div class="d-flex align-items-center">
        Gap:
        <select
          class="form-select w-auto ms-3"
          v-model="gap"
        >
          <option :value="5">
            5px
          </option>
          <option :value="10">
            10px
          </option>
          <option :value="20">
            20px
          </option>
        </select>
      </div>
    </div>

    <h5 class="mt-5 mb-3">
      Disabled
    </h5>
    <div class="custom-control custom-switch mb-3">
      <input
        type="checkbox"
        class="custom-control-input me-2"
        id="customSwitch1"
        v-model="disabled"
      >
      <label
        class="custom-control-label"
        for="customSwitch1"
      >Disabled to open dropdown</label>
    </div>
    <div class="d-flex align-items-center mb-3">
      z-index:
      <select
        class="form-select w-auto ms-3"
        v-model="zIndex"
      >
        <option :value="undefined">
          unset
        </option>
        <option :value="1000">
          1000
        </option>
      </select>
    </div>
    <div>
      <Dropdown :disabled="disabled">
        <template #trigger>
          <DropdownTrigger />
        </template>
        <DropdownContent :z-index="zIndex">
          <div class="p-5">
            <div>0123456789</div>
            <div>0123456789</div>
            <div>0123456789</div>
          </div>
        </DropdownContent>
      </Dropdown>
    </div>

    <h5 class="mt-5 mb-3">
      Manual open / close dropdown
    </h5>
    <div>
      <Dropdown
        :manual="true"
        @visible-change="visibleChange"
        ref="dropdownInput"
      >
        <template #trigger>
          <input
            type="text"
            class="form-control"
            @input="inputChange"
            placeholder="try enter 3"
          >
        </template>
        <DropdownContent>
          <div class="p-5">
            <div
              v-for="item in list"
              :key="item"
              v-text="item"
            />
          </div>
        </DropdownContent>
      </Dropdown>
    </div>

    <h5 class="mt-5 mb-3">
      Trigger custom class
    </h5>
    <Dropdown>
      <template #trigger>
        <DropdownTrigger class="border rounded-4 bg-primary-subtle p-2" />
      </template>
      <DropdownContent>
        <div class="p-5">
          <div>0123456789</div>
          <div>0123456789</div>
          <div>0123456789</div>
        </div>
      </DropdownContent>
    </Dropdown>

    <h5 class="mt-5 mb-3">
      Cover mode ?
    </h5>
    <div>
      <Dropdown
        :border="false"
        :cover="true"
      >
        <template #trigger>
          <DropdownTrigger />
        </template>
        <DropdownContent>
          <div class="p-5">
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
          </div>
        </DropdownContent>
      </Dropdown>
    </div>

    <h5 class="mt-5 mb-1">
      Specify width with events
    </h5>
    <div class="text-body-tertiary mb-3">
      不指定 trigger 插槽，v-dropdown 应渲染默认的内置按钮
    </div>
    <div>
      <Dropdown
        :disabled="disabledSlot"
        @open="onOpen"
        @close="onClose"
        @opened="onOpened"
        @closed="onClosed"
        @visible-change="handleVisibleChange"
      >
        <DropdownContent style="width: 350px;">
          <div class="d-flex flex-column">
            <CustomContent />
            <div class="p-3">
              <button
                class="btn btn-dark"
                @click="disabledSlot = !disabledSlot"
              >
                change disabled
              </button>
            </div>
          </div>
        </DropdownContent>
      </Dropdown>
    </div>

    <h5 class="mt-5">
      Container size change
    </h5>
    <div class="my-3">
      <div
        v-for="item in items"
        :key="item"
        v-text="item"
      />
    </div>
    <div id="custom-container" />
    <div class="d-flex gap-3">
      <Dropdown
        class="trigger-size-change"
        append-to="#custom-container"
        v-if="render"
      >
        <template #trigger>
          <DropdownTrigger>
            <div class="d-flex flex-column">
              <div
                v-for="item in items"
                :key="item"
                v-text="item"
              />
            </div>
            <div v-if="!items.length">
              Open
            </div>
          </DropdownTrigger>
        </template>
        <DropdownContent class="container-size-change bg-primary-subtle">
          <div
            class="p-3 d-flex flex-column gap-3"
            :style="{ width: width + 'px', height: height + 'px' }"
          >
            <div class="d-flex gap-3">
              <button
                type="button"
                class="btn btn-secondary"
                @click="changeContentSize"
              >
                Change size
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                @click="addItem"
              >
                add item
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                @click="removeItems"
              >
                remove items
              </button>
            </div>

            <div
              v-for="item in items"
              :key="item"
              v-text="item"
            />
          </div>
        </DropdownContent>
      </Dropdown>
    </div>

    <div class="d-flex gap-3 my-3">
      <button
        type="button"
        class="btn btn-light"
        @click="render = true"
      >
        Render
      </button>
      <button
        type="button"
        class="btn btn-dark"
        @click="render = false"
      >
        Remove
      </button>
    </div>

    <div class="border p-3 rounded-3">
      <div>子组件独立使用时避免出现脚本错误的情况</div>

      <h5 class="my-3">
        Trigger
      </h5>
      <div>
        <DropdownTrigger />
      </div>

      <h5 class="mt-5 mb-3">
        Content
      </h5>
      <div>
        <DropdownContent>
          <div class="p-3">
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
            <div>0123456789012345678901234567890123456789</div>
          </div>
        </DropdownContent>
      </div>
    </div>
  </div>
</template>
