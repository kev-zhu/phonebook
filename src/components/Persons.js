import Person from './Person'

const Persons = ({ persons, filterName, handleDelete }) => {
  return (
    <div>
      {
        persons
          .filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
          .map(filtered => <Person key={filtered.id} name={filtered.name} number={filtered.number} id={filtered.id} handleDelete={handleDelete} />)
      }
    </div>
  )
}

export default Persons