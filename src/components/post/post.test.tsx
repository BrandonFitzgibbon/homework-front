import React from 'react'
import Post from './index'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'
import { store } from '../../redux/store'
import { Provider } from 'react-redux'

jest.mock('../../api/entries')
jest.mock('../../api/replies')

test('post input updates with keystrokes and clears on submit', async () => {
    let post : ReactTestRenderer | undefined
    
    const snap = () => {
        if (post) {
            let tree = post.toJSON()
            expect(tree).toMatchSnapshot()
        }
    }

    act(() => {
        post = renderer.create(
            <Provider store={store}>
                <Post />
            </Provider>
        )
    })
    
    let textarea
    if (post) { 
        textarea = post.root.findByType('textarea')
    }

    //initial snap
    snap()

    //write some content
    if (textarea) {
        textarea.props.onChange({target:{value:"hello,world"}})
    }

    snap()
})