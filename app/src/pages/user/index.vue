<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="ID">
        <el-input v-model="formInline.id" placeholder="请输入ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getData">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="addUser">新增</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="140">
        <template slot-scope="scope">
          <el-button @click="view(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button class="remove-text" @click="remove(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 删除的弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>您确认删除这条记录吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="removeSure">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="dialogFormTitle" @closed="dialogFormClose" width="500px" :visible.sync="dialogFormVisible">
      <el-form :model="addForm">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="addForm.age" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormCancel">取 消</el-button>
        <el-button type="primary" @click="dialogFormSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUserListsTabledata, removeUserItem, addUser, updateUser } from '@/api'
export default {
  name: 'user',
  data () {
    return {
      dialogVisible: false,
      dialogFormTitle: '新增用户',
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 5,
      dialogFormVisible: false,
      formLabelWidth: '100px',
      addForm: {
        name: '',
        age: ''
      },
      formInline: {
        user: '',
        id: ''
      },
      delId: ''
    }
  },
  methods: {
    dialogFormClose () {
      this.addForm = {
        name: '',
        age: ''
      }
    },
    async updateUser () {
      let params = {
        id: this.delId,
        ...this.addForm
      }
      let {data: {code, message}} = await updateUser(params)
      if (code === 'Y') {
        this.$message({
          message,
          type: 'success'
        })
        this.dialogFormVisible = false
        this.getData()
      }
    },
    async addUserItem () {
      let {data: {code, message}} = await addUser(this.addForm)
      if (code === 'Y') {
        this.$message({
          message,
          type: 'success'
        })
        this.dialogFormVisible = false
        this.getData()
      }
    },
    dialogFormCancel () {
      this.dialogFormVisible = false
    },
    dialogFormSure () {
      if (this.dialogFormTitle === '新增用户') {
        this.addUserItem()
      } else {
        this.updateUser()
      }
    },
    /**
     *  新增用户
     */
    addUser () {
      this.dialogFormTitle = '新增用户'
      this.dialogFormVisible = true
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.currentPage = 1
      this.getData()
    },
    handleCurrentChange (pageNum) {
      this.currentPage = pageNum
      this.getData()
    },
    async getData () {
      try {
        let options = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          ...this.formInline
        }
        let res = await getUserListsTabledata(options)
        let { data: { code, data: { lists, total } } } = res
        if (code === 'Y') {
          if (lists.length === 0 && this.currentPage > 1) {
            this.currentPage = this.currentPage - 1
            this.getData()
          }
          this.tableData = lists
          this.total = total
        }
      } catch (e) {
        console.log(e)
      }
    },
    view (row) {

    },
    edit (row) {
      /**
       * 克隆对象的几种方式
       * 1. Object.assign()
       * 2. 解构克隆
       * 3. JSON.parse(JSON.stringfy())
       * 4. 递归克隆
       * 1,2 都是浅拷贝
       * 3,4 都是深拷贝
       * 深拷贝指克隆出来一份数据与之前的没有任何关系
       */

      this.addForm = JSON.parse(JSON.stringify(row))
      this.delId = row.id
      this.dialogFormTitle = '编辑用户'
      this.dialogFormVisible = true
    },
    /**
     *  删除数据
     *  @param {number} id 删除数据的id
     */
    remove (id) {
      // 1. 弹出提示框
      this.dialogVisible = true
      // 2. 确定 拿到id 传给后台
      this.delId = id
    },
    async removeSure () {
      let { data: {code, message} } = await removeUserItem(this.delId)
      let type = ''
      if (code === 'Y') {
        type = 'success'
        this.getData()
      } else {
        type = 'warning'
      }
      this.$message({
        message,
        type
      })
      this.dialogVisible = false
    }
  },
  created () {
    this.getData()
  },
  mounted () {
  }
}
</script>

<style scoped>
.remove-text {
  color: red;
}
</style>
