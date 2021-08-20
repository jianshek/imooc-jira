import React from 'react';
import './App.css';
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";

function App() {
    //跳转登录页面还是首页
    const { user } = useAuth();
  return (
    <div className="App">
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
