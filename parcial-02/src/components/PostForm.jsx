import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost, savePosts } from '../redux/postsSlice';

function PostForm() {
  const [post, setPost] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post) {
      dispatch(addPost(post));
      dispatch(savePosts());
      setPost('');
    }
  };

  return (
    <div>
      <h3>Publicar Mensaje</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe tu mensaje"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          required
        />
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
}

export default PostForm;