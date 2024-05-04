const { Favorite } = require('../DB_connection')

exports.postFav = async (req, res) => {
    const { id, name, status, image, species, gender } = req.body
    try {
        
        if (!id || !name || !status || !image || !species || !gender) {
            return res.status(401).json({ error: 'FALTAN DATOS' })
        }

        const [charFav, created] = await Favorite.findOrCreate({
            where: { id },
            defaults: {
                name,
                origin: "Earth",
                status,
                image,
                species,
                gender
            }
        })

        if (!created) {
            return res.status(409).json({ error: 'EL PERSONAJE YA SE ENCUENTRA EN FAVORITOS' })
        }

        const allFavs = await Favorite.findAll()
        res.status(200).json(allFavs)

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}