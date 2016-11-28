/**
 * Created by zhangxu on 16/11/20.
 */

'use strict';


var { NativeModules } = require('react-native');

var RCTModule = NativeModules.BP7SModule

var BP7SModule = {

    /**
     * Notify event type for BP7S.
     */
    NOTIFY_EVENT_BP7S: RCTModule.NOTIFY_EVENT_BP7S,

    /**
     * get battery of BP7S
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
     * set the unit of device
     * Attentation: Please register to receive event(BPProfileModule.Action_setUnitSuccess) before call the api.
     *
     * @param {string} mac
     * @param {number} unit
     * @return Event('Action_setUnitSuccess') with a Map object.
     * eg.
     * @api public
     */
    setUnit:function (mac:string, unit:number): void{
        if (RCTModule != null) {
            RCTModule.setUnit(mac,unit);
        }else {
            console.log('~~~~~ RCTModule is null')
        }
    },
    angleSet:function (mac:string, leftUpper:number, leftLow:number, rightUpper:number, rightLow:number): void{
        if (RCTModule != null) {
            RCTModule.angleSet(mac,leftUpper,leftLow,rightUpper,rightLow);
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

    //disconnect with BP7S device

    disconnect: function (mac: string): void {

        if (RCTModule != null) {
            RCTModule.disconnect(mac);
        }else {
            console.log('~~~~~ RCTModule is null')
        }
    }


}

module.exports = BP7SModule