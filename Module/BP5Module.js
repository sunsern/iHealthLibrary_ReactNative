'use strict';


var { NativeModules } = require('react-native');

var RCTModule = NativeModules.BP5Module

var BP5Module = {

    /**
     * Notify event type for BP5.
     */
    Event_Notify: RCTModule.Event_Notify,

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

    /**
     * stop measure blood pressure monitor
     * Attentation: Please register to receive event(BPProfileModule.Action_interrupted) before call the api.
     *
     * @param {string} mac
     * @return Event('Action_interrupted') with a Map object.<br/>
     * eg.
     * @api public
     */
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
    /**
     * turn the function of offline measure on.
     * Attentation: Please register to receive event(BPProfileModule.Action_enableOffline) before call the api.
     *
     * @param {string} mac
     * @return Event('Action_enableOffline') with a Map object.<br/>
     * eg.
     * @api public
     */
    enbleOffline: function (mac: string): void {

        if (RCTModule != null) {
            RCTModule.enbleOffline(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

    },
    /**
     * turn the function of offline measure off.
     * Attentation: Please register to receive event(BPProfileModule.Action_disEnableOffline) before call the api.
     *
     * @param {string} mac
     * @return Event('Action_disEnableOffline') with a Map object.<br/>
     * eg.
     * @api public
     */
    disableOffline: function (mac: string): void {

        if (RCTModule != null) {
            RCTModule.disableOffline(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

    },
    /**
     * Return true if the Bp5 is enable to Off-line measure, otherwise is disable to Off-line measure.
     * Attentation: Please register to receive event(BPProfileModule.Action_is_enable_offline) before call the api.
     *
     * @param {string} mac
     * @return Event('Action_is_enable_offline') with a Map object.<br/>
     * eg.
     * @api public
     */
    isEnableOffline: function (mac: string): void {

        if (RCTModule != null) {
            RCTModule.isEnableOffline(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

    },
    /**
     * get the num of offlineData
     * Attentation: Please register to receive event(BPProfileModule.Action_getOffLineDataNum) before call the api.
     *
     * @param {string} mac
     * @return Event('Action_getOffLineDataNum') with a Map object.
     * eg.
     * @api public
     */
    getOfflineNum: function (mac: string): void {

        if (RCTModule != null) {
            RCTModule.getOfflineNum(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

    },
    /**
     * get the num of offlineData
     * Attentation: Please register to receive event(BPProfileModule.Action_getOffLineDataNum) before call the api.
     *
     * @param {string} mac
     * @return Event('Action_getOffLineDataNum') with a Map object.
     * eg.
     * @api public
     */
    getOfflineData: function (mac: string): void {

        if (RCTModule != null) {
            RCTModule.getOfflineData(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

    },

    //disconnect with BP5 device
    disconnect: function (mac: string): void {

        if (RCTModule != null) {
            RCTModule.disconnect(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

    }


}

module.exports = BP5Module
