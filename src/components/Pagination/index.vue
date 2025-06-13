<template>
  <!-- 分页组件 -->
  <div style="margin-top: 20px">
    <a-pagination
      v-model="current"
      :page-size-options="pageSizeOptions"
      :total="total"
      show-size-changer
      :page-size="currentPageSize"
      :hideOnSinglePage="hideOnSinglePage"
      @change="change"
      @showSizeChange="onShowSizeChange"
      :show-total="(total) => `共 ${total} 条`"
    />
  </div>
</template>
<script>
import { ref, watch } from "vue"
export default {
  name: "Pagination",
  props: {
    value: {
      type: Number
    },
    hideOnSinglePage: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 20
    },
    pageSizeOptions: {
      type: Array,
      default() {
        return ["10", "20", "50", "100", "200", "500", "1000"]
      }
    },
    showQuickJumper: {
      type: Boolean,
      default: true
    },
    showSizeChanger: {
      type: Boolean,
      default: true
    },
    simple: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ""
    },
    total: {
      type: Number,
      default: 1
    }
  },
  setup(props, { emit }) {
    const current = ref(props.value)
    const currentPageSize = ref(props.pageSize)

    watch(
      () => props.value,
      (val) => {
        current.value = val
      }
    )

    watch(
      () => props.pageSize,
      (val) => {
        currentPageSize.value = val
      }
    )

    const change = (pageno, pagesize) => {
      emit("change", pageno, pagesize)
    }

    const onShowSizeChange = (current, size) => {
      currentPageSize.value = size
      emit("onShowSizeChange", current, size)
    }

    return {
      current,
      currentPageSize,
      change,
      onShowSizeChange
    }
  }
}
</script>
