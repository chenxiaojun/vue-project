<template>
  <div class="block">
    <el-date-picker
      v-model="value"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      @change="handleChange"
    />
  </div>
</template>

<script>
export default {
  name: 'DatePickerCustom',
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick: this.handleLastWeekShortcut
        }, {
          text: '最近一个月',
          onClick: this.handleLastMonthShortcut
        }, {
          text: '最近三个月',
          onClick: this.handleLastThreeMonthsShortcut
        }]
      },
      value: ''
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value) // 触发 change 事件，将 value 值传递给父组件
    },
    handleLastWeekShortcut(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    },
    handleLastMonthShortcut(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    },
    handleLastThreeMonthsShortcut(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }
}
</script>
