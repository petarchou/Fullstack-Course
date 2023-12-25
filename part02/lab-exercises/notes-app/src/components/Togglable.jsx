import { useState } from 'react'

const Togglable = (props) => {

    const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    console.log(props.children)
  }

    return (
        <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
            {props.children}
        </div>
        <button style={showWhenVisible} onClick={toggleVisibility}>cancel</button>
        </div>
    )
}

export default Togglable