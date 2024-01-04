import React from "react";
import "./App.css";
import useStorage from "./useStorage";

function App() {
 const [name, setName] = useStorage("storedName", "");

 return (
   <>
     <div>
       <label>Name:</label>
       <input
         type="text"
         value={name}
         onChange={(e) => setName(e.target.value)}
       />
     </div>
   </>
 );
}

export default App;