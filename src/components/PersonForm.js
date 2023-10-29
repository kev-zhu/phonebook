const PersonForm = ({ newName, newNumber, addEntry, handleNameChange, handleNumberChange }) => {
  return <>
    <form onSubmit={addEntry}>
      <h2>Creating a New Contact</h2>
      <div className='form-item'>
        Name:&nbsp;<input value={newName} onChange={handleNameChange} />
      </div>
      <div className='form-item'>
        Number:&nbsp;<input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div className='form-item'>
        <button type='submit'>Create</button>
      </div>
    </form>
  </>

}

export default PersonForm