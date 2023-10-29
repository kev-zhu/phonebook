import Person from './Person'

const Persons = ({ persons, filterName, handleDelete }) => {
  const filteredList = persons
    .filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    .map((filtered, index, arr) => {
      if (index === arr.length - 1) {
        return <Person key={filtered.id} name={filtered.name} number={filtered.number} id={filtered.id} handleDelete={handleDelete} last={true}/>
      }
      return <Person key={filtered.id} name={filtered.name} number={filtered.number} id={filtered.id} handleDelete={handleDelete} />
  })

  return (
    <div className={filteredList.length > 0 ? 'entries' : ''}>
      {filteredList}
    </div>
  )
}

export default Persons