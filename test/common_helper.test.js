import {expect} from 'chai';
import 'babel-polyfill';
import {getNewConnections} from '../src/common/helper';

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