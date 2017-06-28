import {expect} from 'chai';
import 'babel-polyfill';
import {getNewConnections, sceneFilter} from '../src/common/helper';

describe('helper: getVideoNewConnectoins test:', function() {
    it('should_origin_connections_add_given_element_when_given_is_not_in_it', function() {
        // given
        let originConnections = [
                {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000e', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0004'},
                {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000d', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0005'}
            ],
            requestConnectionObj = {
                outPortId: '40289f0d5c865cb7015c865fb8fe0014',
                inPortId: '40289f0d5c865cb7015c865fb8fa0004'
            };
        // when
        let newConnections = getNewConnections(originConnections, requestConnectionObj);
        let expectConnections = [
            {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000e', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0004'},
            {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000d', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0005'},
            {outMatrixPort: '40289f0d5c865cb7015c865fb8fe0014', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0004'}
        ];
        // then
        expect(newConnections).to.eql(expectConnections);
    });

    it('should_origin_connections_remove_given_element_when_given_is_in_it', function() {
        // given
        let originConnections = [
                {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000e', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0004'},
                {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000d', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0005'},
                {outMatrixPort: '40289f0d5c865cb7015c865fb8fe0014', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0002'}
            ],
            requestConnectionObj = {outPortId: '40289f0d5c865cb7015c865fb8fc000e', inPortId: '40289f0d5c865cb7015c865fb8fa0004'};
        // when
        let newConnections = getNewConnections(originConnections, requestConnectionObj);
        let expectConnections = [
            {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000d', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0005'},
            {outMatrixPort: '40289f0d5c865cb7015c865fb8fe0014', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0002'}
        ];
        // then
        expect(newConnections).to.eql(expectConnections);
    });
});

describe('helper: sceneFilter test:', function() {
    it('should_return_new_scene_list_from_local_cached_sceneIds', function() {
        // given
        let sceneList = [
            {id: 111, name: 's1'},
            {id: 222, name: 's2'},
            {id: 333, name: 's3'}
        ];
        let cacheSceneIds = [111, 333];
        let expectSceneList = [
            {id: 111, name: 's1'},
            {id: 333, name: 's3'}
        ];
        // when
        let newSceneList = sceneFilter(sceneList, cacheSceneIds);
        // then
        expect(newSceneList).to.eql(expectSceneList);
    });
    it('should_return_an_empty_array_when_sceneList_and_is_none', function() {
        // given
        let sceneList = [];
        let cacheSceneIds = [111, 333];
        let expectSceneList = [];
        // when
        let newSceneList = sceneFilter(sceneList, cacheSceneIds);
        // then
        expect(newSceneList).to.eql(expectSceneList);
    });
    it('should_return_sceneList_when_cacheSceneIds_is_none', function() {
        // given
        let sceneList = [
            {id: 111, name: 's1'},
            {id: 222, name: 's2'},
            {id: 333, name: 's3'}
        ];
        let cacheSceneIds = [];
        let expectSceneList = [
            {id: 111, name: 's1'},
            {id: 222, name: 's2'},
            {id: 333, name: 's3'}
        ];
        // when
        let newSceneList = sceneFilter(sceneList, cacheSceneIds);
        // then
        expect(newSceneList).to.eql(expectSceneList);
    });
});