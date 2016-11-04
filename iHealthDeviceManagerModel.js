'use strict';



var { NativeModules } = require('react-native');

var RCTModule = NativeModules.iHealthDeviceManagerModel

var iHealthDeviceManagerModel = {
	//Device Type
	BP5: RCTModule.BP5,
	AM4: RCTModule.AM4,

	/**
 	 * Start discovery iHealth device with type
 	 * Attentation: Please register to receive event('onScanDevice') before call the api. 
 	 *
 	 * @param {number} type
 	 * @return Event('onScanDevice') with a Json object.
 	 * eg. {"Type":"BP5","RSSI":0,"Mac":"8CDE5212041A"}
 	 * @api public
 	*/
	startDiscovery:function (
		//iHealth device type, eg. BP5 AM4
		type: number
	): void {
		RCTModule.startDiscovery(type)
	},

	/**
 	 * Connect iHealth device 
 	 *
 	 * @param {string} mac
 	 * @return Event('ConnectionStateChange') with a Json object.
 	 * eg. {"Status":1,"ErrorID":0,"Type":"BP5","Mac":"8CDE5212041A"}
 	 * @api public
 	*/
	connectDevice:function (
		//The mac address for blood pressure monitor
		mac: string
	): void {
		return RCTModule.connectDevice(mac)
	},

}

module.exports = iHealthDeviceManagerModel
