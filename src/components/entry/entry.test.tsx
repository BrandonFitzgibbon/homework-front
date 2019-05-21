import React from 'react'
import Entry from './index'
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Entry entry={{content: 'hello,world', name: 'bob'}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});