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

//Listar as tarefas 
app.get('/tasks', async (req, res) => {
    const allTasks = await tasks.findAll()
    res.json({ allTasks })
  })
  
  
  // Procurar tarefa por id 
  app.get('/tasks/:id', async (req, res) => {
    const taskId = req.params.id
    const task = await tasks.findByPk(taskId)
    console.log(req)
  
    res.json({ task })
  
  })
  
  // Criar tarefa 
  // 1.Receber informação no corpo
  // 2.Adicionar tarefa no banco de dados
  // 3.Resposta para o cliente:tarefa criada ou erro. 
  
  app.post('/tasks', async (req, res) => {
    const body = req.body
    const task = await tasks.create({ description: body.description, done: body.done })
    res.json(task)
  
  })
  
  // Apagar tarefa
  app.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id
    const task = await tasks.destroy({ where: { id: taskId } })
  
    res.send('Tarefa apagada')
  })
  
  // Atualizar tarefa
  
  app.put('/tasks/:id', async (req, res) => {
    const body = req.body
    const taskId = req.params.id
    const task = await tasks.findByPk(taskId)
    const result = await task.update({ description:body.description, done: body.done })
    res.send(result)
  })

// Entregar porta 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    
  })