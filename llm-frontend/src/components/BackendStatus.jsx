function BackendStatus({ status }) {
  return (
    <div className={`status-pill ${status.online ? 'online' : 'offline'}`}>
      <span className="dot" />
      <div>
        <strong>{status.online ? 'Online' : 'Offline'}</strong>
        <small>{status.online ? status.model : status.detail}</small>
      </div>
    </div>
  )
}

export default BackendStatus
