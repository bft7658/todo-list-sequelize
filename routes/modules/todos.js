const express = require('express')
const router = express.Router()
const { Todo } = require('../../models')

// create
router.get('/new', (req, res) => {
  res.render('new')
})

// view detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  // 在 Sequelize 裡面，用 id 查詢的方法是 findByPk
  return Todo.findByPk(id)
    // 資料轉換成 plain object 的方法，只需要直接在傳入樣板前加上 toJSON()
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// edit
router.get('/:id/edit', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

module.exports = router