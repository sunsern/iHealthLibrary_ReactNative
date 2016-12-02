/**
 * Created by Jeepend on 11/11/2016.
 */
'use strict';


var {NativeModules} = require('react-native');

var RCTModule = NativeModules.AM4Module

/**
 * @module AM4Module
 */
module.exports = {
    /**
     * Notify event type for AM4
     */
    Event_Notify: RCTModule.Event_Notify,
    /**
     * Get AM4 device's IDPS information.
     * <ul>
     * <li>This is an asynchronous call, it will return immediately.</li>
     * <li>If get successfully, following event will be emit:<br/>
     * {@link module:AM4Module.Event_Notify AM4Module.Event_Notify("event_notify_am4")}<br/>
     * The IDPS information will be the event object.
     * </li>
     * <li>If error happens, following event will be emit:<br/>
     * {@link module:AM4Module.Event_Notify AM4Module.Event_Notify("event_notify_am4")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:AMProfileModule.ACTION_ERROR_AM AMProfileModule.ACTION_ERROR_AM("error_am")}</td></tr>
     * <tr><td>{@link module:AMProfileModule.ERROR_NUM_AM AMProfileModule.ERROR_NUM_AM("error")}</td><td>{@link module:AMProfileModule.ERROR_ID_ILLEGAL_ARGUMENT AMProfileModule.ERROR_ID_ILLEGAL_ARGUMENT(400)}indicates parameter error.<br/>{@link module:AMProfileModule.ERROR_ID_VERSION_NOT_SUPPORT AMProfileModule.ERROR_ID_VERSION_NOT_SUPPORT(402)}indicates version not support error.</td></tr>
     * <tr><td>{@link module:AMProfileModule.ERROR_DESCRIPTION_AM AMProfileModule.ERROR_DESCRIPTION_AM("description")}</td><td>Detailed description of the error</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>
     * Attention, if you want to be notified, it is mandatory to call following method before you call this method:<br/>
     * DeviceEventEmitter.addListener(AM4Module.Event_Notify, function (e: Event){});
     * </li>
     * </ul>
     * @param {string} mac Device's mac address
     */
    getIdps: function (mac) {
        RCTModule.getIdps(mac)
    },
    /**
     * Reset AM4 device.
     * <ul>
     * <li>This is an asynchronous call, it will return immediately.</li>
     * <li>If reset successfully, following event will be emit:<br/>
     * {@link module:AM4Module.Event_Notify AM4Module.Event_Notify("event_notify_am4")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>AMProfileModule.ACTION_RESET_AM</td></tr>
     * <tr><td>AMProfileModule.RESET_AM</td><td>0 indicates reset failed.<br/>1 indicates reset successfully.</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>If error happens, following event will be emit:<br/>
     * {@link module:AM4Module.Event_Notify AM4Module.Event_Notify("event_notify_am4")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:AMProfileModule.ACTION_ERROR_AM AMProfileModule.ACTION_ERROR_AM("error_am")}</td></tr>
     * <tr><td>{@link module:AMProfileModule.ERROR_NUM_AM AMProfileModule.ERROR_NUM_AM("error")}</td><td>{@link module:AMProfileModule.ERROR_ID_ILLEGAL_ARGUMENT AMProfileModule.ERROR_ID_ILLEGAL_ARGUMENT(400)}indicates parameter error.<br/>{@link module:AMProfileModule.ERROR_ID_VERSION_NOT_SUPPORT AMProfileModule.ERROR_ID_VERSION_NOT_SUPPORT(402)}indicates version not support error.</td></tr>
     * <tr><td>{@link module:AMProfileModule.ERROR_DESCRIPTION_AM AMProfileModule.ERROR_DESCRIPTION_AM("description")}</td><td>Detailed description of the error</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>
     * Attention, if you want to be notified, it is mandatory to call following method before you call this method:<br/>
     * DeviceEventEmitter.addListener(AM4Module.Event_Notify, function (e: Event){});
     * </li>
     * </ul>
     * @param {string} mac Device's mac address
     */
    reset: function (mac) {
        RCTModule.reset(mac)
    },
    /**
     * Get user's ID
     * <ul>
     * <li>This is an asynchronous call, it will return immediately.</li>
     * <li>If reset successfully, following event will be emit:<br/>
     * {@link module:AM4Module.Event_Notify AM4Module.Event_Notify("event_notify_am4")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>AMProfileModule.ACTION_USERID_AM</td></tr>
     * <tr><td>AMProfileModule.USERID_AM</td><td>User's ID</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>If error happens, following event will be emit:<br/>
     * {@link module:AM4Module.Event_Notify AM4Module.Event_Notify("event_notify_am4")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:AMProfileModule.ACTION_ERROR_AM AMProfileModule.ACTION_ERROR_AM("error_am")}</td></tr>
     * <tr><td>{@link module:AMProfileModule.ERROR_NUM_AM AMProfileModule.ERROR_NUM_AM("error")}</td><td>{@link module:AMProfileModule.ERROR_ID_ILLEGAL_ARGUMENT AMProfileModule.ERROR_ID_ILLEGAL_ARGUMENT(400)}indicates parameter error.<br/>{@link module:AMProfileModule.ERROR_ID_VERSION_NOT_SUPPORT AMProfileModule.ERROR_ID_VERSION_NOT_SUPPORT(402)}indicates version not support error.</td></tr>
     * <tr><td>{@link module:AMProfileModule.ERROR_DESCRIPTION_AM AMProfileModule.ERROR_DESCRIPTION_AM("description")}</td><td>Detailed description of the error</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>
     * Attention, if you want to be notified, it is mandatory to call following method before you call this method:<br/>
     * DeviceEventEmitter.addListener(AM4Module.Event_Notify, function (e: Event){});
     * </li>
     * </ul>
     * @param {string} mac Device's mac address
     */
    getUserId: function (mac) {
        RCTModule.getUserId(mac)
    },
    /**
     * Get alarms' count
     * <ul>
     * <li>This is an asynchronous call, it will return immediately.</li>
     * <li>If get successfully, following event will be emit:<br/>
     * {@link module:AM4Module.Event_Notify AM4Module.Event_Notify("event_notify_am4")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>AMProfileModule.ACTION_GET_ALARMNUM_AM</td></tr>
     * <tr><td>AMProfileModule.GET_ALARMNUM_AM</td><td>Alarm clock count</td></tr>
     * <tr><td>AMProfileModule.GET_ALARMNUM_ID_AM</td><td>Alarm clock id array, e.g. [1, 2, 3]</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>If error happens, following event will be emit:<br/>
     * {@link module:AM4Module.Event_Notify AM4Module.Event_Notify("event_notify_am4")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:AMProfileModule.ACTION_ERROR_AM AMProfileModule.ACTION_ERROR_AM("error_am")}</td></tr>
     * <tr><td>{@link module:AMProfileModule.ERROR_NUM_AM AMProfileModule.ERROR_NUM_AM("error")}</td><td>{@link module:AMProfileModule.ERROR_ID_ILLEGAL_ARGUMENT AMProfileModule.ERROR_ID_ILLEGAL_ARGUMENT(400)}indicates parameter error.<br/>{@link module:AMProfileModule.ERROR_ID_VERSION_NOT_SUPPORT AMProfileModule.ERROR_ID_VERSION_NOT_SUPPORT(402)}indicates version not support error.</td></tr>
     * <tr><td>{@link module:AMProfileModule.ERROR_DESCRIPTION_AM AMProfileModule.ERROR_DESCRIPTION_AM("description")}</td><td>Detailed description of the error</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>
     * Attention, if you want to be notified, it is mandatory to call following method before you call this method:<br/>
     * DeviceEventEmitter.addListener(AM4Module.Event_Notify, function (e: Event){});
     * </li>
     * </ul>
     * @param {string} mac Device's mac address
     */
    getAlarmClockNum: function (mac) {
        RCTModule.getAlarmClockNum(mac)
    },
    /**
     * Get alarm information by id
     * <ul>
     * <li>This is an asynchronous call, it will return immediately.</li>
     * <li>If get successfully, following event will be emit:<br/>
     * {@link module:AM4Module.Event_Notify AM4Module.Event_Notify("event_notify_am4")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>AMProfileModule.ACTION_GET_ALARMINFO_AM</td></tr>
     * <tr><td>AMProfileModule.GET_ALARM_CLOCK_DETAIL</td><td>Alarm imformation array.</td></tr>
     * <tr><td>AMProfileModule.GET_ALARM_ID_AM</td><td>Alarm clock id for each elemet in the array.</td></tr>
     * <tr><td>AMProfileModule.GET_ALARM_TIME_AM</td><td>Alarm clock time for each elemet in the array.</td></tr>
     * <tr><td>AMProfileModule.GET_ALARM_ISREPEAT_AM</td><td>true if the alarm will repeat as the week repeat information shows below.<br/>false will not repeat.</td></tr>
     * <tr><td>AMProfileModule.GET_ALARM_WEEK_AM</td><td>Week repeat information, true if the alarm will repeat on specified day.</td></tr>
     * <tr><td>AMProfileModule.GET_ALARM_ISON_AM</td><td>true indicates the alarm is enabled.<br/>false indicates the alarm is disabled.</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>If error happens, following event will be emit:<br/>
     * {@link module:AM4Module.Event_Notify AM4Module.Event_Notify("event_notify_am4")}<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>{@link module:AMProfileModule.ACTION_ERROR_AM AMProfileModule.ACTION_ERROR_AM("error_am")}</td></tr>
     * <tr><td>{@link module:AMProfileModule.ERROR_NUM_AM AMProfileModule.ERROR_NUM_AM("error")}</td><td>{@link module:AMProfileModule.ERROR_ID_ILLEGAL_ARGUMENT AMProfileModule.ERROR_ID_ILLEGAL_ARGUMENT(400)}indicates parameter error.<br/>{@link module:AMProfileModule.ERROR_ID_VERSION_NOT_SUPPORT AMProfileModule.ERROR_ID_VERSION_NOT_SUPPORT(402)}indicates version not support error.</td></tr>
     * <tr><td>{@link module:AMProfileModule.ERROR_DESCRIPTION_AM AMProfileModule.ERROR_DESCRIPTION_AM("description")}</td><td>Detailed description of the error</td></tr>
     * </tbody>
     * </table>
     * </li>
     * <li>
     * Attention, if you want to be notified, it is mandatory to call following method before you call this method:<br/>
     * DeviceEventEmitter.addListener(AM4Module.Event_Notify, function (e: Event){});
     * </li>
     * </ul>
     * @param {string} mac Device's mac address
     * @param {array} alarmIDArray Alarm id array to be query.<br/>
     *            <ul>
     *            <li>The parameters should be 1, 2, or 3</li>
     *            <li>The duplicate parameters will be IGNORED</li>
     *            <li>The query result will be in ascending order of id.</li>
     *            <li>If specified alarm not set yet, the result will not include the id.</li>
     *            </ul>
     */
    getAlarmClockDetail: function (mac, alarmIDArray) {
        RCTModule.getAlarmClockDetail(mac, alarmIDArray)
    },
    setAlarmClock: function (mac, id, hour, min, isRepeat, weekArray, isOn) {
        RCTModule.setAlarmClock(mac, id, hour, min, isRepeat, weekArray, isOn)
    },
    deleteAlarmClock: function (mac, id) {
        RCTModule.deleteAlarmClock(mac, id)
    },
    getActivityRemind: function (mac) {
        RCTModule.getActivityRemind(mac)
    },
    setActivityRemind: function (mac, hour, min, isOn) {
        RCTModule.setActivityRemind(mac, hour, min, isOn)
    },
    queryAMState: function (mac) {
        RCTModule.queryAMState(mac)
    },
    setUserId: function (mac, id) {
        RCTModule.setUserId(mac, id)
    },
    getUserInfo: function (mac) {
        RCTModule.getUserInfo(mac)
    },
    setUserBmr: function (mac, bmr) {
        RCTModule.setUserBmr(mac, bmr)
    },
    syncActivityData: function (mac) {
        RCTModule.syncActivityData(mac)
    },
    syncSleepData: function (mac) {
        RCTModule.syncSleepData(mac)
    },
    syncRealData: function (mac) {
        RCTModule.syncRealData(mac)
    },
    syncRealTime: function (mac) {
        RCTModule.syncRealTime(mac)
    },
    setHourMode: function (mac, hourMode) {
        RCTModule.setHourMode(mac, hourMode)
    },
    getHourMode: function (mac) {
        RCTModule.getHourMode(mac)
    },
    disconnect: function (mac) {
        RCTModule.disconnect(mac)
    },
    setUserInfo: function (mac, age, height, weight, gender, unit, target, activityLevel, min) {
        RCTModule.setUserInfo(mac, age, height, weight, gender, unit, target, activityLevel, min)
    },
    syncStageReportData: function (mac) {
        RCTModule.syncStageReportData(mac)
    },
    sendRandom: function (mac) {
        RCTModule.sendRandom(mac)
    },
    checkSwimPara: function (mac) {
        RCTModule.checkSwimPara(mac)
    },
    setSwimPara: function (mac, isOpen, poolLength, hours, minutes, unit) {
        RCTModule.setSwimPara(mac, isOpen, poolLength, hours, minutes, unit)
    },
}