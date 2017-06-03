import React from 'react';
import { Provider } from 'react-redux';
import createStore from './store/create-store';
import Home from './pages/home';

const store = createStore({
    matrixOriginData: {
        matrixInput: [
            {id: 'i-1', name: '输入源1'}, 
            {id: 'i-2', name: '输入源2'}, 
            {id: 'i-3', name: '输入源3'},
            {id: 'i-4', name: '输入源4'},
            {id: 'i-5', name: '输入源5'},
            {id: 'i-6', name: '输入源6'},
            {id: 'i-7', name: '输入源7'},
            {id: 'i-8', name: '输入源8'},
            {id: 'i-9', name: '输入源9'},
            {id: 'i-10', name: '输入源10'},
            {id: 'i-11', name: '输入源11'},
            {id: 'i-12', name: '输入源12'},
            {id: 'i-13', name: '输入源13'},
            {id: 'i-14', name: '输入源14'},
            {id: 'i-15', name: '输入源15'},
            {id: 'i-16', name: '输入源16'}
        ],
        matrixOutput: [
            {id: 'o-1', name: '输出源1'}, 
            {id: 'o-2', name: '输出源2'}, 
            {id: 'o-3', name: '输出源3'},
            {id: 'o-4', name: '输出源4'},
            {id: 'o-5', name: '输出源5'},
            {id: 'o-6', name: '输出源6'},
            {id: 'o-7', name: '输出源7'},
            {id: 'o-8', name: '输出源8'},
            {id: 'o-9', name: '输出源9'},
            {id: 'o-10', name: '输出源10'},
            {id: 'o-11', name: '输出源11'},
            {id: 'o-12', name: '输出源12'},
            {id: 'o-13', name: '输出源13'},
            {id: 'o-14', name: '输出源14'},
            {id: 'o-15', name: '输出源15'},
            {id: 'o-16', name: '输出源16'}
        ]
    },
    matrixShown: {
        input: [],
        output: []
    },
    matrixSection: {
        row: [0, 8],
        col: [0, 8]
    },
    connections: [],

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
    
    showLayer: false,
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