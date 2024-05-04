const { User } = require('../DB_connection')

exports.postUser = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) return res.status(400).json({ error: 'FALTAN DATOS' })

        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: { password }
        })

        if (!created) {
            return res.status(409).json({ error: 'Email already registered' })
        }

        return res.status(200).json({ created: 'Email registered successfully', user })

    } catch (error) {
        res.status(500).send({ error: error.message })
    }


}

