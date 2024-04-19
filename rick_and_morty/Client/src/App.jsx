import './App.css';
import Nav from './components/Nav/Nav.jsx';
import Cards from './components/Cards/Cards.jsx';
//import SearchBar from './components/SearchBar/SearchBar.jsx';
//import characters, { } from './data.js';
import { useEffect, useState } from 'react';
import axios from "axios"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import About from './components/About/About.jsx';
import Detail from './components/Detail/Detail.jsx';
import Form from './components/Form/Form.jsx';
import Favorites from "./components/Favorites/Favorites.jsx"
function App() {
   const [characters, setCharacters] = useState([])
   const navigate = useNavigate()
   const [access, setAccess] = useState(false)

   //const EMAIL = "nadixpeque@gmail.com" //? ya no se necesita
   //const PASSWORD = "pass1234" //? esto tampoco

   const login = (userData) => {

      /*if (userData.email === EMAIL && userData.password === PASSWORD) {
         setAccess(true)
         navigate("/home")
      }*/ //? código login M2
      try{
      const { email, password } = userData
      const URL = 'http://localhost:3001/rickandmorty/login/'
      axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
         const { access } = data
         setAccess(data)
         access && navigate('/home')
      })
   }catch(error){
      if (error.response.status === 404) {
         window.alert ('Tu contraseña no es correcta. Inténtalo nuevamente')
      }

   }
   }

   useEffect(() => {
      !access && navigate("/")
   }, [access, navigate])

   const { pathname } = useLocation()

   const onClose = (id) => {
      let filteredCharacters = characters.filter((ch) => {
         return ch.id !== id
      })
      setCharacters(filteredCharacters)
   } 
   //? código de M2
   /*function onSearch(id) {
      axios(`http://localhost:3001/rickandmorty/character/${id}`).then(
         ({ data }) => {
            if (data.name) {
               setCharacters((oldChars) => [...oldChars, data]);
            } else {
               window.alert('¡No hay personajes con este ID!');
            }
         }
      );
   }*/ //? código de M2

   const onSearch = async (id) => {
      try{
         const {data} = await axios(`http://localhost:3001/rickandmorty/character/${id}`)
         setCharacters((oldChars) => [...oldChars, data])

      } catch (error){
         window.alert('¡No hay personajes con este ID!')
      }
   }

   return (
      <div className='App'>
         {/*<SearchBar onSearch={(characterID) => window.alert(characterID)} />*/}
         {pathname !== "/" && <Nav onSearch={onSearch} />}
         <Routes>
            <Route path="/" element={<Form login={login} />}></Route>
            <Route path="/home" element={<Cards characters={characters} onClose={onClose} />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
            <Route path="/favorites" element={<Favorites />}></Route>
         </Routes>
         {/*<Cards characters={characters} onClose={onClose} />*/}
      </div>
   );
}

export default App;
