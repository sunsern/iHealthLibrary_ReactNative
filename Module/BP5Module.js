'use strict';


var { NativeModules } = require('react-native');

var RCTModule = NativeModules.BP5Module

var BP5Module = {

    /**
	 * Start measure blood pressure monitor
	 * Attentation: Please register to receive event(list of action: BPProfileModule.Action_Zeroing, BPProfileModule.Action_ZeroOver,
	 * BPProfileModule.Action_Pressure, BPProfileModule.Action_PulseWave, BPProfileModule.Action_Result) before call the api.
	 *
	 * @param {string} mac
	 * @return Event('Action_Zeroing') with a Map object.<br/>
	 * 		Event('Action_ZeroOver') with a Map object.<br/>
     * 	    Event('Action_Pressure') with a Map object.<br/>
     * 	    Event('Action_PulseWave') with a Map object.<br/>
     * 	    Event('Action_Result') with a Map object.<br/>
     * @api public
     */

	startMeasure: function(
		//The mac address for blood pressure monitor
		mac: string
	): void {
		RCTModule.startMeasure(mac)
	},


    //补全
	stopMeasure: function(
		//The mac address for blood pressure monitor
		mac: string
	): void {
		RCTModule.stopMeasure(mac)
	},
    /**
     * get battery of BP5
     * Attentation: Please register to receive event(BPProfileModule.Action_Battery) before call the api.
     *
     * @param {string} mac
     * @return Event('Action_Battery') with a Map object.<br/>
     * eg.
     * @api public
     */
    getBattery: function (mac: string): void {

        if (RCTModule != null) {
            RCTModule.getBattery(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

    },
    enbleOffline: function (mac: string): void {

        if (RCTModule != null) {
            RCTModule.enbleOffline(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

    },
    disableOffline: function (mac: string): void {

        if (RCTModule != null) {
            RCTModule.disableOffline(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

    },
    isEnableOffline: function (mac: string): void {

        if (RCTModule != null) {
            RCTModule.isEnableOffline(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

    },
    getOfflineNum: function (mac: string): void {

        if (RCTModule != null) {
            RCTModule.getOfflineNum(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

    },
    getOfflineData: function (mac: string): void {

        if (RCTModule != null) {
            RCTModule.getOfflineData(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

    },
    disconnect: function (mac: string): void {

        if (RCTModule != null) {
            RCTModule.disconnect(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

    }


}

module.exports = BP5Module
