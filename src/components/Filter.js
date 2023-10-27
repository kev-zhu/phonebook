const Filter = ({ value, onChange }) => {
  return (
    <div className="filter">
      <input value={value} onChange={onChange} placeholder='<ICON> Search for Contact By Name' />
    </div>)
}

export default Filter