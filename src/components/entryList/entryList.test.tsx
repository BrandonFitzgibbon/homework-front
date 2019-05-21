import React from 'react'
import EntryList from './index'
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EntryList entries={[{_id: '1', content: 'hello,world', name: 'bob'}]}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});