let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let lists = require('./lists')
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.get('/users', (req, res) => {
  let { currentPage, pageSize, name } = req.query
  let total = lists.length
  currentPage = Number(currentPage) || 1
  pageSize = Number(pageSize) || 5
  let resList = []
  let len = (currentPage - 1) * pageSize
  resList = lists.slice(len, len + pageSize)
  if (name) {
    resList =  lists.find(item => item.name === name)
  }
  res.json({
    code: 'Y',
    data: {
      lists: resList,
      total
    }
  })
})
app.post('/addUser', (req, res) => {
  lists.push({
    ...req.body,
    id: lists[lists.length - 1].id + 1
  })
  res.json({
    code: 'Y',
    message: '添加成功!'
  })
})
app.delete('/userlists/:id', (req, res) => {
  console.log(req.params)
  let id  = Number(req.params.id)
  let exit = lists.some(item => item.id === id)
  if (exit) {
    lists = lists.filter(item => item.id !== id)
    res.json({
      code: 'Y',
      message: '删除成功!'
    })
  } else {
    res.json({
      code: 'N',
      message: '删除失败!'
    })
  }
})
app.put('/update/:id', (req, res) => {
  let id  = req.params.id
  console.log(id)
  let data = req.body
  let one = lists.find(item => item.id == id)
  if (one) {
    one.name = data.name
    one.age = data.age
    res.json({
      code: 'Y',
      message: '修改成功!'
    })
  } else {
    res.json({
      code: 'N',
      message: '修改失败!'
    })
  }
})
app.listen(3000, () => {console.log('server is running...')})