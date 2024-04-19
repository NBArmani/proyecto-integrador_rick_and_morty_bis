import styled from "./About.module.css"

const About = ()=>{
    return (
        <div className={styled.container}>
        <h1 className={styled.h1}>¡Bienvenidos a mi página de Rick & Morty!</h1>
        
        <div className={styled.p}>
        <p>¡Hola a todos! Bienvenidos al Proyecto Integrador</p>
        <p>de Nadia Armani para Soy Henry.</p>
        <p>Esta página fue creada aplicando</p>
        <p>los conocimientos adquiridos a lo largo</p>
        <p>del aprendizaje sobre React y Redux.</p>
        </div>
        
        <h2 className={styled.h2}>¡Nos vemos en el proximo modulo!</h2>
        </div>
    )
}
export default About