/**
 * Created by Jeepend on 11/11/2016.
 */
'use strict';


var {NativeModules} = require('react-native');

var RCTModule = NativeModules.AM4Module

var AM4Module = {
    /**
     * Disconnect device
     * Attention, it is mandatory to call DeviceEventEmitter.addListener to receive event(iHealthDeviceManagerModel.DeviceDisconnect) before call the api.
     * @param mac The device's mac address.
     */
    disconnect: function (mac: string) {
        RCTModule.disconnect(mac)
    },
    /**
     * Get user's information
     * Attention, it is mandatory to call DeviceEventEmitter.addListener to receive event(iHealthDeviceManagerModel.DeviceDisconnect) before call the api.
     * @param mac The device's mac address.
     */
    getUserInfo: function (mac: string) {
        RCTModule.getUserInfo(mac)
    },
    setUserInfo: function (mac: string,
                           age: int,
                           height: int,
                           weight: float,
                           gender: int,
                           unit: int,
                           target: int,
                           activityLevel: int,
                           min: int) {
        RCTModule.setUserInfo(mac, age, height, weight, gender, unit, target, activityLevel, min)
    }
}

module.exports = AM4Module