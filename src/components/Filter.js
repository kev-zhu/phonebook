import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Filter = ({ value, onChange }) => {
  return (
    <div className="filter flex">
      <FontAwesomeIcon icon={ faSearch } className='search-icon' />
      <input value={value} onChange={onChange} placeholder='Search By Name' />
    
    </div>)
}

export default Filter