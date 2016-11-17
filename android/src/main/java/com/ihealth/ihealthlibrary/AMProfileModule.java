package com.ihealth.ihealthlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.ihealth.communication.control.AmProfile;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by Jeepend on 15/11/2016.
 */

public class AMProfileModule extends ReactContextBaseJavaModule {
    private static final String modelName = "AMProfileModule";
    private static final String TAG = "AMProfileModule";

    private static final String ACTION_ERROR_AM = "ACTION_ERROR_AM";
    private static final String ACTION_RESET_AM = "ACTION_RESET_AM";
    private static final String ACTION_USERID_AM = "ACTION_USERID_AM";
    private static final String ACTION_SET_USERID_SUCCESS_AM = "ACTION_SET_USERID_SUCCESS_AM";
    private static final String ACTION_SYNC_TIME_SUCCESS_AM = "ACTION_SYNC_TIME_SUCCESS_AM";
    private static final String ACTION_SET_USERINFO_SUCCESS_AM = "ACTION_SET_USERINFO_SUCCESS_AM";
    private static final String ACTION_GET_USERINFO_AM = "ACTION_GET_USERINFO_AM";
    private static final String ACTION_GET_ALARMNUM_AM = "ACTION_GET_ALARMNUM_AM";
    private static final String ACTION_GET_ALARMINFO_AM = "ACTION_GET_ALARMINFO_AM";
    private static final String ACTION_SET_ALARMINFO_SUCCESS_AM = "ACTION_SET_ALARMINFO_SUCCESS_AM";
    private static final String ACTION_DELETE_ALARM_SUCCESS_AM = "ACTION_DELETE_ALARM_SUCCESS_AM";
    private static final String ACTION_GET_ACTIVITY_REMIND_AM = "ACTION_GET_ACTIVITY_REMIND_AM";
    private static final String ACTION_SET_ACTIVITYREMIND_SUCCESS_AM = "ACTION_SET_ACTIVITYREMIND_SUCCESS_AM";
    private static final String ACTION_SYNC_ACTIVITY_DATA_AM = "ACTION_SYNC_ACTIVITY_DATA_AM";
    private static final String ACTION_SYNC_SLEEP_DATA_AM = "ACTION_SYNC_SLEEP_DATA_AM";
    private static final String ACTION_SYNC_STAGE_DATA_AM = "ACTION_SYNC_STAGE_DATA_AM";
    private static final String ACTION_QUERY_STATE_AM = "ACTION_QUERY_STATE_AM";
    private static final String ACTION_SYNC_REAL_DATA_AM = "ACTION_SYNC_REAL_DATA_AM";
    private static final String ACTION_SET_BMR_SUCCESS_AM = "ACTION_SET_BMR_SUCCESS_AM";
    private static final String ACTION_GET_SWIMINFO_AM = "ACTION_GET_SWIMINFO_AM";
    private static final String ACTION_SET_SWIMINFO_AM = "ACTION_SET_SWIMINFO_AM";
    private static final String ACTION_GET_RANDOM_AM = "ACTION_GET_RANDOM_AM";
    private static final String ACTION_SET_HOUR_MODE_SUCCESS_AM = "ACTION_SET_HOUR_MODE_SUCCESS_AM";
    private static final String ACTION_GET_HOUR_MODE_AM = "ACTION_GET_HOUR_MODE_AM";
    private static final String ACTION_SET_DEVICE_MODE_AM = "ACTION_SET_DEVICE_MODE_AM";
    private static final String ACTION_CLOUD_BINDING_AM_SUCCESS = "ACTION_CLOUD_BINDING_AM_SUCCESS";
    private static final String ACTION_CLOUD_BINDING_AM_FAIL = "ACTION_CLOUD_BINDING_AM_FAIL";
    private static final String ACTION_CLOUD_UNBINDING_AM_SUCCESS = "ACTION_CLOUD_UNBINDING_AM_SUCCESS";
    private static final String ACTION_CLOUD_UNBINDING_AM_FAIL = "ACTION_CLOUD_UNBINDING_AM_FAIL";
    private static final String ACTION_CLOUD_SEARCH_AM = "ACTION_CLOUD_SEARCH_AM";
    private static final String ACTION_CLOUD_SEARCH_FAIL_AM = "ACTION_CLOUD_SEARCH_FAIL_AM";
    private static final String ACTION_SET_PICTURE_SUCCESS_AM = "ACTION_SET_PICTURE_SUCCESS_AM";
    private static final String ACTION_GET_PICTURE_AM = "ACTION_GET_PICTURE_AM";

    public AMProfileModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return modelName;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> constants = new HashMap<>();
        constants.put(ACTION_ERROR_AM, AmProfile.ACTION_ERROR_AM);
        constants.put(ACTION_RESET_AM, AmProfile.ACTION_RESET_AM);
        constants.put(ACTION_USERID_AM, AmProfile.ACTION_USERID_AM);
        constants.put(ACTION_SET_USERID_SUCCESS_AM, AmProfile.ACTION_SET_USERID_SUCCESS_AM);
        constants.put(ACTION_SYNC_TIME_SUCCESS_AM, AmProfile.ACTION_SYNC_TIME_SUCCESS_AM);
        constants.put(ACTION_SET_USERINFO_SUCCESS_AM, AmProfile.ACTION_SET_USERINFO_SUCCESS_AM);
        constants.put(ACTION_GET_USERINFO_AM, AmProfile.ACTION_GET_USERINFO_AM);
        constants.put(ACTION_GET_ALARMNUM_AM, AmProfile.ACTION_GET_ALARMNUM_AM);
        constants.put(ACTION_GET_ALARMINFO_AM, AmProfile.ACTION_GET_ALARMINFO_AM);
        constants.put(ACTION_SET_ALARMINFO_SUCCESS_AM, AmProfile.ACTION_SET_ALARMINFO_SUCCESS_AM);
        constants.put(ACTION_DELETE_ALARM_SUCCESS_AM, AmProfile.ACTION_DELETE_ALARM_SUCCESS_AM);
        constants.put(ACTION_GET_ACTIVITY_REMIND_AM, AmProfile.ACTION_GET_ACTIVITY_REMIND_AM);
        constants.put(ACTION_SET_ACTIVITYREMIND_SUCCESS_AM, AmProfile.ACTION_SET_ACTIVITYREMIND_SUCCESS_AM);
        constants.put(ACTION_SYNC_ACTIVITY_DATA_AM, AmProfile.ACTION_SYNC_ACTIVITY_DATA_AM);
        constants.put(ACTION_SYNC_SLEEP_DATA_AM, AmProfile.ACTION_SYNC_SLEEP_DATA_AM);
        constants.put(ACTION_SYNC_STAGE_DATA_AM, AmProfile.ACTION_SYNC_STAGE_DATA_AM);
        constants.put(ACTION_QUERY_STATE_AM, AmProfile.ACTION_QUERY_STATE_AM);
        constants.put(ACTION_SYNC_REAL_DATA_AM, AmProfile.ACTION_SYNC_REAL_DATA_AM);
        constants.put(ACTION_SET_BMR_SUCCESS_AM, AmProfile.ACTION_SET_BMR_SUCCESS_AM);
        constants.put(ACTION_GET_SWIMINFO_AM, AmProfile.ACTION_GET_SWIMINFO_AM);
        constants.put(ACTION_SET_SWIMINFO_AM, AmProfile.ACTION_SET_SWIMINFO_AM);
        constants.put(ACTION_GET_RANDOM_AM, AmProfile.ACTION_GET_RANDOM_AM);
        constants.put(ACTION_SET_HOUR_MODE_SUCCESS_AM, AmProfile.ACTION_SET_HOUR_MODE_SUCCESS_AM);
        constants.put(ACTION_GET_HOUR_MODE_AM, AmProfile.ACTION_GET_HOUR_MODE_AM);
        constants.put(ACTION_SET_DEVICE_MODE_AM, AmProfile.ACTION_SET_DEVICE_MODE_AM);
        constants.put(ACTION_CLOUD_BINDING_AM_SUCCESS, AmProfile.ACTION_CLOUD_BINDING_AM_SUCCESS);
        constants.put(ACTION_CLOUD_BINDING_AM_FAIL, AmProfile.ACTION_CLOUD_BINDING_AM_FAIL);
        constants.put(ACTION_CLOUD_UNBINDING_AM_SUCCESS, AmProfile.ACTION_CLOUD_UNBINDING_AM_SUCCESS);
        constants.put(ACTION_CLOUD_UNBINDING_AM_FAIL, AmProfile.ACTION_CLOUD_UNBINDING_AM_FAIL);
        constants.put(ACTION_CLOUD_SEARCH_AM, AmProfile.ACTION_CLOUD_SEARCH_AM);
        constants.put(ACTION_CLOUD_SEARCH_FAIL_AM, AmProfile.ACTION_CLOUD_SEARCH_FAIL_AM);
        constants.put(ACTION_SET_PICTURE_SUCCESS_AM, AmProfile.ACTION_SET_PICTURE_SUCCESS_AM);
        constants.put(ACTION_GET_PICTURE_AM, AmProfile.ACTION_GET_PICTURE_AM);
        return constants;
    }
}
