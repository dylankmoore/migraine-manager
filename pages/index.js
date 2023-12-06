/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      id="welcome"
      style={{
        height: '70vh',
        padding: '30px',
        maxWidth: '600px',
      }}
    >
      <br />

      <h1>Hello {user.displayName}! </h1><br />
      <p>Welcome to Migraine Manager, an app designed to empower you on your journey to better health by diligently tracking your migraines and daily routines. By recording your headaches and lifestyle choices, Migraine Manager aims to help you unravel the triggers behind your migraines. Take control of your well-being and minimize migraine occurences with Migraine Manager today!
      </p><br />

      Click below to either create a new log or view your log history:<br /><br />
      <Button variant="danger" id="create" type="button" size="medium" className="copy-btn" href="/logs/new">
        Create A Log
      </Button><p />
      <Button variant="danger" id="view" type="button" size="medium" className="copy-btn" href="/LogHistory"> View Log History
      </Button><br /><br />
    </div>
  );
}

export default Home;
