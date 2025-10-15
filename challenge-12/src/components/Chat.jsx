import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk, startListeningMessagesThunk } from '../store/slices/auth/thunks';

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.firebase.messages);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    dispatch(startListeningMessagesThunk());
  }, [dispatch]);

  const handleSend = () => {
    if (newMessage.trim()) {
      dispatch(sendMessageThunk(newMessage));
      setNewMessage('');
    }
  };

  return (
    <div>
      <h1>Chat Contigo Mismo</h1>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            {msg.text} - <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
};

export default Chat;