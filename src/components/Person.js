const Person = ({ name, number, id, handleDelete, last }) => {
  return (
    <div className='entry flex' style={{ border: last ? "none": "" }}>
      <div className='info'>
        <div className="name">
          {name}
        </div>
        <div className="number">
          {number}
        </div>
      </div>
      <button className="delete-entry" onClick={() => handleDelete(name, id)}>delete</button>
    </div>
  )
}

export default Person