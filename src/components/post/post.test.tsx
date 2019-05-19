import React from 'react'
import Post from './index'
import renderer, { act } from 'react-test-renderer'
import { store } from '../../redux/store'
import { Provider } from 'react-redux'

jest.mock('../../api/entries')

test('post input updates with keystrokes and clears on submit', async () => {
    const post = renderer.create(
        <Provider store={store}>
            <Post />
        </Provider>
    )

    let tree = post.toJSON()
    expect(tree).toMatchSnapshot()

    //simulate keystrokes
    if (tree && tree.children) {
        let label = tree.children.find(i => i.type === "label")
        if (label && label.children) {
            let input = label.children.find(i => i.type === "input")
            if (input) {
                input.props.onChange({target:{value:'h'}})
                tree = post.toJSON()
                expect(tree).toMatchSnapshot()
            }
        }
    }

    //simulate keystrokes
    if (tree && tree.children) {
        let label = tree.children.find(i => i.type === "label")
        if (label && label.children) {
            let input = label.children.find(i => i.type === "input")
            if (input) {
                input.props.onChange({target:{value:'he'}})
                tree = post.toJSON()
                expect(tree).toMatchSnapshot()
            }
        }
    }

    //simulate keystrokes
    if (tree && tree.children) {
        let label = tree.children.find(i => i.type === "label")
        if (label && label.children) {
            let input = label.children.find(i => i.type === "input")
            if (input) {
                input.props.onChange({target:{value:'hello, world'}})
                tree = post.toJSON()
                expect(tree).toMatchSnapshot()
            }
        }
    }


    //submit
    if (tree) {
        await tree.props.onSubmit({ preventDefault: () => {}})
        tree = post.toJSON()
        expect(tree).toMatchSnapshot()
    }
})