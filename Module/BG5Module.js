/**
 * Created by gaoyuanlong on 16/11/17.
 */
'use strict';


var {NativeModules} = require('react-native');

var RCTModule = NativeModules.BG5Module

/**
 * @module BG5Module
 */
module.exports = {
    /**
     * Notify event type for BG5.
     */
    Event_Notify: RCTModule.Event_Notify,

    /**
     * keep BG5 connecting.
     * <ul>
     * <li>This is an asynchronous call, it will return immediately.</li>
     * <li>If keep link successfully, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_KEEP_LINK BGProfileModule.ACTION_KEEP_LINK}</td></tr>
     * <tr><td>{@link module:BGProfileModule.KEEP_LINK BGProfileModule.KEEP_LINK}</td><td>true  Keep link success.<br/>false  Keep link fail.</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>If error happens, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_ERROR_BG AMProfileModule.ACTION_ERROR_BG("action_measure_error")}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG("error_num")}</td><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_DESCRIPTION_BG BGProfileModule.ERROR_DESCRIPTION_BG("error_description")}</td><td>Detailed description of the error</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>
     * Attention, if you want to be notified, it is mandatory to call following method before you call this method:<br/>
     * DeviceEventEmitter.addListener(BG5Module.Event_Notify, function (e: Event){});
     * </li>
     * </ul>
     * @param {string} mac Device's mac address
     */
    holdLink: function (mac){
        if (RCTModule != null) {
            RCTModule.holdLink(mac);
        } else {
            console.log('~~~~~ BG5 holdLink RCTModule is null')
        }
    },

    /**
     * get battery from device.
     * <ul>
     * <li>This is an asynchronous call, it will return immediately.</li>
     * <li>If get battery successfully, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_GET_BATTERY BGProfileModule.ACTION_GET_BATTERY}</td></tr>
     * <tr><td>{@link module:BGProfileModule.GET_BATTERY BGProfileModule.GET_BATTERY}</td><td>The battery is</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>If error happens, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_ERROR_BG BGProfileModule.ACTION_ERROR_BG("action_measure_error")}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG("error_num")}</td><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_DESCRIPTION_BG BGProfileModule.ERROR_DESCRIPTION_BG("error_description")}</td><td>Detailed description of the error</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>
     * Attention, if you want to be notified, it is mandatory to call following method before you call this method:<br/>
     * DeviceEventEmitter.addListener(BG5Module.Event_Notify, function (e: Event){});
     * </li>
     * </ul>
     * @param {string} mac Device's mac address
     */
    getBattery: function (mac){

        if (RCTModule != null) {
            RCTModule.getBattery(mac);
        } else {
            console.log('~~~~~ BG5 getBattery RCTModule is null')
        }
    },

    /**
     * set time to device.
     * <ul>
     * <li>This is an asynchronous call, it will return immediately.</li>
     * <li>If set time successfully, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_SET_TIME BGProfileModule.ACTION_SET_TIME}</td></tr>
     * <tr><td>{@link module:BGProfileModule.SET_TIME BGProfileModule.SET_TIME}</td><td>true/fasle</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>If error happens, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_ERROR_BG AMProfileModule.ACTION_ERROR_BG("action_measure_error")}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG("error_num")}</td><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_DESCRIPTION_BG BGProfileModule.ERROR_DESCRIPTION_BG("error_description")}</td><td>Detailed description of the error</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>
     * Attention, if you want to be notified, it is mandatory to call following method before you call this method:<br/>
     * DeviceEventEmitter.addListener(BG5Module.Event_Notify, function (e: Event){});
     * </li>
     * </ul>
     * @param {string} mac Device's mac address
     */
    setTime: function (mac){
        if (RCTModule != null) {
            RCTModule.setTime(mac);
        } else {
            console.log('~~~~~ BG5 setTime RCTModule is null')
        }
    },

    /**
     * set unit to device.
     * <ul>
     * <li>This is an asynchronous call, it will return immediately.</li>
     * <li>If set unit successfully, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_SET_UNIT BGProfileModule.ACTION_SET_UNIT}</td></tr>
     * <tr><td>{@link module:BGProfileModule.SET_UNIT BGProfileModule.SET_UNIT}</td><td>true/false</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>If error happens, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_ERROR_BG AMProfileModule.ACTION_ERROR_BG("action_measure_error")}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG("error_num")}</td><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_DESCRIPTION_BG BGProfileModule.ERROR_DESCRIPTION_BG("error_description")}</td><td>Detailed description of the error</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>
     * Attention, if you want to be notified, it is mandatory to call following method before you call this method:<br/>
     * DeviceEventEmitter.addListener(BG5Module.Event_Notify, function (e: Event){});
     * </li>
     * </ul>
     * @param {string} mac Device's mac address
     * @param {number} type 1:mmol/L 2:mg/dL
     */
    setUnit: function (mac, type){
        if (RCTModule != null) {
            RCTModule.setUnit(mac, type);
        } else {
            console.log('~~~~~ BG5 setUnit RCTModule is null')
        }
    },

    /**
     * start measure in some types.
     * <ul>
     * <li>This is an asynchronous call, it will return immediately.</li>
     * <li>If start measure successfully, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_START_MEASURE BGProfileModule.ACTION_START_MEASURE}</td></tr>
     * <tr><td>{@link module:BGProfileModule.START_MEASURE BGProfileModule.START_MEASURE}</td><td>true/false</tr>
     * </tbody>
     * </table>
     * </li>
     * <li>If error happens, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_ERROR_BG AMProfileModule.ACTION_ERROR_BG("action_measure_error")}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG("error_num")}</td><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_DESCRIPTION_BG BGProfileModule.ERROR_DESCRIPTION_BG("error_description")}</td><td>Detailed description of the error</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>
     * Attention, if you want to be notified, it is mandatory to call following method before you call this method:<br/>
     * DeviceEventEmitter.addListener(BG5Module.Event_Notify, function (e: Event){});
     * </li>
     * </ul>
     * @param {string} mac Device's mac address
     * @param {number} type Measure type, 1.Measure with blood measure, 2.Measure with control liquid
     */
    startMeasure: function (mac, type){
        if (RCTModule != null) {
            RCTModule.startMeasure(mac, type);
        } else {
            console.log('~~~~~ BG5 startMeasure RCTModule is null')
        }
    },

    /**
     * get offline data from device.
     * <ul>
     * <li>This is an asynchronous call, it will return immediately.</li>
     * <li>If get offline data successfully, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_GET_OFFLINEDATA_COUNT BGProfileModule.ACTION_GET_OFFLINEDATA_COUNT}</td></tr>
     * <tr><td>{@link module:BGProfileModule.GET_OFFLINEDATA_COUNT BGProfileModule.GET_OFFLINEDATA_COUNT}</td><td>The offline data count is</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_GET_OFFLINEDATA BGProfileModule.ACTION_GET_OFFLINEDATA}</td></tr>
     * <tr><td>{@link module:BGProfileModule.GET_OFFLINEDATA BGProfileModule.GET_OFFLINEDATA}</td><td>The offline data is</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>If error happens, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_ERROR_BG BGProfileModule.ACTION_ERROR_BG("action_measure_error")}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG("error_num")}</td><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_DESCRIPTION_BG BGProfileModule.ERROR_DESCRIPTION_BG("error_description")}</td><td>Detailed description of the error</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>
     * Attention, if you want to be notified, it is mandatory to call following method before you call this method:<br/>
     * DeviceEventEmitter.addListener(BG5Module.Event_Notify, function (e: Event){});
     * </li>
     * </ul>
     * @param {string} mac Device's mac address
     */
    getOfflineData: function (mac){
        if (RCTModule != null) {
            RCTModule.getOfflineData(mac);
        } else {
            console.log('~~~~~ BG5 getOffineData RCTModule is null')
        }
    },

    /**
     * delete the offline data in devices.
     * <ul>
     * <li>This is an asynchronous call, it will return immediately.</li>
     * <li>If delete offline data successfully, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_DELETE_OFFLINEDATA BGProfileModule.ACTION_DELETE_OFFLINEDATA}</td></tr>
     * <tr><td>{@link module:BGProfileModule.DELETE_OFFLINEDATA BGProfileModule.DELETE_OFFLINEDATA}</td><td>true/false</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>If error happens, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_ERROR_BG AMProfileModule.ACTION_ERROR_BG("action_measure_error")}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG("error_num")}</td><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_DESCRIPTION_BG BGProfileModule.ERROR_DESCRIPTION_BG("error_description")}</td><td>Detailed description of the error</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>
     * Attention, if you want to be notified, it is mandatory to call following method before you call this method:<br/>
     * DeviceEventEmitter.addListener(BG5Module.Event_Notify, function (e: Event){});
     * </li>
     * </ul>
     * @param {string} mac Device's mac address
     */
    deleteOfflineData: function (mac){
        if (RCTModule != null) {
            RCTModule.deleteOfflineData(mac);
        } else {
            console.log('~~~~~ BG5 deleteOfflineData RCTModule is null')
        }
    },

    /**
     * set QR code to device.
     * <ul>
     * <li>This is an asynchronous call, it will return immediately.</li>
     * <li>If set QR code to device successfully, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_SET_BOTTLEMESSAGE BGProfileModule.ACTION_SET_BOTTLEMESSAGE}</td></tr>
     * <tr><td>{@link module:BGProfileModule.SET_BOTTLEMESSAGE BGProfileModule.SET_BOTTLEMESSAGE}</td><td>true/false</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>If error happens, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_ERROR_BG AMProfileModule.ACTION_ERROR_BG("action_measure_error")}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG("error_num")}</td><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_DESCRIPTION_BG BGProfileModule.ERROR_DESCRIPTION_BG("error_description")}</td><td>Detailed description of the error</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>
     * Attention, if you want to be notified, it is mandatory to call following method before you call this method:<br/>
     * DeviceEventEmitter.addListener(BG5Module.Event_Notify, function (e: Event){});
     * </li>
     * </ul>
     * @param {string} mac: Device's mac address
     * @param {number} stripType: GDH code or GOD code
     * @param {number} measureType: Blood measure or Liquid measure
     * @param {number} QR: the QR code set to deivce
     * @param {number} stripNum: the left count of strip
     * @param {string} overDateR: the expire time of the strip
     */
    setBottleMessage: function (mac, stripType, measureType, QRCode, stripNum, overDate){
        if (RCTModule != null) {
            RCTModule.setBottleMessageWithInfo(mac, stripType, measureType, QRCode, stripNum, overDate);
        } else {
            console.log('~~~~~ BG5 setBottleMessage RCTModule is null')
        }
    },

    /**
     * get device message.
     * <ul>
     * <li>This is an asynchronous call, it will return immediately.</li>
     * <li>If get device message successfully, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_GET_BOTTLEMESSAGE BGProfileModule.ACTION_GET_BOTTLEMESSAGE}</td></tr>
     * <tr><td>{@link module:BGProfileModule.GET_EXPIRECTIME BGProfileModule.GET_EXPIRECTIME}</td><td>The expirectime is </td></tr>
     * <tr><td>{@link module:BGProfileModule.GET_USENUM BGProfileModule.GET_USENUM}</td><td>The user num is </td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>If error happens, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_ERROR_BG AMProfileModule.ACTION_ERROR_BG("action_measure_error")}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG("error_num")}</td><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_DESCRIPTION_BG BGProfileModule.ERROR_DESCRIPTION_BG("error_description")}</td><td>Detailed description of the error</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>
     * Attention, if you want to be notified, it is mandatory to call following method before you call this method:<br/>
     * DeviceEventEmitter.addListener(BG5Module.Event_Notify, function (e: Event){});
     * </li>
     * </ul>
     * @param {string} mac Device's mac address
     */
    getBottleMessage: function (mac){
        if (RCTModule != null) {
            RCTModule.getBottleMessage(mac);
        } else {
            console.log('~~~~~ BG5 getBottleMessage RCTModule is null')
        }
    },

    /**
     * set userID to device.
     * <ul>
     * <li>This is an asynchronous call, it will return immediately.</li>
     * <li>If set userID to device successfully, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_SET_BOTTLEID BGProfileModule.ACTION_SET_BOTTLEID}</td></tr>
     * <tr><td>{@link module:BGProfileModule.SET_BOTTLEID BGProfileModule.SET_BOTTLEID}</td><td>true/false</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>If error happens, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_ERROR_BG AMProfileModule.ACTION_ERROR_BG("action_measure_error")}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG("error_num")}</td><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_DESCRIPTION_BG BGProfileModule.ERROR_DESCRIPTION_BG("error_description")}</td><td>Detailed description of the error</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>
     * Attention, if you want to be notified, it is mandatory to call following method before you call this method:<br/>
     * DeviceEventEmitter.addListener(BG5Module.Event_Notify, function (e: Event){});
     * </li>
     * </ul>
     * @param {string} mac Device's mac address
     * @param {number} ID UserID set to device
     */
    setBottleID: function (mac, ID){
        if (RCTModule != null) {
            RCTModule.setBottleId(mac, ID);
        } else {
            console.log('~~~~~ BG5 setBottleID RCTModule is null')
        }
    },

    /**
     * get device ID.
     * <ul>
     * <li>This is an asynchronous call, it will return immediately.</li>
     * <li>If get device ID successfully, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_GET_BOTTLEID BGProfileModule.ACTION_GET_BOTTLEID}</td></tr>
     * <tr><td>{@link module:BGProfileModule.GET_BOTTLEID BGProfileModule.GET_BOTTLEID}</td><td>The bottleID is </td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>If error happens, following event will be emit:<br/>
     * {@link module:BG5Module.Event_Notify BG5Module.Event_Notify("event_notify_bg5")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:BGProfileModule.ACTION_ERROR_BG AMProfileModule.ACTION_ERROR_BG("action_measure_error")}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG("error_num")}</td><td>{@link module:BGProfileModule.ERROR_NUM_BG BGProfileModule.ERROR_NUM_BG}</td></tr>
     * <tr><td>{@link module:BGProfileModule.ERROR_DESCRIPTION_BG BGProfileModule.ERROR_DESCRIPTION_BG("error_description")}</td><td>Detailed description of the error</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>
     * Attention, if you want to be notified, it is mandatory to call following method before you call this method:<br/>
     * DeviceEventEmitter.addListener(BG5Module.Event_Notify, function (e: Event){});
     * </li>
     * </ul>
     * @param {string} mac Device's mac address
     */
    getBottleID: function (mac){
        if (RCTModule != null) {
            RCTModule.getBottleId(mac);
        } else {
            console.log('~~~~~ BG5 getBottleID RCTModule is null')
        }
    },

    disConnect: function (mac){
        if (RCTModule != null) {
            RCTModule.disConnect(mac);
        } else {
            console.log('~~~~~ BG5 getBottleID RCTModule is null')
        }
    },
}