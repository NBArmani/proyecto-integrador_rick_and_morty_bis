//import { container, button, inputContainer } from "./styled"
import { useState } from "react";


export default function SearchBar({ onSearch }) {
   const [id, setId] = useState("")
   const handleChange = (event) => {
      setId(event.target.value)
   }
   const clearInput = () => {
      setId("")
   }
   return (
      <div>
         <input type='search' onChange={handleChange} value={id} placeholder="¿a quién deseas buscar?"/>
         <button onClick={() => {onSearch(id); clearInput()} }>Buscar</button>
      </div>
   );
}
