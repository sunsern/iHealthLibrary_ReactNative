'use strict';


// import { NativeModules } from 'react-native';

// export default NativeModules.iHealthDeviceManagerModel;


// var { NativeModules } = require('react-native');

// module.exports = NativeModules;

var Component = {
    iHealthDeviceManagerModule:require('./Module/iHealthDeviceManagerModule'),
    BP5Module:require('./Module/BP5Module'),
    AM4Module:require('./Module/AM4Module'),
    AMProfileModule:require('./Module/AMProfileModule')
}


module.exports = Component;