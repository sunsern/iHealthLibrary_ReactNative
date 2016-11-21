/**
 * Created by zhangxu on 16/11/20.
 */
/**
 * Created by zhangxu on 16/11/14.
 */
'use strict';


var { NativeModules } = require('react-native');

var RCTModule = NativeModules.BP550BTModule

var BP550BTModule = {

    /**
     * get battery of BP550BT
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
     * get the num of offlineData
     * Attentation: Please register to receive event(BPProfileModule.Action_getOffLineDataNum) before call the api.
     *
     * @param {string} mac
     * @return Event('Action_getOffLineDataNum') with a Map object.
     * eg.
     * @api public
     */
    getOffLineNum:function (mac:string): void {
        if (RCTModule != null) {
            RCTModule.getOffLineNum(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }
    },
    /**
     * get the offlineData
     * Attentation: Please register to receive event(BPProfileModule.Action_getOffLineData) before call the api.
     *
     * @param {string} mac
     * @return Event('Action_getOffLineData') with a Map object.
     * eg.
     * @api public
     */
    getOffLineData:function (mac:string): void {
        if (RCTModule != null) {
            RCTModule.getOffLineData(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }
    },
    /**
     * Synchronize the system time to BP device and get function of device
     * Attentation: Please register to receive event(BPProfileModule.Action_getFunctionInfo) before call the api.
     *
     * @param {string} mac
     * @return Event('Action_getFunctionInfo') with a Map object.
     * eg.
     * @api public
     */
    getFunctionInfo:function (mac:string): void {
        if (RCTModule != null) {
            RCTModule.getFunctionInfo(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }
    },

    //disconnect with BP550BT device

    disconnect: function (mac: string): void {

        if (RCTModule != null) {
            RCTModule.disconnect(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }
    }


}

module.exports = BP550BTModule