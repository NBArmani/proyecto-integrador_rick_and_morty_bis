import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css"
import { add_fav, remove_fav } from "../../Redux/actions"
import { connect } from "react-redux"
import { useState, useEffect } from "react";


function Card(props) {
   const navigate = useNavigate()

   const [isFav, setIsFav] = useState(false)

   useEffect(() => {
      props.myFavorites.forEach((fav) => {
         if (fav.id === props.id) {
            setIsFav(true)
         }
      })
   }, [props.myFavorites, props.id])

   const handleFavorite = () => {
      isFav ? props.removeFav(props.id)
         : props.addFav({
            id: props.id,
            name: props.name,
            status: props.status,
            species: props.species,
            gender: props.gender,
            origin: props.origin,
            image: props.image
         })
      setIsFav(!isFav)
   }


   return (
      <div className={styles.tarjeta}>
         <button onClick={() => props.onClose(props.id)} className={styles.button}>X</button>
         <h2 className={styles.name}>{props.name}</h2>
         <div className={styles.heart}>
         {
            isFav ? (
               <button onClick={handleFavorite}>❤️</button>
            ) : (
               <button onClick={handleFavorite}>🤍</button>
            )
         }
         </div>
         <img src={props.image} alt='' onClick={() => navigate(`/detail/${props.id}`)} />
         
         <div className= {styles.description}>
         <h2>Status: {props.status}</h2>
         <h2>Specie: {props.species}</h2>
         <h2>Gender: {props.gender}</h2>
         <h2>Origin: {props.origin}</h2>
         </div>
      </div>
   );
}


const mapDispatchToProps = (dispatch) => {
   return {
      addFav: (character) => {
         dispatch(add_fav(character))
      },

      removeFav: (id) => {
         dispatch(remove_fav(id))
      },
   }
}

const mapStateToProps = (state) => {
   return { myFavorites: state.myFavorites }
}


export default connect(mapStateToProps, mapDispatchToProps)(Card)