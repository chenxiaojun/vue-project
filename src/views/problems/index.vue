<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.ip" placeholder="IP" style="width: 200px" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.hostname" placeholder="主机名" style="width: 200px" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.severity" placeholder="严重等级" style="width: 200px" class="filter-item" @keyup.enter.native="handleFilter" />
      <div class="time-container">
        <date-picker-custom @change="handleDateChange" />
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
      </div>
    </div>
    <br>
    <el-table
      v-loading="listLoading"
      :data="list"
      fit
      style="width: 100%"
    >
      <el-table-column width="50" align="center">
        <div slot="header" slot-scope="scope">
          <el-checkbox
            v-model="globelCheckedAll"
            :indeterminate="isIndeterminateAll"
            @change="clickCheckAll(scope)"
          />
        </div>
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.isChecked"
            :indeterminate="scope.row.isIndeterminate"
            @change="handleSelectionChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table border fit :data="props.row.children">
            <!-- 展开内容表 -->
            <el-table-column label="选择" width="120" align="center">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.isChecked"
                  @change="clickCheckItemFn(props.row, scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column label="eventid" width="100px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.eventid }}</span>
              </template>
            </el-table-column>
            <el-table-column label="提示信息" align="center">
              <template slot-scope="{row}">
                <span>{{ row.message }}</span>
              </template>
            </el-table-column>
            <el-table-column label="检测结果" show-overflow-tooltip width="180px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.result }}</span>
              </template>
            </el-table-column>
            <el-table-column label="严重等级" width="93px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.severity_cn }}</span>
              </template>
            </el-table-column>
            <el-table-column label="开始时间" width="156px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.created_at }}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="IP" width="143px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主机名" width="143px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.hostname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="告警总数" align="center">
        <template slot-scope="{row}">
          <span>{{ row.total_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="灾难" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.level_disaster_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="严重" align="center">
        <template slot-scope="{row}">
          <span>{{ row.level_high_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="一般严重" show-overflow-tooltip align="center">
        <template slot-scope="{row}">
          <span>{{ row.level_average_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="告警" align="center">
        <template slot-scope="{row}">
          <span>{{ row.level_warning_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="信息" align="center">
        <template slot-scope="{row}">
          <span>{{ row.level_information_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消息" align="center">
        <template slot-scope="{row}">
          <span>{{ row.level_msg_number }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-button size="medium" type="primary" @click="handleRootCauseAnalysis">根因分析</el-button>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import DatePickerCustom from '@/components/DatePickerCustom'
import { fetchList } from '@/api/problem'
import { getFormatDateString } from '@/utils/date'
export default {
  name: 'Analysis',
  components: { Pagination, DatePickerCustom, getFormatDateString },
  data() {
    return {
      total: 7,
      list: [],
      listQuery: {
        page: 1,
        limit: 10,
        ip: undefined,
        hostname: undefined,
        start_date: null,
        end_date: null
      },
      listLoading: false,
      isIndeterminateAll: false,
      globelCheckedAll: false,
      severityMaps: { level_msg: '消息', level_information: '信息', level_warning: '告警', level_average: '一般严重', level_high: '严重', level_disaster: '灾难' }
    }
  },
  computed: {
    selectable() {
      return (row) => {
        return !this.selectedEventids.includes(row.eventid)
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleDateChange(value) {
      if (value) {
        this.listQuery.start_date = getFormatDateString(value[0])
        this.listQuery.end_date = getFormatDateString(value[1])
      } else {
        this.listQuery.start_date = null
        this.listQuery.end_date = null
      }
      this.handleFilter()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items.map(t => {
          return {
            ...t,
            isChecked: false,
            children: t.children.map(x => {
              return {
                ...x,
                isChecked: false,
                severity_cn: this.severityMaps[x.severity]
              }
            })
          }
        })
        this.total = response.data.total
        this.listLoading = false
      })
    },
    // 手动更改全选按钮的状态
    updateCheckedAllBtnStatus(value) {
      // 如果是选了勾选
      if (value) {
        // 检查是否所有数据都手动勾选了
        const isAllChecked = this.list.every(v => v.isChecked)
        if (isAllChecked) {
          this.globelCheckedAll = true
          this.isIndeterminateAll = false
        } else {
          this.isIndeterminateAll = true
        }
      } else {
        // 检查是否所有数据取消勾选了
        const isAllCancelChecked = this.list.every(v => v.isChecked === false)
        if (isAllCancelChecked) {
          this.globelCheckedAll = false
          this.isIndeterminateAll = false
        } else {
          this.isIndeterminateAll = true
        }
      }
    },
    // 全选所有
    clickCheckAll(item) {
      // 此处console的item无效，仅为了eslint校验，而slot-scope="scope"又是必传
      this.list = this.list.map(val => {
        val.isChecked = this.globelCheckedAll
        val.children = val.children.map(i => {
          i.isChecked = this.globelCheckedAll
          return i
        })
        return val
      })
      this.updateCheckedAllBtnStatus(this.globelCheckedAll)
    },
    // 每行选择事件
    handleSelectionChange(val) {
      val.children = val.children.map(i => {
        i.isChecked = val.isChecked
        return i
      })
      val.isIndeterminate = false
      this.updateCheckedAllBtnStatus(val.isChecked)
    },
    // 每个小项选择事件-单选
    clickCheckItemFn(row, item) {
      // 如果是选了勾选
      if (item.isChecked) {
        this.isIndeterminateAll = true
        // 检查是否所有数据都手动勾选了
        const isAllChecked = row.children.every(v => v.isChecked)
        if (isAllChecked) {
          row.isChecked = true
          row.isIndeterminate = false
        } else {
          row.isIndeterminate = true
        }
      } else {
        // 检查是否所有数据取消勾选了
        const isAllCancelChecked = row.children.every(v => v.isChecked === false)
        if (isAllCancelChecked) {
          row.isChecked = false
          row.isIndeterminate = false
          this.isIndeterminateAll = false
        } else {
          row.isIndeterminate = true
        }
      }
    },
    handleRootCauseAnalysis() {
      const selectedEventids = new Set()
      this.list.forEach(item => {
        if (item.isChecked) {
          selectedEventids.add(item.eventid)
        }
        item.children.forEach(child => {
          if (child.isChecked) {
            selectedEventids.add(child.eventid)
          }
        })
      })
      const selectedEventidsArray = [...selectedEventids].filter(t => t)
      console.log(selectedEventidsArray)
      this.turnToAnalysisPage(selectedEventidsArray)
    },
    turnToAnalysisPage(ids) {
      this.$router.push({
        path: 'analysis-demo2',
        query: {
          eventids: ids
        }
      })
    }
  }
}
</script>
<style scoped>
.filter-container {
  display: flex;
  align-items: center;
}

.time-container {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
</style>
