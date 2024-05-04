//? CODIGO ANTERIOR
//const http = require("http")
//const characters = require("./utils/data")
//const getCharById = require("./controllers/getCharById")
/*http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const { url } = req

    if(url.includes('/rickandmorty/character')) {
        const id = Number(url.split('/').pop())

        getCharById(res, id)
    }

}).listen(PORT, 'localhost')*/
//? CODIGO ANTERIOR

const server = require('./app')
const PORT = 3001
const { conn } = require('./DB_connection')

/*try {
    server.listen(PORT, async () => {
        console.log(`Server raised in port: ${PORT}`)
        await conn.sync({})
    })
} catch (error) {
    console.log(error)
}*/

conn
    .sync({ alter: true })
    .then(() => {
        server.listen(PORT, async () => {
            console.log(`Server raised in port: ${PORT}`)
            await conn.sync({})
        })
    })
    .catch((error) => {
        console.log(error)
    })

