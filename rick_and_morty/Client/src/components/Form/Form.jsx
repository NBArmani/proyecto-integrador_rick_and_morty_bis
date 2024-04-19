import React from "react"
import { useState } from "react"
import Validation from "./Validation"
import styled from "./Form.module.css"
const Form = ({ login }) => {

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        setErrors(Validation({ ...userData, [event.target.name]: event.target.value }))
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        login(userData)
    }

    return (
        <div className= {styled.body}>
            <form onSubmit={handleSubmit} className= {styled.form}>
                <div className={styled.email}>
                    <label> Email</label>
                    <input
                        type="text"
                        name="email"
                        value={userData.email}
                        onChange={handleChange} />
                    {errors.email && <span className={styled.errors} >{errors.email}</span>}
                </div>
                <div className={styled.password}>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange} />
                    {errors.password && <span className={styled.errors}>{errors.password}</span>}
                </div>
                <button type="submit" className={styled.button}>SUBMIT</button>
            </form>
        </div>
    )
}

export default Form