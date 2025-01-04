<script setup>
import { ref } from 'vue'
import { Dropdown } from '@/index'

const visible = ref(false)
const disabled = ref(false)

const dropdownInput = ref(null)
const toggleOff = ref(null)
const width = ref(350)

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
  width.value = 500
}
</script>

<template>
  <div class="p-5">
    <section>
      <h1>v-dropdown examples</h1>
    </section>

    <hr>

    <h5 class="mt-5 mb-3">
      Default
    </h5>
    <div class="row">
      <div class="col-md-6">
        <Dropdown>
          <template #trigger>
            <button
              type="button"
              class="btn btn-secondary"
            >
              dropdown trigger
            </button>
          </template>
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
        </Dropdown>
      </div>
      <div class="col-md-6">
        <Dropdown
          trigger="hover"
          @visible-change="hoverVisibleChange"
        >
          <template #trigger>
            <button
              type="button"
              class="btn btn-secondary"
            >
              dropdown trigger(hover)
            </button>
          </template>
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
        </Dropdown>
      </div>
    </div>

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
        <div class="p-5">
          <div>0123456789</div>
          <div>0123456789</div>
          <div>0123456789</div>
        </div>
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
      No border
    </h5>
    <div>
      <Dropdown :border="false">
        <template #trigger="{ visible: dropVisible, disabled: dropDisabled }">
          <button
            type="button"
            class="btn btn-secondary"
          >
            visible: {{ dropVisible }}, disabled: {{ dropDisabled }}
          </button>
        </template>
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
      </Dropdown>
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
          <button
            type="button"
            class="btn btn-secondary"
          >
            dropdown trigger
          </button>
        </template>
        <div class="p-5">
          <div>0123456789</div>
          <div>0123456789</div>
          <div>0123456789</div>
        </div>
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
        <div class="p-5">
          <div
            v-for="item in list"
            :key="item"
            v-text="item"
          />
        </div>
      </Dropdown>
    </div>

    <h5 class="mt-5 mb-3">
      Direction
    </h5>
    <div class="row">
      <div class="col-md-4">
        <div>Align left</div>
        <Dropdown custom-trigger-class="border border-4 rounded-3">
          <template #trigger>
            <button
              type="button"
              class="btn btn-secondary"
            >
              dropdown trigger
            </button>
          </template>
          <div class="p-5">
            <div>0123456789</div>
            <div>0123456789</div>
            <div>0123456789</div>
          </div>
        </Dropdown>
      </div>
      <div class="col-md-4">
        <div>Align center</div>
        <Dropdown
          align="center"
          custom-container-class="bg-primary border-0"
        >
          <template #trigger>
            <button
              type="button"
              class="btn btn-secondary"
            >
              dropdown trigger
            </button>
          </template>
          <div class="p-5">
            <div>0123456789</div>
            <div>0123456789</div>
            <div>0123456789</div>
          </div>
        </Dropdown>
      </div>
      <div class="col-md-4">
        <div>Align right</div>
        <Dropdown align="right">
          <template #trigger>
            <button
              type="button"
              class="btn btn-secondary"
            >
              dropdown trigger
            </button>
          </template>
          <div class="p-5">
            <div>0123456789</div>
            <div>0123456789</div>
            <div>0123456789</div>
          </div>
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
          <button
            type="button"
            class="btn btn-secondary"
          >
            dropdown trigger
          </button>
        </template>
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
      </Dropdown>
    </div>

    <h5 class="mt-5 mb-3">
      Context menu
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
      <div class="p-5">
        <div>0123456789</div>
        <div>0123456789</div>
        <div>0123456789</div>
      </div>
    </Dropdown>

    <h5 class="mt-5 mb-3">
      Specify width
    </h5>
    <div>
      <Dropdown>
        <template #trigger>
          <button
            type="button"
            class="btn btn-secondary"
          >
            dropdown trigger
          </button>
        </template>

        <div
          class="p-5"
          style="width: 350px;"
        >
          <div>0123456789</div>
          <div>0123456789</div>
          <div>0123456789</div>
        </div>
      </Dropdown>
    </div>

    <h5 class="mt-5 mb-3">
      Container size change
    </h5>
    <div>
      <Dropdown>
        <template #trigger>
          <button
            type="button"
            class="btn btn-secondary"
          >
            dropdown trigger
          </button>
        </template>

        <div>
          <div
            class="p-5"
            :style="{ width: width + 'px' }"
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
        </div>
      </Dropdown>
    </div>
  </div>
</template>
