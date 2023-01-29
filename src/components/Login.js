import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import { Context } from './App';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getLoginDataAction } from '../action';

const Login = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useContext(Context);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    const timer = setTimeout(() => {
      navigate(-1);
    }, 300); //this timer is my small logic to close modal without breaking its animation
    return () => clearTimeout(timer);
  };

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState(false);

  const EmailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!EmailRegex.test(email) || pass === '') {
      setErr(true);
    } else {
      dispatch(getLoginDataAction('users', { email, pass }, navigate));
    }
  };

  return (
    <div >
      <Modal show={show} onHide={handleClose} className='modal-dialog-centered loginOuter'>
        <div className="modal-login ">
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Password"
                  onChange={(e) => setPass(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => onFormSubmit(e)}>
              Login
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
