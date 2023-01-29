import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Navigate, NavLink } from 'react-router-dom';

import { useContext } from 'react';
import { Context } from './App';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

const Header = () => {
  const [show, setShow] = useContext(Context);
  const sessionStatus = JSON.parse(sessionStorage.getItem('user'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    confirmAlert({
      title: 'Confirm Logout',
      message: 'Are you sure to logout ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let val = false;
            sessionStorage.setItem('user', val);
            navigate('/');
          },
        },
        {
          label: 'No',
          onClick: () => navigate('/list-products'),
        },
      ],
    });
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" className="border">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="https://cdn.logo.com/hotlink-ok/logo-social.png"
              width={100}
              height={50}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              {sessionStatus ? (
                <Nav.Link as={NavLink} to="/list-products">
                  Products
                </Nav.Link>
              ) : null}

              <Nav.Link as={NavLink} to="/register-user">
                Register
              </Nav.Link>
            </Nav>

            {sessionStatus === false ? (
              <Nav className="ml-auto">
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  className="mr-auto"
                  onClick={() => setShow(true)}
                >
                  Login
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <Nav.Link as={NavLink} className="mr-auto" onClick={logout}>
                  Logout
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
