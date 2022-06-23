const express = require('express')
const router = express.Router()
const { Todo } = require('../../models')

// 定義首頁路由
router.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true,
    where: { UserId: req.user.id }
  })
    .then((todos) => { return res.render('index', { todos }) })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router