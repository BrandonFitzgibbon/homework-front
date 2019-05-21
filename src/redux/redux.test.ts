import { store } from './store'
import * as actions from './actions'

it('creates store and initializes state', () => {
    const state = store.getState()
    expect(state).toHaveProperty("allEntries")
    expect(state).toHaveProperty("currentEntries")
    expect(state).toHaveProperty("currentName")
    expect(state).toHaveProperty("currentTarget")
    expect(state).toHaveProperty("currentReplies")
})

const entries = [
    {
        _id: "1",
        content: "hello, world",
        name: "Bob"
    },
    {
        _id: "2",
        content: "hello, world",
        name: "Bob"
    } 
]  

const entry = {
    _id: "3",
    content: "hello, world",
    name: "Bob"
}

it('sets entries in allEntries', () => {
    store.dispatch(actions.setAllEntries(entries))
    const state = store.getState()
    expect(state.allEntries).toMatchObject(entries)
})

it('posts entries in allEntries', () => {
    store.dispatch(actions.postAllEntry(entry))
    const state = store.getState()
    expect(state.allEntries).toMatchObject([
        ...entries,
        entry
    ])
})

it('sets entries in currentEntries', () => {
    store.dispatch(actions.setCurrentEntries(entries))
    const state = store.getState()
    expect(state.currentEntries).toMatchObject(entries)
})

it('posts entries in currentEntries', () => {
    store.dispatch(actions.postCurrentEntry(entry))
    const state = store.getState()
    expect(state.currentEntries).toMatchObject([
        ...entries,
        entry
    ])
})

it('changes name', () => {
    const name = "Bob"
    store.dispatch(actions.changeName(name))
    const state = store.getState()
    expect(state.currentName).toBe(name)
})

it('changes target', () => {
    const target = "Bob"
    store.dispatch(actions.changeTarget(target))
    const state = store.getState()
    expect(state.currentTarget).toBe(target)
})