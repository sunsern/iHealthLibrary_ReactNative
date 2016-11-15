'use strict';


// import { NativeModules } from 'react-native';

// export default NativeModules.iHealthDeviceManagerModel;


// var { NativeModules } = require('react-native');

// module.exports = NativeModules;

var Component = {
	iHealthDeviceManagerModel:require('./Model/iHealthDeviceManagerModel'),
	BP5Model:require('./Model/BP5Model')
}


module.exports = Component;