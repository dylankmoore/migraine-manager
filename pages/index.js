/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { Button, Card } from 'react-bootstrap';
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
      <div id="img">
        <Card style={{ margin: '5px' }}>
          <Card.Body>
            <img src="journal.jpg" alt="journaling" className="nav-logo" height="250" width="500" />
          </Card.Body>
        </Card>
      </div><br />

      <h1>Hello {user.displayName}! </h1><br />
      <p>Welcome to Migraine Manager - an app designed to better understand and manage your migraines. This app's purpose is to empower you on your journey to better health by diligently tracking your migraines and daily routines. By recording your headaches and lifestyle choices, Migraine Manager aims to help you unravel the triggers behind your migraines. Take control of your well-being and discover ways to minimize migraine occurences. Start your path towards a more balanced, migraine-free life with Migraine Manager today.
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
