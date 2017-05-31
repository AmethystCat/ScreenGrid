import React from 'react';
import { Provider } from 'react-redux';
import createStore from './store/create-store';
import Home from './pages/home';

const store = createStore({
    matrixInput: [{id: 'i-1'}, {id: 'i-2'}, {id: 'i-3'}],
    matrixOutput: [{id: 'o-1'}, {id: 'o-2'}, {id: 'o-3'}],
    InputShow: [{id: 'i-1'}, {id: 'i-2'}, {id: 'i-3'}],
    OutputShow: [{id: 'o-1'}, {id: 'o-2'}, {id: 'o-3'}],

    connections: [],

    limitRow: 50,
    limitCol: 40,

    scene: [],
    currentScene: '',

    matrixName:[],
    currentMatrixName: '',

    coordinate: {
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0
    },
    
    logs: ['test', 'test2']
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