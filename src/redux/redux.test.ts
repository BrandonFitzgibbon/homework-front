import { store } from './store'
import { postEntry } from './actions'

it('creates store and initializes state', () => {
    const state = store.getState()
    expect(state.entries).toEqual([])
})

it('dispatches entries on postEntry', () => {
    store.dispatch(postEntry({content: "hello, world"}))
    const state = store.getState()
    expect(state.entries).toHaveLength(1)
    expect(state.entries[0]).toEqual({content: "hello, world"})
})