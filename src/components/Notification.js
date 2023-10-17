const Notification = ({ messageType, message }) => {
  const color = messageType === 'success' ? 'green' : messageType === 'error' ? 'red' : null
  const notificationStyle = color !== null ? {display: 'block', color: color} : {display: 'none'}

  return (
    <div className={'message'} style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification