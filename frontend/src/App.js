import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route, } from "react-router-dom";
import { signout } from './actions/userActions';
import TaskScreen from './screens/task';
import SignInScreen from './screens/signin';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/register';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();
  const { userInfo } = userSignin;
  const signoutHandler = () => { 
    dispatch(signout());
  }
 
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">To-DO-LIST</Link>
          </div>
          <div>
            {
              userInfo ? (
                <div className="dropdown">
                  <Link style={{marginRight: 2}} className="dropbtn" to="#">{userInfo.name}{" "}<i className="fa fa-chevron-circle-down"></i></Link>
                  <ul className="dropdown-content">
                  <li><Link exact to="/">Dashboard</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/signin" onClick={signoutHandler}>Sign Out</Link></li>
                  </ul>
                </div>
              ) :
                (
                  <Link style={{marginRight: 5}} to="/signin">Sign In</Link>
                )
            }
          </div>
        </header>
        <main>
          <Route exact path="/" component={TaskScreen}></Route>
          <Route path="/signin" component={SignInScreen}></Route>
          <Route path="/profile" component={ProfileScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
        </main>
        <footer className="row center">
          <ul>
            <li>
              All rights are reserved.
            </li>
            <li>
              Go To <Link to="/" style={{color:'white'}}><b>Home</b></Link>
            </li>
          </ul>
        </footer>
      </div>
      <div>
      </div>
    </Router>
  )
}

export default App;

