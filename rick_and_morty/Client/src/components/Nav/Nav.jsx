import SearchBar from "../SearchBar/SearchBar"
import { useNavigate } from "react-router-dom"
import styled from "./Nav.module.css"

const Nav = ({ onSearch }) => {

    const navigate = useNavigate()

    return (
        <div className={styled.container}>
            <button onClick={() => navigate("/home")} className={styled.button}>HOME</button>
            <button onClick={() => navigate("/about")}className={styled.button}>ABOUT</button>
            <button onClick={() => navigate("/favorites")}className={styled.button}>FAVORITES</button>
            <SearchBar onSearch={onSearch} />
        </div>
    )
}

export default Nav