import React from 'react'
import Post from './index'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'
import { store } from '../../redux/store'
import { Provider } from 'react-redux'

jest.mock('../../api/entries')

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
    
    if (post) { 
        const textArea = post.root.findByType('textarea')
        const nameInput = post.root.findAllByType('input').find(i => i.props.placeholder === 'Name')
        const submit = post.root.findByType('form')

        const simulateSubmit = async () => {
            if (submit && submit.props.onSubmit) {
                act(() => {
                    submit.props.onSubmit({ preventDefault: () => {}})
                })
            }
        }

        const changeTextArea = (value: string) => {
            if (textArea && textArea.props.onChange) {
                act(() => {
                    textArea.props.onChange({target: {value: value}})
                })
            }
        }

        const changeNameInput = (value: string) => {
            if (nameInput && nameInput.props.onChange) {
                act(() => {
                    nameInput.props.onChange({target: {value: value}})
                })
            }
        }

        //initial
        snap()

        //empty inputs submit
        simulateSubmit()
        snap()

        //empty textarea submit
        changeNameInput("bob")
        simulateSubmit()
        snap()

        //empty name submit
        changeNameInput("")
        changeTextArea("hello")
        simulateSubmit()
        snap()

        //good submit
        changeNameInput("bob")
        simulateSubmit()
        snap()
    }
})