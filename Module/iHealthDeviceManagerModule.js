'use strict';



var { NativeModules } = require('react-native');

var RCTModule = NativeModules.iHealthDeviceManagerModule

var iHealthDeviceManagerModule = {
	//Device Type

    AM3S: RCTModule.AM3S,
	AM4: RCTModule.AM4,
    PO3: RCTModule.PO3,
    BP5: RCTModule.BP5,
    BP3L: RCTModule.BP3L,
    BP7S: RCTModule.BP7S,
    KN550: RCTModule.KN550,
    HS4S: RCTModule.HS4S,
    HS6: RCTModule.HS6,
    BG1: RCTModule.BG1,
    BG5: RCTModule.BG5,
    BG5L: RCTModule.BG5L,

    Event_Scan_Device: RCTModule.Event_Scan_Device,
    Event_Scan_Finish: RCTModule.Event_Scan_Finish,
    Event_Device_Connected: RCTModule.Event_Device_Connected,
    Event_Device_Connect_Failed: RCTModule.Event_Device_Connect_Failed,
    Event_Device_Disconnect: RCTModule.Event_Device_Disconnect,
    Event_Authenticate_Result: RCTModule.Event_Authenticate_Result,


    /**
     * Authentication the configure information.
     * Attentation: Please register to receive event(iHealthDeviceManagerModel.Event_Authenticate_Result) before call the api.
     * @param {string} userName
	 * @param {string} clientID
	 * @param {string} clientSecret
     * @return Event(iHealthDeviceManagerModel.Event_Authenticate_Result) with a Map object. If the value is [1,2,3,4], authenticate success; Else authenticate failed.
     * eg. {"authen":1}
     * @api public
     */
	authenConfigureInfo:function(
		userName: string,
		clientID: string,
		clientSecret: string
	): void {
		RCTModule.authenConfigureInfo(userName, clientID, clientSecret)
	},
	/**
	 * Start discovery iHealth device with type
	 * Attentation: Please register to receive event(iHealthDeviceManagerModel.Event_Scan_Device) before call the api.
	 *
	 * @param {number} type
	 * @return Event(iHealthDeviceManagerModel.Event_Scan_Device) with a Map object.
	 * eg. {"type":"BP5","rssi":0,"mac":"8CDE5212041A"}
	 * @api public
	*/
	startDiscovery:function (
		//iHealth device type, eg. iHealthDeviceManagerModel.BP5  iHealthDeviceManagerModel.AM4
		type: number
	): void {
		RCTModule.startDiscovery(type)
	},



	/**
 	 * Stop discovery iHealth device
 	 * Attentation: Please register to receive event(iHealthDeviceManagerModel.Event_Scan_Finish) before call the api.
 	 *
 	 * @return Event(iHealthDeviceManagerModel.Event_Scan_Finish).
 	 * @api public
 	*/
	stopDiscovery:function (
	): void {
		RCTModule.stopDiscovery()
	},

	/**
 	 * Connect iHealth device
 	 *
 	 * @param {string} mac
 	 * @return Event(iHealthDeviceManagerModel.Event_Device_Connected or iHealthDeviceManagerModel.Event_Device_Connect_Failed or iHealthDeviceManagerModel.Event_Device_Disconnect) with a Map object.
 	 * eg. {"errorid":0,"type":"BP5","mac":"8CDE5212041A"}
 	 * @api public
 	*/
	connectDevice:function (
		//The mac address for blood pressure monitor
		mac: string,
		type: string
	): void {
		RCTModule.connectDevice(mac, type)
	},


	/**
	 * Get information for iHealth device
	 *
	 * @param {string} mac
	 * @return Callback with a map object.
	 * eg. {"protocolstring":"com.jiuan.AMV12","accessoryname":"AM4","firmwareversion":"138","hardwareversion":"100","manufacture":"iHealth","serialnumber":"004D32079148","modenumber":"AM4 11070"}
	 * @api public
	*/
	getDevicesIDPS:function (
		//The mac address for iHealth device
		mac: string,
		callback: callback
	): void {
		RCTModule.getDevicesIDPS(mac, callback)
	},



}

module.exports = iHealthDeviceManagerModule
