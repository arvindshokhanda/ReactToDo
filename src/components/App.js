import React, { useState } from "react";
import "../App.css";
import TodoMain from "./TodoMain";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
   let time = new Date().toLocaleTimeString();
   const [currentTime, setCurrentTime] = useState(time);
   const updateTime = () => {
      time = new Date().toLocaleTimeString();
      setCurrentTime(time);
   };
   setInterval(updateTime, 1000);
   return (
      <div className="App container ">
         <h2 id="timer">{currentTime}</h2>
         <TodoMain />
      </div>
   );
}

export default App;
