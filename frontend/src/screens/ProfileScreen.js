import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ProfileScreen(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setPhone(userInfo.phone);
    }, [userInfo]);

    return (
        <div>
            <form className="form">
                <div><h1 className="center">User Profile</h1></div>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input id="name" type="text" placeholder="Enter name" value={name} disabled></input>
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input id="email" type="email" placeholder="Enter email" value={email} disabled></input>
                                </div>
                                <div>
                                    <label htmlFor="phone">Contact</label>
                                    <input id="phone" type="number" placeholder="Enter phone" value={phone} disabled></input>
                                </div>
            </form>
        </div>
    );
}

export default ProfileScreen;