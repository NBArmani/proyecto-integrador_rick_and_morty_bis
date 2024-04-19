const axios = require("axios")

exports.getCharById = async (req, res) => {
    try {
        const { id } = req.params

        const { data } = await axios.get(`https://rym2.up.railway.app/api/character/${id}?key=NBArmani`)

        if (data) {
            const { id, name, gender, species, origin, image, status } = data

            const character = {
                id,
                name,
                gender,
                species,
                origin,
                image,
                status
            }
            return res.status(200).json(character)
        }
        res.status(404).send('Not found')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}




//? CÓDIGO ANTERIOR 
/*exports.getCharById = (req, res) => {
    const { id } = req.params 
    axios.get(`https://rym2.up.railway.app/api/character/${id}?key=NBArmani`)
        .then((resp) => {
            let { id, name, gender, species, origin, image, status } = resp.data
            const character = {
                id,
                name,
                gender,
                species,
                origin,
                image,
                status
            }

            return character.name
            ? res.json(character)
            : res.status(404).send('Not found')
        })
        //? CÓDIGO DE PROMESAS
        /*.then((resp) => {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(resp))
        }) //? CÓDIGO DE PROMESAS 

        .catch((reason) => {
            return res.status(500).send(reason.message)
        })
} */

