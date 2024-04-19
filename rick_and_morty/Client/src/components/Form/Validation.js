const Validation = (data) => {
    let errors = []

    if (!data.email) {
        errors.email = "entry vacío"
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
        errors.email = "tu email no es válido"
    } else if (data.email.length > 35) {
        errors.email = "tu email es muy largo"
    }

    if (!data.password) {
        errors.password = "contraseña requerida"
    } else if (!/\d/.test(data.password)) {
        errors.password = "debe tener al menos un número"
    } else if (data.password.length < 6 || data.password.length > 10) {
        errors.password = "tu contraseña debe tener entre 6 y 10 caracteres"
    }

    return errors
}

export default Validation