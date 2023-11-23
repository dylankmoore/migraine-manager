/* eslint-disable @next/next/no-img-element */
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      id="welcome"
      style={{
        height: '70vh',
        padding: '30px',
        maxWidth: '570px',
      }}
    >
      <br /><br />
      <h1>Hello {user.displayName}! </h1>
      <p>Welcome to Migraine Manager. This app will allow you to create logs of your migraines to track your pain level & daily habits. Migraine Manager is here to help you understand the causes of your migraines and keep track of your health.</p><br />
      Click below to either create a new log or view your log history:<br /><br />
      <Button variant="danger" id="create" type="button" size="medium" className="copy-btn" href="/logs/new">
        Create A Log
      </Button>
      <Button variant="danger" id="view" type="button" size="medium" className="copy-btn" href="/LogHistory"> View Log History
      </Button>
    </div>
  );
}

export default Home;
