import { ADD_FAV, FILTER_FAV, ORDER_FAV, REMOVE_FAV } from "./actions-type"

const initialState = {
    myFavorites: [],
    allCharacters: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_FAV:
            //? codigo del M2
            /*return {
                ...state,
                allCharacters: [...state.allCharacters, action.payload],
                myFavorites: [...state.myFavorites, action.payload]

            }*/
            //?  codigo del M2
            return {
                ...state,
                myFavorites: action.payload,
                allCharacters: action.payload
            }

        case REMOVE_FAV:
            //? código del M2
            /*const filteredFavs = state.myFavorites.filter((fav) => {
                return fav.id !== Number(action.payload)
            })
            return {
                ...state,
                myFavorites: filteredFavs
            }*/
            //? código del M2

            return { ...state, myFavorites: action.payload }

        case FILTER_FAV:

            if (action.payload === null) {
                return {
                    ...state,
                    myFavorites: state.allCharacters
                }
            } else {
                const filteredCharacters = state.allCharacters.filter((character) => {
                    return character.gender === action.payload
                })

                return {
                    ...state,
                    myFavorites: filteredCharacters
                }
            }

        case ORDER_FAV:
            const orderedFavorites = [...state.myFavorites]
            orderedFavorites.sort((a, b) => {
                if (action.payload === "A") {
                    return a.id - b.id
                } else if (action.payload === "D") {
                    return b.id - a.id
                } else {
                    return 0
                }
            })

            return {
                ...state,
                myFavorites: orderedFavorites
            }

        default:
            return state
    }
}

export default rootReducer