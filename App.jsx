import { useState } from 'react'
import './App.css'

const App = () =>{
  return (
  <>
    <h1>Hola</h1>
    <h2>Este es mi primer componente</h2>
  </>)
}

function FirstApp({h1, value}) {

  const [counter, setCounter] = useState(value);

  const sumCounter = () =>{
    return setCounter(counter + 1);
  }

  const handleSubstract = () => {
    return setCounter(counter - 1);
  }

  const handleReset = () =>{
    return setCounter(value);
  }

  return (
    <>
      <h1>{h1}</h1>
      <h2>click</h2> 
      <span>{counter}</span>
      <button onClick={() => sumCounter()}>+1</button>
      <button onClick={() => handleSubstract()}>-1</button>
      <button onClick={() => handleReset()}>Resetear</button>
    </>
        )
}

export default FirstApp
export {App}