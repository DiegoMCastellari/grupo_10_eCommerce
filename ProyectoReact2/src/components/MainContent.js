import React from 'react';
import TopBar from './main/TopBar';
import PageContent from './main/PageContent';
import Footer from './Footer';

function MainContent() {
    return (        
    <div id="content-wrapper" className="d-flex flex-column">
    <div id="content">
      <TopBar/>
      <PageContent/>
    </div>
    <Footer/>
  </div>

  );
}

export default MainContent;