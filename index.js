// Configuração inicial 
const express = require('express')
const app = express()
const port = 3000

const { Sequelize, DataTypes } = require('sequelize')
const task = require('./models/task')
const TaskModel = require('./models/task')

const sequelize = new Sequelize({
  "storage": "my-database.db",
  "dialect": "sqlite"
})

const tasks = TaskModel(sequelize, DataTypes)

app.use(express.json())






// Entregar porta 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    
  })