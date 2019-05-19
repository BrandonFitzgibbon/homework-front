import { createStore } from 'redux'
import app from './reducers'

export const store = createStore(app, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())