import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import {useHistory } from 'react-router-dom';
// named exorts should be rapped in the curly bracket.
function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const submitHandler = (e) => {
        e.preventDefault();
        // sign in action
        if (password !== confirmPassword) {
            alert("Password and confirm password are not same.");
            setPassword(null);
            setConfirmPassword("");
        } else {
            dispatch(register(name, email, phone, password));
            history.push('/');
        }

    }

    return (
        <div>
            <form onSubmit={submitHandler} className="form">
                <div>
                    <h1 className="center">Create Account</h1>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name"
                        placeholder="Enter name" required
                        onChange={e => setName(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email"
                        placeholder="Enter email" required
                        onChange={e => setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="phone">Contact</label>
                    <input type="number" id="phone"
                        placeholder="Enter phone number" required
                        onChange={e => setPhone(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"
                        placeholder="Enter password" required
                        onChange={e => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input type="password" id="confirm_password"
                        placeholder="Enter confirm password" required
                        onChange={e => setConfirmPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label ></label>
                    <button type="submit" className="primary">Register</button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have an account.{' '}
                        <Link to={`/signin`}>Sign in</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegisterScreen;