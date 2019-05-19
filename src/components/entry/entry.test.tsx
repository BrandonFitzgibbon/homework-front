import React from 'react'
import Entry from './index'
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Entry content={'hello,world'}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});