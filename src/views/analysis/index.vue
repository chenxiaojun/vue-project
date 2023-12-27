<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.source_ip" class="filter-item" placeholder="源IP" style="width: 200px;" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.target_ip" class="filter-item" placeholder="目的IP" style="width: 200px;" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.source_tag" class="filter-item" placeholder="源标签" clearable style="width: 200px" @change="handleFilter">
        <el-option v-for="item in sourceItems" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.target_tag" class="filter-item" placeholder="目的标签" clearable style="width: 200px" @change="handleFilter">
        <el-option v-for="item in targetItems" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>
    <br>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      style="width: 100%;"
    >
      <el-table-column label="源IP" width="143px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.source_ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="目的IP" width="143px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.target_ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="源标签" width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.source_tag }}</span>
        </template>
      </el-table-column>
      <el-table-column label="源标签文本" align="center" min-width="150px" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.source_msg }}</span>
        </template>
      </el-table-column>
      <el-table-column label="目的标签" width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.target_tag }}</span>
        </template>
      </el-table-column>
      <el-table-column label="目的标签文本" min-width="150px" show-overflow-tooltip align="center">
        <template slot-scope="{row}">
          <span>{{ row.target_msg }}</span>
        </template>
      </el-table-column>
      <el-table-column label="概率" width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.percent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row, $index}">
          <el-button type="primary" size="mini" @click="handleDelete(row, $index)">
            删除
          </el-button>
          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleUpdate(row)">
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="data" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="源IP" prop="source_ip">
          <el-input v-model="data.source_ip" :disabled="!isCreate" />
        </el-form-item>
        <el-form-item label="目的IP" prop="target_ip">
          <el-input v-model="data.target_ip" :disabled="!isCreate" />
        </el-form-item>
        <el-form-item label="源标签" prop="source_tag">
          <el-select v-model="data.source_tag" :disabled="!isCreate" class="filter-item" placeholder="请选择">
            <el-option v-for="item in sourceItems" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="源标签文本" prop="source_msg">
          <el-input v-model="data.source_msg" :disabled="!isCreate" />
        </el-form-item>
        <el-form-item label="目的标签" prop="target_tag">
          <el-select v-model="data.target_tag" :disabled="!isCreate" class="filter-item" placeholder="请选择">
            <el-option v-for="item in targetItems" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="目的标签文本" prop="target_msg">
          <el-input v-model="data.target_msg" :disabled="!isCreate" />
        </el-form-item>
        <el-form-item label="概率结果" prop="percent">
          <el-input-number v-model="data.percent" :precision="2" :step="0.05" :min="0" :max="1" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="isCreate ? createData() : updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { fetchList, fetchSourceTags, fetchTargetTags, createList, updateList } from '@/api/analysis'
export default {
  name: 'Analysis',
  components: { Pagination },
  data() {
    return {
      total: 7,
      list: [],
      listQuery: {
        page: 1,
        limit: 10,
        source_ip: undefined,
        target_ip: undefined,
        source_tag: undefined,
        target_tag: undefined
      },
      listLoading: false,
      sourceItems: [],
      targetItems: [],
      textMap: {
        update: '修改',
        create: '添加'
      },
      data: {
        id: undefined,
        source_ip: '',
        target_ip: '',
        source_tag: '',
        source_msg: '',
        target_tag: '',
        target_msg: '',
        percent: 1
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        source_ip: [{ required: true, message: '源IP不能为空', trigger: 'blur' }],
        target_ip: [{ required: true, message: '目的IP不能为空', trigger: 'blur' }],
        source_tag: [{ required: true, message: '源标签文本不能为空', trigger: 'change' }],
        target_tag: [{ required: true, message: '目的标签文本不能为空', trigger: 'change' }],
        percent: [{ required: true, message: '概率结果不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    isCreate() {
      return this.dialogStatus === 'create'
    }
  },
  created() {
    this.getList()
    this.getSourceTags()
    this.getTargetTags()
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetData() {
      this.data = {
        id: undefined,
        source_ip: '',
        target_ip: '',
        source_tag: '',
        source_msg: '',
        target_tag: '',
        target_msg: '',
        percent: 1
      }
    },
    handleCreate() {
      this.resetData()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.data = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleClick() {},
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    getSourceTags() {
      this.listLoading = true
      fetchSourceTags().then(response => {
        this.sourceItems = response.data.items
      })
    },
    getTargetTags() {
      this.listLoading = true
      fetchTargetTags().then(response => {
        this.targetItems = response.data.items
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createList(this.data).then(() => {
            this.list.unshift(this.data)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '已成功创建记录',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.data)
          updateList(data).then(() => {
            const index = this.list.findIndex(v => v.id === this.data.id)
            this.list.splice(index, 1, this.data)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '已成功修改记录',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    }
  }
}
</script>
