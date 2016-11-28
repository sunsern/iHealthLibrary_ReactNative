'use strict';


// import { NativeModules } from 'react-native';

// export default NativeModules.iHealthDeviceManagerModel;


// var { NativeModules } = require('react-native');

// module.exports = NativeModules;

var Component = {
    iHealthDeviceManagerModule: require('./Module/iHealthDeviceManagerModule'),
    BP5Module: require('./Module/BP5Module'),
    BP3LModule: require('./Module/BP3LModule'),
    BP550BTModule: require('./Module/BP550BTModule'),
    BP7SModule: require('./Module/BP7SModule'),
    BPProfileModule: require('./Module/BPProfileModule'),
    AM4Module: require('./Module/AM4Module'),
    AMProfileModule: require('./Module/AMProfileModule'),
    PO3Module: require('./Module/PO3Module'),
    POProfileModule: require('./Module/POProfileModule')

}


module.exports = Component;