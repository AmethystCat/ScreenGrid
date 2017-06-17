import React from 'react';
import { Provider } from 'react-redux';
import createStore from './store/create-store';
import Home from './pages/home';

const store = createStore({
    matrixOriginData: {
        matrixInput: [],
        matrixOutput: []
    },
    matrixShown: {
        input: [],
        output: []
    },
    matrixSection: {
        row: [0, 30],
        col: [0, 30]
    },
    connections: [],

    scene: [],
    currentScene: {},

    matrixName:[],
    currentMatrixName: {},

    coordinate: {
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0
    },
    
    showLoading: false,
    showLayer: false,
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