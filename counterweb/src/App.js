import {useState} from 'react';
import './App.css';

function App() {
 
  let [counter, setCounter]=useState(5);

   const  addVal = ()=>{
    console.log(counter);

    if(counter<20){
      setCounter(counter+1);
    }
    

  }
  const reverce=()=>{
    if(counter>0){
      setCounter(counter-1); 
    }
    
  }
  return (
    <div className="App">
  <h1>Conter = {counter}</h1>

<button onClick={addVal}>next counter = {counter}</button>
<br />
<button onClick={reverce}>Reverce counter = {counter}</button>

    </div>
  );
}

export default App;
