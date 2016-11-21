/**
 * Created by zhangxu on 16/11/14.
 */
'use strict';


var { NativeModules } = require('react-native');

var RCTModule = NativeModules.BP3LModule

var BP3LModule = {
    /**
     * Notify event type for BP3L.
     */
    NOTIFY_EVENT_BP3L: RCTModule.NOTIFY_EVENT_BP3L,

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

        if (RCTModule != null) {
            RCTModule.startMeasure(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

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
        if (RCTModule != null) {
            RCTModule.stopMeasure(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

    },

    /**
     * get battery of BP3L
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