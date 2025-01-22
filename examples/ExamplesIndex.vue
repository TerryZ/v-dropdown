<script setup>
import { ref } from 'vue'
import { Dropdown, DropdownContent, DropdownTrigger } from '@/'

const visible = ref(false)
const disabled = ref(false)

const dropdownInput = ref(null)
const toggleOff = ref(null)
const width = ref(350)
const height = ref(200)
const containerRounded = ref('medium')
const triggerRounded = ref('medium')
const gap = ref(5)
const align = ref('left')

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function visibleChange (val) {
  visible.value = val
}
function hoverVisibleChange (val) {
  console.log(val)
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
function changeSize () {
  if (width.value === 350) {
    width.value = 500
    height.value = 300
  } else {
    width.value = 350
    height.value = 200
  }
}
</script>

<template>
  <div class="p-5">
    <section>
      <h1>v-dropdown examples</h1>
    </section>

    <hr>

    <h5 class="mt-5 mb-3">
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
      <Dropdown class="abc">
        <template #trigger>
          <DropdownTrigger :rounded="triggerRounded" />
        </template>
        <DropdownContent :rounded="containerRounded">
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
      </Dropdown>
    </div>

    <h5 class="mt-5 mb-3">
      Trigger by hover
    </h5>
    <Dropdown
      trigger="hover"
      @visible-change="hoverVisibleChange"
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
    </Dropdown>

    <h5 class="mt-5 mb-3">
      Trigger by context menu
    </h5>
    <Dropdown
      trigger="contextmenu"
      :toggle="false"
      :full-width="true"
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
      No border and gap
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
    <div>
      <Dropdown :disabled="disabled">
        <template #trigger>
          <DropdownTrigger />
        </template>
        <DropdownContent>
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
      Direction
    </h5>
    <div class="d-flex gap-3">
      <div class="d-flex align-items-center">
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
      <div>
        <Dropdown :align="align">
          <template #trigger>
            <DropdownTrigger class="border border-4 rounded-3" />
          </template>
          <DropdownContent>
            <div class="p-5">
              <div>0123456789</div>
              <div>0123456789</div>
              <div>0123456789</div>
            </div>
          </DropdownContent>
        </Dropdown>
      </div>
    </div>

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

    <h5 class="mt-5 mb-3">
      Specify width
    </h5>
    <div>
      <Dropdown>
        <template #trigger>
          <DropdownTrigger />
        </template>
        <DropdownContent style="width: 350px;">
          <div class="p-5">
            <div>0123456789</div>
            <div>0123456789</div>
            <div>0123456789</div>
          </div>
        </DropdownContent>
      </Dropdown>
    </div>

    <h5 class="mt-5 mb-3">
      Container size change
    </h5>
    <div>
      <Dropdown>
        <template #trigger>
          <DropdownTrigger />
        </template>
        <DropdownContent>
          <div
            class="p-5"
            :style="{ width: width + 'px', height: height + 'px' }"
          >
            <div>0123456789</div>
            <div>0123456789</div>
            <div>0123456789</div>
            <button
              type="button"
              class="btn btn-secondary"
              @click="changeSize"
            >
              Change container size
            </button>
          </div>
        </DropdownContent>
      </Dropdown>
    </div>
  </div>
</template>
