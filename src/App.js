import React from 'react';
import logo from './logo.svg';
import './App.css';
import OPENNING_SHADE from './components/OPENNING_SHADE';
import CARD_CONTAINER from './components/CARD_CONTAINER';
import TITLE_CONTAINER from './components/TITLE_CONTAINER';

function App() {

  return (
    <>
      {/* <OPENNING_SHADE /> */}
      <div className = "green-book">Green Web</div>
      <CARD_CONTAINER />
      {/* <TITLE_CONTAINER /> */}
    </>
  );
}

export default App;
