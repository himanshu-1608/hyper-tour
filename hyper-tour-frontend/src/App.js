import React, { useState } from 'react';
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

function App() {
  
  const [loggedIn, setLoggedIn] = useState(true);

  const logout = () => {
    setLoggedIn(false);
  }
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
    <Router>
      {!loggedIn && (unauthenticatedRoutes)}
      {loggedIn && (
        <div id="app" className="row">
          <DashBoard logout={logout}/>
          {authenticatedRoutes}
        </div>
      )}
    </Router>
  );
}

export default App;