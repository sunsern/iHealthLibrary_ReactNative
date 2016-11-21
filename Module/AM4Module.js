/**
 * Created by Jeepend on 11/11/2016.
 */
'use strict';


var {NativeModules} = require('react-native');

var RCTModule = NativeModules.AM4Module

var AM4Module = {
    /**
     * Notify event type for AM4
     */
    NOTIFY_EVENT_AM4: RCTModule.NOTIFY_EVENT_AM4,
    getIdps: function (mac: String) {
        RCTModule.getIdps(mac)
    },
    reset: function (mac: String, id: int) {
        RCTModule.reset(mac, id)
    },
    getUserId: function (mac: String) {
        RCTModule.getUserId(mac)
    },
    getAlarmClockNum: function (mac: String) {
        RCTModule.getAlarmClockNum(mac)
    },
    getAlarmClockDetail: function (mac: String, alarmIDArray: Array) {
        RCTModule.getAlarmClockDetail(mac, alarmIDArray)
    },
    setAlarmClock: function (mac: String, id: int, hour: int, min: int, isRepeat: boolean, weekArray: Array, isOn: boolean) {
        RCTModule.setAlarmClock(mac, id, hour, min, isRepeat, weekArray, isOn)
    },
    deleteAlarmClock: function (mac: String, id: int) {
        RCTModule.deleteAlarmClock(mac, id)
    },
    getActivityRemind: function (mac: String) {
        RCTModule.getActivityRemind(mac)
    },
    setActivityRemind: function (mac: String, hour: int, min: int, isOn: boolean) {
        RCTModule.setActivityRemind(mac, hour, min, isOn)
    },
    queryAMState: function (mac: String) {
        RCTModule.queryAMState(mac)
    },
    setUserId: function (mac: String, id: int) {
        RCTModule.setUserId(mac, id)
    },
    getUserInfo: function (mac: String) {
        RCTModule.getUserInfo(mac)
    },
    setUserBmr: function (mac: String, bmr: int) {
        RCTModule.setUserBmr(mac, bmr)
    },
    syncActivityData: function (mac: String) {
        RCTModule.syncActivityData(mac)
    },
    syncSleepData: function (mac: String) {
        RCTModule.syncSleepData(mac)
    },
    syncRealData: function (mac: String) {
        RCTModule.syncRealData(mac)
    },
    syncRealTime: function (mac: String) {
        RCTModule.syncRealTime(mac)
    },
    setHourMode: function (mac: String, hourMode: int) {
        RCTModule.setHourMode(mac, hourMode)
    },
    getHourMode: function (mac: String) {
        RCTModule.getHourMode(mac)
    },
    disconnect: function (mac: String) {
        RCTModule.disconnect(mac)
    },
    setUserInfo: function (mac: String, age: int, height: int, weight: float, gender: int, unit: int, target: int, activityLevel: int, min: int) {
        RCTModule.setUserInfo(mac, age, height, weight, gender, unit, target, activityLevel, min)
    },
    syncStageReportData: function (mac: String) {
        RCTModule.syncStageReportData(mac)
    },
    sendRandom: function (mac: String) {
        RCTModule.sendRandom(mac)
    },
    checkSwimPara: function (mac: String) {
        RCTModule.checkSwimPara(mac)
    },
    setSwimPara: function (mac: String, isOpen: boolean, poolLength: int, hours: int, minutes: int, unit: int) {
        RCTModule.setSwimPara(mac, isOpen, poolLength, hours, minutes, unit)
    },
}

module.exports = AM4Module