'use strict';


var { NativeModules } = require('react-native');

var RCTModule = NativeModules.BG1Module

/**
 * @module BG1Module
 */
module.exports = {
    /**
     * Notify event type for BG1.
     */
    Event_Notify: RCTModule.Event_Notify,

     /**
     * Send code to bg1 device
     * <ul>
     *     <li>This is an asynchronous call, it will return immediately.</li>
     *     <li>If get successfully, following event will be emit:<br/>
     *     {@link module:BG1Module.Event_Notify BG1Module.Event_Notify("event_notify_bg1")}<br/>
     *     The key and value will be as below:
     *     <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     *          <tr bgcolor="#cccccc"><th >Key</th><th align="center" >Value</th></tr>
     *          <tr><td>action</td><td>{@link module:BG1ProfileModule.ACTION_BG1_SENDCODE_RESULT BG1ProfileModule.ACTION_BG1_SENDCODE_RESULT("action_sendcode_result_for_bg1")}</td></tr>
     *          <tr><td>{@link module:BG1ProfileModule.BG1_SENDCODE_RESULT BG1ProfileModule.BG1_SENDCODE_RESULT("sendcode_result_for_bg1")}</td><td>Flag of send code. <br/> e.g. {"sendcode_result_for_bg1":0,"mac":"","type":"BG1","action":"action_sendcode_result_for_bg1"} </td></tr>
     *          <tr><td>action</td><td>{@link module:BG1ProfileModule.ACTION_BG1_MEASURE_STRIP_IN BG1ProfileModule.ACTION_BG1_MEASURE_STRIP_IN("action_measure_strip_in_for_bg1")}</td><td><br/>e.g.{"mac":"","type":"BG1","action":"action_measure_strip_in_for_bg1"}</td></tr>
     *          <tr><td>action</td><td>{@link module:BG1ProfileModule.ACTION_BG1_MEASURE_GET_BLOOD BG1ProfileModule.ACTION_BG1_MEASURE_GET_BLOOD("action_measure_get_blood_for_bg1")}</td><td><br/>e.g.{"mac":"","type":"BG1","action":"action_measure_get_blood_for_bg1"}</td></tr>
     *          <tr><td>action</td><td>{@link module:BG1ProfileModule.ACTION_BG1_MEASURE_RESULT BG1ProfileModule.ACTION_BG1_MEASURE_RESULT("action_measure_result_for_bg1")}</td></tr>
     *          <tr><td>{@link module:BG1ProfileModule.BG1_MEASURE_RESULT BG1ProfileModule.BG1_MEASURE_RESULT("measure_result_for_bg1")}</td><td>Value of measure result.</td></tr>
     *          <tr><td>{@link module:BG1ProfileModule.DATA_ID BG1ProfileModule.DATA_ID("dataID")}</td><td>DataId of measure result. <br/> e.g. {"dataID":"B4D34EE3764178BBE858055473B18766","measure_result_for_bg1":131,"mac":"","type":"BG1","action":"action_measure_result_for_bg1"}</td></tr>
     *          <tr><td>action</td><td>{@link module:BG1ProfileModule.ACTION_BG1_MEASURE_STRIP_OUT BG1ProfileModule.ACTION_BG1_MEASURE_STRIP_OUT("action_measure_strip_out_for_bg1")}</td><td><br/>e.g.{"mac":"","type":"BG1","action":"action_measure_get_blood_for_bg1"}</td></tr>
     *     </table>
     *     </li>
     *
     *     <li>
     *         If error happens, following event will be emit:</br>
     *         {@link module:BG1Module.Event_Notify BG1Module.Event_Notify("event_notify_bg1")}</br>
     *         The key and value will be as below:
     *         <table style="width:100px" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     *             <tr bgcolor="#cccccc"><th >Key</th><th align="center" >Value</th></tr>
     *             <tr><td>action</td><td>{@link module:BG1ProfileModule.ACTION_BG1_MEASURE_STANDBY BG1ProfileModule.ACTION_BG1_MEASURE_STANDBY("action_measure_standby_for_bg1")}</td><td><br/>e.g.{"mac":"","type":"BG1","action":"action_measure_standby_for_bg1"}</td></tr>
     *             <tr><td>action</td><td>{@link module:BG1ProfileModule.ACTION_BG1_MEASURE_ERROR BG1ProfileModule.ACTION_BG1_MEASURE_ERROR("action_measure_error_for_bg1")}</td></tr>
     *             <tr><td>{@link module:BG1ProfileModule.BG1_MEASURE_ERROR BG1ProfileModule.BG1_MEASURE_ERROR("error_num_for_bg1")}</td><td>Error number. <br/> e.g. {"error_num_for_bg1":12,"mac":"","type":"BG1","action":"action_measure_error_for_bg1"} </td></tr>
     *         </table>
     *     </li>
     *
     *     <li>
     *         <b>Attention</b>, if you want to be notified, it is mandatory to call following method before you call this method:<br/>
     *         <b>DeviceEventEmitter.addListener(BG1Module.Event_Notify, function (e: Event){});</b>
     *     </li>
     * </ul>
     * 
     * @param {string} QRCode
     */
	sendCode: function(QRCode: string): void {
        if (RCTModule != null) {
            RCTModule.sendCode(QRCode);
        }else {
            console.log('~~~~~ RCTModule is null')
        }
	},
    
    /**
     * Parse bottle info from QRCode, include strip expire time,strip number,bottle id
     * <ul>
     *     <li>This is an asynchronous call, it will return immediately.</li>
     *     <li>If get successfully, following event will be emit:<br/>
     *     {@link module:BG1Module.Event_Notify BG1Module.Event_Notify("event_notify_bg1")}<br/>
     *     The result will be as below:
     *     {"bottleInfo":[{"overDate":"2099-12-16","stripNum":"255","bottleId":"4294967295"}]}
     *     </li>
     *
     *     <li>
     *         If error happens, following event will be emit:</br>
     *         {@link module:BG1Module.Event_Notify BG1Module.Event_Notify("event_notify_bg1")}</br>
     *         The result will be as below:
     *         {}
     *     </li>
     *
     *     <li>
     *         <b>Attention</b>, if you want to be notified, it is mandatory to call following method before you call this method:<br/>
     *         <b>DeviceEventEmitter.addListener(BG1Module.Event_Notify, function (e: Event){});</b>
     *     </li>
     * </ul>
     * @param {string} QRCode
     */
    getBottleInfoFromQR: function(QRCode: string): void {
        if (RCTModule != null) {
            RCTModule.getBottleInfoFromQR(QRCode);
        }else {
            console.log('~~~~~ RCTModule is null')
        }
    }

}