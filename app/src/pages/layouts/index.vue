<template>
  <div class="layout">
    <el-container style="height: 100%; border: 1px solid #eee">
      <layoutAside :testMenu="testMenu" />
      <el-container>
        <!-- <layoutHeader /> -->
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import layoutAside from './layoutAside'
import layoutHeader from './layoutHeader'
export default {
  name: 'index',
  data () {
    return {
      testMenu: [
        {
          name: '首页',
          path: '/home'
        },
        {
          name: '用户列表',
          path: '/user'
        }
      ]
    }
  },
  methods: {
  },
  components: {
    layoutAside,
    layoutHeader
  }
}
</script>
<style scoped>
  .layout {
    height: 100%;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
</style>
