/**
 * Created by Jeepend on 22/11/2016.
 */
'use strict';


var {NativeModules} = require('react-native');

var RCTModule = NativeModules.AM3SModule
/**
 * @module AM3SModule
 */
module.exports = {
    /**
     * Notify event type for AM3S
     */
    Event_Notify: RCTModule.Event_Notify,
    getIdps: function (mac) {
        RCTModule.getIdps(mac)
    },
    reset: function (mac) {
        RCTModule.reset(mac)
    },
    getUserId: function (mac) {
        RCTModule.getUserId(mac)
    },
    getAlarmClockNum: function (mac) {
        RCTModule.getAlarmClockNum(mac)
    },
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
    setUserInfo: function (mac, age, height, weight: float, gender, unit, target, activityLevel) {
        RCTModule.setUserInfo(mac, age, height, weight, gender, unit, target, activityLevel)
    },
    syncStageReportData: function (mac) {
        RCTModule.syncStageReportData(mac)
    },
    sendRandom: function (mac) {
        RCTModule.sendRandom(mac)
    },
    getPicture: function (mac) {
        RCTModule.getPicture(mac)
    },
    setPicture: function (mac, index) {
        RCTModule.setPicture(mac, index)
    }
}