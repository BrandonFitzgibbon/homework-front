import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import Post from './components/post'
import { State } from './types/interfaces'
import CurrentEntryListContainer from './components/currentEntryListContainer'
import AllEntryListContainer from './components/allEntryListContainer';
import Name from './components/name'

interface AppParameters {
  currentName: string
}

class App extends Component<AppParameters> {
  render() {
    const validName = this.props.currentName.length > 0
    return (
        <div className="App">
          {!validName && (
            <Name />
          )}
          {validName && (
            <div>
              <Post />
              <CurrentEntryListContainer />
            </div>
          )}
          <hr/>
          <AllEntryListContainer />
        </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
      currentName: state.currentName
  }
}

export default connect(mapStateToProps, undefined)(App)
