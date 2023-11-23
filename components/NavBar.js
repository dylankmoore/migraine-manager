/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar id="nav" collapseOnSelect expand="lg">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <img src="/migraine2.png" alt="logo" className="nav-logo" width="150" height="50" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>
                &nbsp;&nbsp;home &nbsp;&nbsp;• &nbsp;
              </Nav.Link>
            </Link>
            <Link passHref href="/logs/new">
              <Nav.Link>
                create a log  &nbsp; &nbsp;• &nbsp;
              </Nav.Link>
            </Link>
            <Link passHref href="/LogHistory">
              <Nav.Link>view log history  &nbsp; &nbsp; &nbsp;</Nav.Link>
            </Link>
            <Button
              id="signout"
              onClick={signOut}
            >SIGN OUT
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
