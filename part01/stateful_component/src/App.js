import { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0)
  const increaseBtn = {
    text: 'plus',
    handleClick() {
      return setCounter(counter + 1);
    },
  }
  const decreaseBtn = {
    text: 'minus',
    handleClick() {
      return setCounter(counter - 1);
    },
  }
  const resetBtn = {
    text: 'reset',
    handleClick() {
      console.log('clicked');
      return setCounter(0);
    },
  }
  return (
    <div>
      <Display counter={counter} />
      <Button btn={increaseBtn} />
      <Button btn={decreaseBtn} />
      <Button btn={resetBtn} />
    </div>
  )
}

const Display = ({ counter }) => (
  <div>{counter}</div>
)

const Button = ({ btn }) => (
    <button onClick={btn.handleClick}>
      {btn.text}
    </button>
  );

export default App