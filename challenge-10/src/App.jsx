import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementBy } from './slices/counterSlice';
import { push, pop } from './slices/stackSlice';

export const App = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.counter);
  const { stack } = useSelector((state) => state.stack);

  const [incrementValue, setIncrementValue] = useState(0);
  const [stackValue, setStackValue] = useState('');

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleIncrementBy = () => {
    dispatch(incrementBy(Number(incrementValue)));
    setIncrementValue(0);
  };

  const handlePush = () => {
    dispatch(push(stackValue));
    setStackValue('');
  };

  const handlePop = () => {
    dispatch(pop());
  };

  return (
    <>
      <div>
        <h1>CHALLENGE 10 - REDUX</h1>
        <p>Contador: {count}</p>
        <button onClick={handleIncrement}>Increment (+1)</button>
        <button onClick={handleDecrement}>Decrement (-1)</button>
        <input 
          type="number" 
          value={incrementValue} 
          onChange={(e) => setIncrementValue(e.target.value)} 
        />
        <button onClick={handleIncrementBy}>Increment</button>
      </div>
      <div>
        <p>Stack: {JSON.stringify(stack)}</p>
        <input 
          type="text" 
          value={stackValue} 
          onChange={(e) => setStackValue(e.target.value)} 
        />
        <button onClick={handlePush}>Push</button>
        <button onClick={handlePop}>Pop</button>
      </div>
    </>
  );
};