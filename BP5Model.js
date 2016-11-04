'use strict';


var { NativeModules } = require('react-native');

var RCTModule = NativeModules.BP5Model

var BP5Model = {

	//Start measure blood pressure monitor
	startMeasure: function(
		//The mac address for blood pressure monitor
		mac: string
	): void {
		RCTModule.startMeasure(mac)
	},

	//Stop measure blood pressure monitor
	stopMeasure: function(
		//The mac address for blood pressure monitor
		mac: string
	): void {
		RCTModule.stopMeasure(mac)
	}


}

module.exports = BP5Model