const Persons = ({ persons, filterName }) => {
  return (
    <div>
      {
        persons
          .filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
          .map(filtered => <div key={filtered.id}>{filtered.name} {filtered.number}</div>)
      }
    </div>
  )
}

export default Persons