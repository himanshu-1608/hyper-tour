import React, { useState, useCallback, useEffect } from 'react';
import { 
  BrowserRouter as Router,
  Route, 
  Redirect, 
  Switch 
} from 'react-router-dom';

import './App.css';

import Auth from './components/Auth/Auth';
import DashBoard from './components/DashBoard/DashBoard';
import InfScroll from './components/InfScroll/InfScroll';
import UploadPost from './components/UploadPost/UploadPost';
import SuggestionList from './components/SuggestionList/SuggestionList';
import ProfileSetting from './components/ProfileSetting/ProfileSetting';
import AuthContext from './context/auth-context';

function App() {
  
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [userName, setUserName] = useState();

  let checkToken, checkUserName;
  useEffect(() => {
    checkToken = localStorage.getItem('userToken');
    checkUserName = localStorage.getItem('userName');
    if(checkToken && checkToken.length > 0) {
      login(checkToken, checkUserName);
    }
  },[]);

  const login = useCallback((token, userName) => {
    localStorage.setItem('userToken', token);
    localStorage.setItem('userName', userName);
    setUserName(userName);
    setToken(token);
    setLoggedIn(true);
  },[]);

  const logout = useCallback(() => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    setToken('');
    setUserName('');
    setLoggedIn(false);
  },[]);
  
  const unauthenticatedRoutes = (
    <Switch>
      <Route path="/auth">
        <Auth />
      </Route>
      <Redirect to="/auth" />
    </Switch>
  );

  const authenticatedRoutes = (
      <Switch>
        <Route path="/" exact>
          <InfScroll />
        </Route>
        <Route path="/upload" exact>
          <UploadPost />
        </Route>
        <Route path="/suggestions" exact>
          <SuggestionList />
        </Route>
        <Route path="/settings" exact>
          <ProfileSetting />
        </Route>
        <Redirect to="/" />
      </Switch>
  );

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      login: login,
      logout: logout,
      token: token,
      userName: userName}}>
      <Router>
        {!isLoggedIn && (unauthenticatedRoutes)}
        {isLoggedIn && (
          <div id="app" className="row">
            <DashBoard logout={logout}/>
            {authenticatedRoutes}
          </div>
        )}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;