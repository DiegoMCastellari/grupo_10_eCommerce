import React from 'react';
import './app.css';
import SideBar from './components/SideBar';
import MainContent from './components/MainContent';


function App() {
    return (
      <div id="wrapper">
      <SideBar/>
      <MainContent/>
      </div>
  );
}

export default App;
