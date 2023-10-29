import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPhone } from '@fortawesome/free-solid-svg-icons'

const Person = ({ name, number, id, handleDelete, last }) => {
  return (
    <div className='entry flex' style={{ border: last ? "none" : "" }}>
      <div className='info'>
        <div className="name">
          {name}
        </div>
        <div className="number">
          <FontAwesomeIcon className='phone-icon' icon={faPhone} />
          <span className='phone-number'>{number}</span>
        </div>
      </div>
      <button className="delete-entry" onClick={() => handleDelete(name, id)}>
        <FontAwesomeIcon className='delete-icon' icon={faTrash} />
      </button>
    </div>
  )
}

export default Person