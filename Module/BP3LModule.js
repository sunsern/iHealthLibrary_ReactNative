/**
 * Created by zhangxu on 16/11/14.
 */
'use strict';


var { NativeModules } = require('react-native');

var RCTModule = NativeModules.BP3LModule

var BP3LModule = {

    //Start measure blood pressure monitor
    startMeasure: function(
        //The mac address for blood pressure monitor
        mac: string
    ): void {

        if (RCTModule != null) {
            RCTModule.startMeasure(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

    },

    //Stop measure blood pressure monitor
    stopMeasure: function(
        //The mac address for blood pressure monitor
        mac: string
    ): void {
        if (RCTModule != null) {
            RCTModule.stopMeasure(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

    },

    //get battery of Bp3L device
    getBattery: function (mac: string): void {

        if (RCTModule != null) {
            RCTModule.getBattery(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

    },

    //disconnect with BP3L device

    disconnect: function (mac: string): void {

        if (RCTModule != null) {
            RCTModule.disconnect(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }
    }


}

module.exports = BP3LModule