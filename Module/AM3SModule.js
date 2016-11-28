/**
 * Created by Jeepend on 22/11/2016.
 */
'use strict';


var {NativeModules} = require('react-native');

var RCTModule = NativeModules.AM3SModule

var AM3SModule = {
    /**
     * Notify event type for AM3S
     */
    Event_Notify: RCTModule.Event_Notify,
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
    setUserInfo: function (mac: String, age: int, height: int, weight: float, gender: int, unit: int, target: int, activityLevel: int) {
        RCTModule.setUserInfo(mac, age, height, weight, gender, unit, target, activityLevel)
    },
    syncStageReportData: function (mac: String) {
        RCTModule.syncStageReportData(mac)
    },
    sendRandom: function (mac: String) {
        RCTModule.sendRandom(mac)
    },
    getPicture: function (mac: String) {
        RCTModule.getPicture(mac)
    },
    setPicture: function (mac: String, index: int) {
        RCTModule.setPicture(mac, index)
    }
}

module.exports = AM3SModule