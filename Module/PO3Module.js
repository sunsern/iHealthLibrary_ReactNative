/**
 * Created by Jeepend on 11/11/2016.
 */
'use strict';


var {NativeModules} = require('react-native');

var RCTModule = NativeModules.PO3Module

var PO3Module = {

    /**
     * Get the PO3 battery status
     * Attentation: Please register to receive event(list of action: POProfileModule.ACTION_BATTERY_PO) before call the api.
     *
     * @param {string} mac
     * @return Event('ACTION_BATTERY_PO') with a Map object.<br/>
     * @api public
     */
    getBattery: function (//The mac address for blood pressure monitor
        mac: string): void {
        RCTModule.getBattery(mac)
    },

    /**
     * Start real-time measurement
     * Attentation: Please register to receive event(list of action: POProfileModule.ACTION_LIVEDA_PO,
     * POProfileModule.ACTION_RESULTDATA_PO) before call the api.
     *
     * @param {string} mac
     * @return Event('ACTION_LIVEDA_PO') with a Map object.<br/>
     *        Event('ACTION_RESULTDATA_PO') with a Map object.<br/>
     * @api public
     */
    startMeasure: function (//The mac address for blood pressure monitor
        mac: string): void {
        RCTModule.startMeasure(mac)
    },

    /**
     * Get the value of historical data in the PO3
     * Attentation: Please register to receive event(list of action: POProfileModule.ACTION_OFFLINEDATA_PO,
     * POProfileModule.ACTION_NO_OFFLINEDATA_PO) before call the api.
     *
     * @param {string} mac
     * @return Event('ACTION_OFFLINEDATA_PO') with a Map object.<br/>
     *        Event('ACTION_NO_OFFLINEDATA_PO') with a Map object.<br/>
     * @api publics
     */
    getHistoryData: function (//The mac address for blood pressure monitor
        mac: string): void {
        RCTModule.getHistoryData(mac)
    },

    /**
     * Disconnect the PO3
     * @param mac
     */
    disconnect: function (//The mac address for blood pressure monitor
        mac: string): void {
        RCTModule.disconnect(mac)
    }
}

module.exports = PO3Module