import React from 'react';
import { Provider } from 'react-redux';
import createStore from './store/create-store';
import Home from './pages/home';

const store = createStore({
    matrixData: [],
    tableHead: [123],
    tableBody: [123],

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

    lastClientX: 0,
    lastClientY: 0,
    
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