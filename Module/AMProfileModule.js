/**
 * Created by Jeepend on 15/11/2016.
 */
'use strict';


var {NativeModules} = require('react-native');

var RCTModule = NativeModules.AMProfileModule

var AMProfileModule = {
    ACTION_ERROR_AM: RCTModule.ACTION_ERROR_AM,
    ACTION_RESET_AM: RCTModule.ACTION_RESET_AM,
    ACTION_USERID_AM: RCTModule.ACTION_USERID_AM,
    ACTION_SET_USERID_SUCCESS_AM: RCTModule.ACTION_SET_USERID_SUCCESS_AM,
    ACTION_SYNC_TIME_SUCCESS_AM: RCTModule.ACTION_SYNC_TIME_SUCCESS_AM,
    ACTION_SET_USERINFO_SUCCESS_AM: RCTModule.ACTION_SET_USERINFO_SUCCESS_AM,
    ACTION_GET_USERINFO_AM: RCTModule.ACTION_GET_USERINFO_AM,
    ACTION_GET_ALARMNUM_AM: RCTModule.ACTION_GET_ALARMNUM_AM,
    ACTION_GET_ALARMINFO_AM: RCTModule.ACTION_GET_ALARMINFO_AM,
    ACTION_SET_ALARMINFO_SUCCESS_AM: RCTModule.ACTION_SET_ALARMINFO_SUCCESS_AM,
    ACTION_DELETE_ALARM_SUCCESS_AM: RCTModule.ACTION_DELETE_ALARM_SUCCESS_AM,
    ACTION_GET_ACTIVITY_REMIND_AM: RCTModule.ACTION_GET_ACTIVITY_REMIND_AM,
    ACTION_SET_ACTIVITYREMIND_SUCCESS_AM: RCTModule.ACTION_SET_ACTIVITYREMIND_SUCCESS_AM,
    ACTION_SYNC_ACTIVITY_DATA_AM: RCTModule.ACTION_SYNC_ACTIVITY_DATA_AM,
    ACTION_SYNC_SLEEP_DATA_AM: RCTModule.ACTION_SYNC_SLEEP_DATA_AM,
    ACTION_SYNC_STAGE_DATA_AM: RCTModule.ACTION_SYNC_STAGE_DATA_AM,
    ACTION_QUERY_STATE_AM: RCTModule.ACTION_QUERY_STATE_AM,
    ACTION_SYNC_REAL_DATA_AM: RCTModule.ACTION_SYNC_REAL_DATA_AM,
    ACTION_SET_BMR_SUCCESS_AM: RCTModule.ACTION_SET_BMR_SUCCESS_AM,
    ACTION_GET_SWIMINFO_AM: RCTModule.ACTION_GET_SWIMINFO_AM,
    ACTION_SET_SWIMINFO_AM: RCTModule.ACTION_SET_SWIMINFO_AM,
    ACTION_GET_RANDOM_AM: RCTModule.ACTION_GET_RANDOM_AM,
    ACTION_SET_HOUR_MODE_SUCCESS_AM: RCTModule.ACTION_SET_HOUR_MODE_SUCCESS_AM,
    ACTION_GET_HOUR_MODE_AM: RCTModule.ACTION_GET_HOUR_MODE_AM,
    ACTION_SET_DEVICE_MODE_AM: RCTModule.ACTION_SET_DEVICE_MODE_AM,
    ACTION_CLOUD_BINDING_AM_SUCCESS: RCTModule.ACTION_CLOUD_BINDING_AM_SUCCESS,
    ACTION_CLOUD_BINDING_AM_FAIL: RCTModule.ACTION_CLOUD_BINDING_AM_FAIL,
    ACTION_CLOUD_UNBINDING_AM_SUCCESS: RCTModule.ACTION_CLOUD_UNBINDING_AM_SUCCESS,
    ACTION_CLOUD_UNBINDING_AM_FAIL: RCTModule.ACTION_CLOUD_UNBINDING_AM_FAIL,
    ACTION_CLOUD_SEARCH_AM: RCTModule.ACTION_CLOUD_SEARCH_AM,
    ACTION_CLOUD_SEARCH_FAIL_AM: RCTModule.ACTION_CLOUD_SEARCH_FAIL_AM,
    ACTION_SET_PICTURE_SUCCESS_AM: RCTModule.ACTION_SET_PICTURE_SUCCESS_AM,
    ACTION_GET_PICTURE_AM: RCTModule.ACTION_GET_PICTURE_AM

}

module.exports = AMProfileModule