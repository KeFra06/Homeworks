import { useSelector } from 'react-redux';

function DirectMessagesList() {
  const dms = useSelector(state => state.directMessages.queue.toArray());

  return (
    <div>
      <h3>Mensajes Directos Pendientes</h3>
      <ul>
        {dms.map((dm, index) => (
          <li key={index}>{dm}</li>
        ))}
      </ul>
    </div>
  );
}

export default DirectMessagesList;