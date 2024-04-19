const server = require('../src/app')
const session = require('supertest')
const agent = session(server)

describe('Test de RUTAS', () => {
    let character1 = { id: 1, name: "Rick Sanchez" }
    let character2 = { id: 2, name: "Morty Smith" }

    describe('GET/rickandmorty/character/:id', () => {
        it('Responde con status: 200', async () => {
            await agent.get('/rickandmorty/character/1').expect(200)
        })

        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const { body } = await agent.get('/rickandmorty/character/1')
            expect(body).toHaveProperty("id")
            expect(body).toHaveProperty("name")
            expect(body).toHaveProperty("species")
            expect(body).toHaveProperty("gender")
            expect(body).toHaveProperty("status")
            expect(body).toHaveProperty("origin")
            expect(body).toHaveProperty("image")
        })

        it('Si hay un error, responde con status: 404', async () => {
            await agent.get('/rickandmorty/character/1000').expect(404)

        })
    })

    describe('GET/rickandmorty/login', () => {
        it('Si la información es correcta, debe devolver access: true', async () => {
            const { body } = await agent.get('/rickandmorty/login?email=nadiaBArmani@mail.com&password=pass1234')
            expect(body).toEqual({ access: true })
        })

        it('Si la información no es correcta, debe devolver access: false', async () => {
            const { body } = await agent.get('/rickandmorty/login?email=nadiaBArmani@mail.com&password=pass1234fsd')
            expect(body).toEqual({ access: false })
        })
    })

    describe('POST/rickandmorty/fav', () => {
        it('Debe devolver la información en un array', async () => {
            const { body } = await agent.post('/rickandmorty/fav').send(character1)
            expect(body).toBeInstanceOf(Array)
            expect(body).toContainEqual(character1)

        })

        it('Si envía un nuevo elemento, este debe ser devuelto en un arreglo que incluye un elemento enviado previamente', async () => {
            const { body } = await agent.post('/rickandmorty/fav').send(character2)
            expect(body).toContainEqual(character1)
            expect(body).toContainEqual(character2)
        })

    })

    describe('DELETE/rickandmorty/fav/:id', () => {
        it('Debe devolver un array con los elementos sin modificar si el ID no existe', async () => {
            const { body } = await agent.delete('/rickandmorty/fav/4')
            expect(body).toContainEqual(character1)
            expect(body).toContainEqual(character2)
        })

        it('Debe eliminar correctamente al personaje si se envía un ID válido', async () => {
            const { body } = await agent.delete('/rickandmorty/fav/2')
            const {body: newArray} = await agent.get('/rickandmorty/fav/2')
            expect(newArray).not.toContainEqual(character2)
            expect(body).toContainEqual(character1)
        })
    })
})