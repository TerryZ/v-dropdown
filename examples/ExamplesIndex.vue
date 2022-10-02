<template>
  <div class="p-5">
    <section>
      <h1>v-dropdown examples</h1>
    </section>

    <hr>

    <h5 class="mt-5 mb-3">
      默认
    </h5>
    <p>
      <dropdown>
        <template #caller>
          <button
            type="button"
            class="btn btn-secondary"
          >
            dropdown
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
    </p>

    <h5 class="mt-5 mb-3">
      关闭循环切换
    </h5>
    <p>
      <dropdown :toggle="false">
        <template #caller>
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
    </p>

    <h5 class="mt-5 mb-3">
      无边框样式
    </h5>
    <p>
      <dropdown :border="false">
        <template #caller>
          <button
            type="button"
            class="btn btn-secondary"
          >
            dropdown
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
    </p>

    <h5 class="mt-5 mb-3">
      禁用
    </h5>
    <div class="custom-control custom-switch mb-3">
      <input
        type="checkbox"
        class="custom-control-input"
        id="customSwitch1"
        v-model="disabled"
      >
      <label
        class="custom-control-label"
        for="customSwitch1"
      >禁止打开 dropdown</label>
    </div>
    <p>
      <dropdown :disabled="disabled">
        <template #caller>
          <button
            type="button"
            class="btn btn-secondary"
          >
            dropdown
          </button>
        </template>
        <div class="p-5">
          <div>0123456789</div>
          <div>0123456789</div>
          <div>0123456789</div>
        </div>
      </dropdown>
    </p>

    <h5 class="mt-5 mb-3">
      手动显示/关闭 dropdown
    </h5>
    <p>
      <dropdown
        :manual="true"
        @show="showChange"
        ref="dropdownInput"
      >
        <template #caller>
          <input
            type="text"
            class="form-control"
            v-model="query"
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
    </p>

    <h5 class="mt-5 mb-3">
      对齐方向
    </h5>
    <div class="row">
      <div class="col-md-4">
        <div>左对齐</div>
        <dropdown>
          <template #caller>
            <button
              type="button"
              class="btn btn-secondary"
            >
              dropdown
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
        <div>居中对齐</div>
        <dropdown align="center">
          <template #caller>
            <button
              type="button"
              class="btn btn-secondary"
            >
              dropdown
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
        <div>右对齐</div>
        <dropdown align="right">
          <template #caller>
            <button
              type="button"
              class="btn btn-secondary"
            >
              dropdown
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
      嵌入页面
    </h5>
    <p>
      <dropdown :embed="true">
        <template #caller>
          <button
            type="button"
            class="btn btn-secondary"
          >
            dropdown
          </button>
        </template>
        <div class="p-5">
          <div>0123456789</div>
          <div>0123456789</div>
          <div>0123456789</div>
        </div>
      </dropdown>
    </p>

    <h5 class="mt-5 mb-3">
      覆盖模式
    </h5>
    <p>
      <dropdown
        :border="false"
        :cover="true"
      >
        <template #caller>
          <button
            type="button"
            class="btn btn-secondary"
          >
            dropdown
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
    </p>

    <h5 class="mt-5 mb-3">
      鼠标右键
    </h5>
    <dropdown
      :right-click="true"
      :toggle="false"
      :full-width="true"
    >
      <template #caller>
        <div
          class="card text-center bg-light text-secondary justify-content-center"
          style="height: 20rem;font-size: 30px;"
        >
          鼠标右键点击
        </div>
      </template>
      <div class="p-5">
        <div>0123456789</div>
        <div>0123456789</div>
        <div>0123456789</div>
      </div>
    </dropdown>

    <h5 class="mt-5 mb-3">
      指定宽度
    </h5>
    <div>
      <dropdown :width="350">
        <template #caller>
          <button
            type="button"
            class="btn btn-secondary"
          >
            dropdown
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
import { ref, watch } from 'vue'
import Dropdown from '@/Dropdown'

const show = ref(false)
const query = ref('')
const disabled = ref(false)

const dropdownInput = ref(null)

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function showChange (state) {
  show.value = state
}

watch(query, val => {
  if (val === '3') {
    dropdownInput.value.visible()
  } else {
    if (show.value) {
      dropdownInput.value.visible()
    }
  }
})
</script>
