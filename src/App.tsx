import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Post from './components/post'
import CurrentEntryListContainer from './components/currentEntryListContainer'
import AllEntryListContainer from './components/allEntryListContainer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Post />
        <CurrentEntryListContainer />
        <hr/>
        <AllEntryListContainer />
      </div>
    </Provider>
  );
}

export default App;
