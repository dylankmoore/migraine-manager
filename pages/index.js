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
        padding: '30px',
        paddingTop: '30px',
        alignItems: 'center',
      }}
    >
      <Card style={{
        width: '36rem', margin: '10px', height: '7', borderRadius: '160px', borderColor: '#F2EFFB', backgroundColor: '#E0E0F8', alignItems: 'center', padding: '20px', marginTop: '0px',
      }}
      >
        <Card.Body />
        <h1>Hello {user.displayName}! </h1><br />

        <img src="/journaling.png" alt="create" width="350" height="230" /><br />
        <p><br />Welcome to Migraine Manager, an app designed to empower you on your journey to better health by diligently tracking your migraines and daily routines. By recording your headaches and lifestyle choices, Migraine Manager aims to help you unravel the triggers behind your migraines. Take control of your well-being and minimize migraine occurences with Migraine Manager today!
        </p><br />

        Click below to either create a new log or view your log history:<br /><br /><br />
        <Button id="create" href="/logs/new" style={{ textDecoration: 'none' }}>
          Create A Log
        </Button><p />
        <Button id="view" href="/LogHistory" style={{ textDecoration: 'none' }}> View Log History
        </Button>
      </Card>
      <div id="footer" />
      <footer style={{ fontSize: '12px' }}>© 2023 migraine manager by <a href="https://github.com/dylankmoore">dylankmoore</a></footer>
    </div>
  );
}

export default Home;
