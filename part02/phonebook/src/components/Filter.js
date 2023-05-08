const Filter = ({ value, handleChange }) => {
    return (<div style={{ margin: 10 + "px" }}>
        Filter By Name: <input value={value} onChange={handleChange}/>
    </div>);
}

export default Filter