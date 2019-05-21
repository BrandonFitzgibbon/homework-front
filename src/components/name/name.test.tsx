import React from 'react'
import Name from './index'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'
import { store } from '../../redux/store'
import { Provider } from 'react-redux'

jest.mock('../../api/entries')
jest.mock('../../api/replies')

test('name component states', async() => {
    let name : ReactTestRenderer | undefined

    act(() => {
        name = renderer.create(
            <Provider store={store}>
                <Name />
            </Provider>
        )
    })

    const snap = () => {
        if (name) {
            let tree = name.toJSON()
            expect(tree).toMatchSnapshot()
        }
    }

    let textInput
    if (name) {
        textInput = name.root.findAllByType('input').find(i => i.props.placeholder === "Name")
    }

    //initial state
    snap()

    //add some text
    if (textInput) {
        textInput.props.onChange({target:{value:"Test"}})
    }

    snap()
})