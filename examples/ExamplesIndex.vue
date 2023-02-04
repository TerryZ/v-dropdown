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
        <dropdown>
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
        </dropdown>
      </div>
      <div class="col-md-6">
        <dropdown
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
        </dropdown>
      </div>
    </div>

    <h5 class="mt-5 mb-3">
      Disabled loop switch dropdown
    </h5>
    <div>
      <dropdown :toggle="false">
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
      </dropdown>
    </div>

    <h5 class="mt-5 mb-3">
      No border
    </h5>
    <div>
      <dropdown :border="false">
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
      </dropdown>
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
      <dropdown :disabled="disabled">
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
      </dropdown>
    </div>

    <h5 class="mt-5 mb-3">
      Manual open / close dropdown
    </h5>
    <div>
      <dropdown
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
      </dropdown>
    </div>

    <h5 class="mt-5 mb-3">
      Direction
    </h5>
    <div class="row">
      <div class="col-md-4">
        <div>Align left</div>
        <dropdown>
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
        </dropdown>
      </div>
      <div class="col-md-4">
        <div>Align center</div>
        <dropdown align="center">
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
        </dropdown>
      </div>
      <div class="col-md-4">
        <div>Align right</div>
        <dropdown align="right">
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
        </dropdown>
      </div>
    </div>

    <h5 class="mt-5 mb-3">
      Cover mode ?
    </h5>
    <div>
      <dropdown
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
      </dropdown>
    </div>

    <h5 class="mt-5 mb-3">
      Context menu
    </h5>
    <dropdown
      trigger="contextmenu"
      :toggle="false"
      :full-width="true"
    >
      <template #trigger>
        <div
          class="
            d-flex align-items-center rounded-3
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
    </dropdown>

    <h5 class="mt-5 mb-3">
      Specify width
    </h5>
    <div>
      <dropdown :width="350">
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
      </dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Dropdown from '@/'

const visible = ref(false)
const disabled = ref(false)

const dropdownInput = ref(null)

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
      dropdownInput.value.display()
    }
  }
}
</script>
