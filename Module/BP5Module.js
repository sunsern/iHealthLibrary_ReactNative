'use strict';


var { NativeModules } = require('react-native');

var RCTModule = NativeModules.BP5Module

var BP5Module = {
    Action_Battery:RCTModule.Action_Battery,
    Action_Zeroing:RCTModule.Action_Zeroing,
    Action_ZeroOver:RCTModule.Action_ZeroOver,
    Action_Pressure:RCTModule.Action_Pressure,
    Action_PulseWave:RCTModule.Action_PulseWave,
    Action_Result:RCTModule.Action_Result,


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

module.exports = BP5Module
