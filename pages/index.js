import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      id="intro"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.displayName}! </h1>
      <p>Welcome to Migraine Manager. This app will allow you to create logs of your migraines to track your pain level & daily habits. Migraine Manager is here to help you understand the causes of your migraines and keep track of your health.</p>
    </div>
  );
}

export default Home;
