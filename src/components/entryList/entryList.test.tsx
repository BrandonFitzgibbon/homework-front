import React from 'react'
import EntryList from './index'
import renderer, { act } from 'react-test-renderer'
import { store } from '../../redux/store'
import { Provider } from 'react-redux'
import { postEntry } from '../../redux/actions'

test('list adds Entry when state changes', () => {
    const list = renderer.create(
        <Provider store={store}>
            <EntryList />
        </Provider>
    )
    let tree = list.toJSON()
    expect(tree).toMatchSnapshot()

    //add item to list
    act(() => {
        store.dispatch(postEntry({
            content: "hello, world"
        }))
    })

    tree = list.toJSON()
    expect(tree).toMatchSnapshot()

    //add another item to the list
    act(() => {
        store.dispatch(postEntry({
            content: "yolo"
        }))
    })

    tree = list.toJSON()
    expect(tree).toMatchSnapshot()
}) 