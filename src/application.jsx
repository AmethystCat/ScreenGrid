import React from 'react';
import { Provider } from 'react-redux';
import createStore from './store/create-store';
import Home from './pages/home';

const store = createStore({
    name: 1,
    list: [],
    attr: {},
    logs: []
});

export default class Test extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Home/>
            </Provider>
        );
    }
}