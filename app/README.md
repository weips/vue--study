### 安装依赖
- cnpm i axios -S   cnpm i axios --save 安装生产依赖
- cnpm i less -D    cnpm i less --save-dev  安装开发依赖

### 查询接口
分页: 数据总条数 = 每页多少条数据 * 页数
      total      pageSize      currentPage
      后台给的    前端定义的      前端定义额
如果想实现分页的效果， 前端需要传 每页多少条数据， 和当前是第几页， 后台需要返回数据总条数。

前端：localhost:8080
localhost:8080/users
后台：localhost:3000/users