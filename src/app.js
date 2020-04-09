const express = require('express')
const cors = require('cors')

const { uuid } = require('uuidv4')

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

app.get('/repositories', (request, response) => {
  response.status(200).json(repositories)
})

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body
  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }
  repositories.push(repo)
  response.status(201).json(repo)
})

app.put('/repositories/:id', (request, response) => {
  const { title, url, techs } = request.body
  const { id } = request.params
  const repo = repositories.find((i) => i.id === id)

  if (repo) {
    repo.title = title
    repo.url = url
    repo.techs = techs

    response.status(201).json(repo)
  } else {
    response.status(400).send()
  }
})

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params
  const index = repositories.findIndex((i) => i.id === id)

  if (index >= 0) {
    repositories.splice(index, 1)
    response.status(204).send()
  } else {
    response.status(400).send()
  }
})

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params
  const repo = repositories.find((i) => i.id === id)

  if (repo) {
    repo.likes += 1
    response.status(201).json(repo)
  }
  response.status(400).send()
})

module.exports = app
