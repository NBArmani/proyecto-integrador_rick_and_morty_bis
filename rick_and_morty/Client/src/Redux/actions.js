import { ADD_FAV, FILTER_FAV, ORDER_FAV, REMOVE_FAV } from "./actions-type";
import axios from "axios"

const add_fav = (character) => {
    /*return { //? parte del M2
        type: ADD_FAV,
        payload: character
    }*/ //? parte del M2
    
    const endpoint = 'http://localhost:3001/rickandmorty/fav'
    return async (dispatch) => {
        try {
            const { data } = await axios.post(endpoint, character)

            return dispatch({
                type: ADD_FAV,
                payload: data
            })

        } catch (error) {
            console.log(error)
        }
    }
}

const remove_fav = (id) => {
    /*return { //? parte del M2
        type: REMOVE_FAV,
        payload: id
    }*/ //? parte del M2
    
    const endpoint = `http://localhost:3001/rickandmorty/fav/${id}` 
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(endpoint)
            return dispatch({
                type: REMOVE_FAV,
                payload: data
            })
        } catch (error) {
            console.error('Error removing favorite: ', error)
            throw error
        }
    }
}
const filterFav = (gender) => {
    return {
        type: FILTER_FAV,
        payload: gender
    }
}

const orderFav = (order) => {
    return {
        type: ORDER_FAV,
        payload: order
    }
}

export { add_fav, remove_fav, filterFav, orderFav }