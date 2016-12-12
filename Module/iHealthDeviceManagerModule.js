'use strict';


var {NativeModules} = require('react-native');

var RCTModule = NativeModules.iHealthDeviceManagerModule

/**
 * @module iHealthDeviceManagerModule
 */
module.exports = {
    //Device Type
    /**
     * Device type number for AM3S(2) 1 << 1
     */
    AM3S: RCTModule.AM3S,
    /**
     * Device type number for AM4(4) 1 << 2
     */
    AM4: RCTModule.AM4,
    /**
     * Device type number for PO3(8) 1 << 3
     */
    PO3: RCTModule.PO3,
    /**
     * Device type number for BP5(33554432) 1 << 25
     */
    BP5: RCTModule.BP5,
    /**
     * Device type number for BP3L(32) 1 << 5
     */
    BP3L: RCTModule.BP3L,
    /**
     * Device type number for BP7S(16777216) 1 << 24
     */
    BP7S: RCTModule.BP7S,
    /**
     * Device type number for Bp550BT(128) 1 << 7
     */
    KN550: RCTModule.KN550,
    /**
     * Device type number for HS4S(268435456) 1 << 28
     */
    HS4S: RCTModule.HS4S,
    HS6: RCTModule.HS6,
    /**
     * Device type number for BG1(110)
     */
    BG1: RCTModule.BG1,
    /**
     * Device type number for BG5(4294967296) 1 << 32
     */
    BG5: RCTModule.BG5,
    /**
     * Device type number for BG5L(4096) 1 << 12
     */
    BG5L: RCTModule.BG5L,
    /**
     * Notify event type for scan device result.("event_scan_device")
     */
    Event_Scan_Device: RCTModule.Event_Scan_Device,
    /**
     * Notify event type for scan action finish.("event_scan_finish")
     */
    Event_Scan_Finish: RCTModule.Event_Scan_Finish,
    /**
     * Notify event type for connect device successfully.("event_device_connected")
     */
    Event_Device_Connected: RCTModule.Event_Device_Connected,
    /**
     * Notify event type for connect device failed.("event_device_connect_failed")
     */
    Event_Device_Connect_Failed: RCTModule.Event_Device_Connect_Failed,
    /**
     * Notify event type for device disconnect.("event_device_disconnect")
     */
    Event_Device_Disconnect: RCTModule.Event_Device_Disconnect,
    /**
     * Notify event type for authenticate result.("event_authenticate_result")
     */
    Event_Authenticate_Result: RCTModule.Event_Authenticate_Result,


    /**
     * Authentication the configure information.
     * Attentation: Please register to receive event(iHealthDeviceManagerModel.Event_Authenticate_Result) before call the api.
     * @param {string} userName User's user name you use when you sign up
     * @param {string} clientID User's client id.
     * @param {string} clientSecret User's client secret.
     */
    authenConfigureInfo: function (userName, clientID, clientSecret) {
        RCTModule.authenConfigureInfo(userName, clientID, clientSecret)
    },
    /**
     * Start discovery iHealth device with type
     * Attentation: Please register to receive event(iHealthDeviceManagerModel.Event_Scan_Device) before call the api.
     *
     * @param {number} type The type to be discovered.<br/>
     * e.g. startDiscovery(iHealthDeviceManagerModule.AM4) will discover AM4 devices.<br/>
     */
    startDiscovery: function (type) {
        RCTModule.startDiscovery(type)
    },


    /**
     * Stop discovery iHealth device
     * Attentation: Please register to receive event(iHealthDeviceManagerModel.Event_Scan_Finish) before call the api.
     */
    stopDiscovery: function () {
        RCTModule.stopDiscovery()
    },

    /**
     * Connect iHealth device
     * Attentation: Please register to receive event(iHealthDeviceManagerModel.Event_Device_Connected or iHealthDeviceManagerModel.Event_Device_Connect_Failed) before call the api.
     * @param {string} mac The mac address of device to be connected.<br/>
     * e.g. "004D3208D5D4"
     * @param {string} type Device type string.
     */
    connectDevice: function (mac, type) {
        RCTModule.connectDevice(mac, type)
    },


    /**
     * Get information for iHealth device
     *
     * @param {string} mac The mac address of device.<br/>
     * e.g. "004D3208D5D4"
     * @return {callback} Callback with a map object.<br/>
     * e.g. {"protocolstring":"com.jiuan.AMV12","accessoryname":"AM4","firmwareversion":"138","hardwareversion":"100","manufacture":"iHealth","serialnumber":"004D32079148","modenumber":"AM4 11070"}
     */
    getDevicesIDPS: function (mac, callback) {
        RCTModule.getDevicesIDPS(mac, callback)
    },


}
