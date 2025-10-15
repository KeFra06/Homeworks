import { useSelector } from 'react-redux';

function PostsList() {
  const posts = useSelector(state => state.posts.list.toArray());

  return (
    <div>
      <h3>Publicaciones</h3>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostsList;