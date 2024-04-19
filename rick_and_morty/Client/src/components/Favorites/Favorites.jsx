import React, { useState } from "react"
import { connect, useDispatch } from "react-redux"
import Card from "../Card/Card"
import styled from "./Favorites.module.css"
import { filterFav, orderFav } from "../../Redux/actions"

const Favorites = ({ myFavorites }) => {
    const [aux, setAux] = useState(false)

    const dispatch = useDispatch()

    const handleOrder = (e) => {
        dispatch(orderFav(e.target.value))
        setAux(!aux)
    }

    const handleFilter = (e) => {
        const selectedValue = e.target.value
        if (selectedValue === "All") {
            dispatch(filterFav(null))
        } else {
            dispatch(filterFav(selectedValue))
        }
        setAux(false)
    }

    return (
        <div className={styled.container}>

            <div className={styled.order_and_filter}>
                <div>
                    <label>Ordenar por</label>
                    <select onChange={handleOrder}>
                        <option value="A">Ascendente</option>
                        <option value="D">Descendente</option>
                    </select>
                </div>
                {myFavorites.length >= 0 && (
                    <div>
                        <label>Filtrar por Género</label>
                        <select onChange={handleFilter}>
                            <option value="All">All</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Genderless">Genderless</option>
                            <option value="unknown">unknown</option>

                        </select>
                    </div>
                )}
            </div>


            {
                myFavorites && myFavorites.map((fav) => (
                    <Card
                        key={fav.id}
                        id={fav.id}
                        name={fav.name}
                        status={fav.status}
                        species={fav.species}
                        gender={fav.gender}
                        origin={fav.origin}
                        image={fav.image}
                    />
                ))
            }
        </div>
    )
}



const mapStateToProps = (state) => {
    return {
        myFavorites: state.myFavorites,
        allCharacters: state.allCharacters
    }
}

export default connect(mapStateToProps)(Favorites) 