import Header from '../components/Header';
import PostForm from '../components/PostForm';
import PostsList from '../components/PostsList';
import NotificationForm from '../components/NotificationForm';
import NotificationsList from '../components/NotificationsList';
import DirectMessageForm from '../components/DirectMessageForm';
import DirectMessagesList from '../components/DirectMessagesList';

function HomePage() {
  return (
    <div>
      <Header />
      <PostForm />
      <PostsList />
      <NotificationForm />
      <NotificationsList />
      <DirectMessageForm />
      <DirectMessagesList />
    </div>
  );
}

export default HomePage;