import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PostUserAction } from '../action';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [createPass, setCreatePass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [err, setErr] = useState(false);
  const EmailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (
      !EmailRegex.test(email) ||
      createPass.length < 3 ||
      confirmPass.length < 3
    ) {
      setErr(true);
    } else if (createPass !== confirmPass) {
      alert('Passwords does not match ');
    } else {
      dispatch(PostUserAction('users', { email, confirmPass }, navigate));
    }
  };

  return (
    <div className="regOuter">
      <form className="register ml-auto mr-auto" onSubmit={onFormSubmit}>
        <h4>Register</h4>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {err && email === '' ? (
            <label className="text-danger">Email Required!</label>
          ) : null}
          {err && email !== '' && !EmailRegex.test(email) ? (
            <label className="text-danger">Please enter a valid email!</label>
          ) : null}
        </div>
        <div className="form-group">
          <label>Create Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Create Password"
            onChange={(e) => setCreatePass(e.target.value)}
            value={createPass}
          />
          {err && createPass === '' ? (
            <label className="text-danger">Create Password is Required!</label>
          ) : null}
          {err && createPass.length > 0 && createPass.length < 3 ? (
            <label className="text-danger">Please enter a valid password</label>
          ) : null}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPass(e.target.value)}
            value={confirmPass}
          />
          {err && confirmPass === '' ? (
            <label className="text-danger">
              confirmPass Password is Required!
            </label>
          ) : null}
        </div>

        <button type="submit" className="btn btn-success ml-auto">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
