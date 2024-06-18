// src/App.js
import React from 'react';
import StoryList from './components/StoryList.js';
import StoryForm from './components/StoryForm.js';

const App = () => {
  return (
    <div className="App">
      <h1>Story Management App</h1>
      <StoryList />
      <hr />
      <StoryForm />
    </div>
  );
};

export default App;
