const FormComponent = ({submit, name, number, nameChange, numberChange}) => {

    return(
        <form onSubmit={submit}>
        <div>
          {/* input component?? */}
          name: <input
            value={name}
            placeholder='add contact name...'
            onChange={nameChange}
          />
        </div>
        <div>
          number: <input
            value={number}
            placeholder='add contact number...'
            onChange={numberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
}

export default FormComponent