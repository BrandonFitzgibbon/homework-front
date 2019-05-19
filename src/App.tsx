import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Post from './components/post'
import EntryList from './components/entryList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Post />
        <EntryList />
      </div>
    </Provider>
  );
}

export default App;
