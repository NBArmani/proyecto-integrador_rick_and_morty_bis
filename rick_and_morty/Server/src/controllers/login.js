/*const users = require('../utils/users')

const login = (req, res) => {
    const { email, password } = req.query
    let access = false

    users.forEach((user) => {
        if (user, email === email && user.password === password) {
            return access = true
        }
    })
    return res.status(200).json({ access })
}

module.exports =  login */
const { User } = require('../DB_connection')

exports.login = async (req, res) => {
    const {email, password} = req.query
    try {
        if (!email || !password) return res.status(400).json({ error: 'FALTAN DATOS' })

        const user = await User.findOne({
            where: { email },
        })

        if (!user) return res.status(404).json({ error: 'USUARIO NO ENCONTRADO' })

        return user.password === password ?
            res.status(200).json({ access: true })
            : res.status(403).json({ error: "CONTRASEÑA INCORRECTA" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}