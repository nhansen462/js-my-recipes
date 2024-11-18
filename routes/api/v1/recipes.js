const router = require('express').Router()

const recipes = require('./../../../data/recipes.json')

router.get('/', async (_, response) => {
    response.send(recipes.map(({id, title, image, prepTime, difficulty}) => ({ id, title, image, prepTime, difficulty })))
})

router.post('/recipe/add', async (request, response) => {
    const { title, image, ingredients, instructions, prepTime, difficulty } = request.body
    const id = recipes.length + 1
    recipes.push({id, title, image, ingredients, instructions, prepTime, difficulty})
    response.send(recipes[id])
})

router.get('/recipe/:id', async (request, response) => {
    const { id } = request.params
    const found = recipes.find(data => data.id.toString() === id)
    if(!found) response.send({error: `Cannot find a recipe with id ${id}`})
    else response.send(found)
})

module.exports = router