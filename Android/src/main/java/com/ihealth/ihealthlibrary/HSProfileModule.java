package com.ihealth.ihealthlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.ihealth.communication.control.HsProfile;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by lixuesong on 15/11/2016.
 */

public class HSProfileModule extends ReactContextBaseJavaModule {
    private static final String modelName = "HSProfileModule";
    private static final String TAG = "HSProfileModule";

    private static final String ACTION_ERROR_HS = "ACTION_ERROR_HS";
    private static final String ACTION_ONLINE_RESULT_HS = "ACTION_ONLINE_RESULT_HS";
    private static final String ACTION_HISTORICAL_DATA_HS = "ACTION_HISTORICAL_DATA_HS";
    private static final String ACTION_HISTORICAL_NUM_HS = "ACTION_HISTORICAL_NUM_HS";
    private static final String ACTION_NO_HISTORICALDATA = "ACTION_NO_HISTORICALDATA";
    private static final String ACTION_BATTERY_HS = "ACTION_BATTERY_HS";
    private static final String ACTION_LIVEDATA_HS = "ACTION_LIVEDATA_HS";
    private static final String ACTION_STABLEDATA_HS = "ACTION_STABLEDATA_HS";
    private static final String ACTION_IMPEDANCEDATA_HS = "ACTION_IMPEDANCEDATA_HS";
    private static final String ACTION_MANAGEMENT_HS = "ACTION_MANAGEMENT_HS";
    private static final String ACTION_ADDUSER_HS = "ACTION_ADDUSER_HS";
    private static final String ACTION_DELETEUSER_HS = "ACTION_DELETEUSER_HS";
    private static final String ACTION_UPDATEUSER_HS = "ACTION_UPDATEUSER_HS";
    private static final String ACTION_SETTINGWIFI = "ACTION_SETTINGWIFI";
    private static final String ACTION_SETWIFI_SUCCESS = "ACTION_SETWIFI_SUCCESS";
    private static final String ACTION_SETWIFI_FAIL = "ACTION_SETWIFI_FAIL";
    private static final String ACTION_SETWIFI_UNKNOW = "ACTION_SETWIFI_UNKNOW";

    public HSProfileModule(ReactApplicationContext reactContext) {
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
        constants.put(ACTION_ERROR_HS, HsProfile.ACTION_ERROR_HS);
        constants.put(ACTION_ONLINE_RESULT_HS, HsProfile.ACTION_ONLINE_RESULT_HS);
        constants.put(ACTION_HISTORICAL_DATA_HS, HsProfile.ACTION_HISTORICAL_DATA_HS);
        constants.put(ACTION_HISTORICAL_NUM_HS, HsProfile.ACTION_HISTORICAL_NUM_HS);
        constants.put(ACTION_NO_HISTORICALDATA, HsProfile.ACTION_NO_HISTORICALDATA);
        constants.put(ACTION_BATTERY_HS, HsProfile.ACTION_BATTERY_HS);
        constants.put(ACTION_LIVEDATA_HS, HsProfile.ACTION_LIVEDATA_HS);
        constants.put(ACTION_STABLEDATA_HS, HsProfile.ACTION_STABLEDATA_HS);
        constants.put(ACTION_IMPEDANCEDATA_HS, HsProfile.ACTION_IMPEDANCEDATA_HS);
        constants.put(ACTION_MANAGEMENT_HS, HsProfile.ACTION_MANAGEMENT_HS);
        constants.put(ACTION_ADDUSER_HS, HsProfile.ACTION_ADDUSER_HS);
        constants.put(ACTION_DELETEUSER_HS, HsProfile.ACTION_DELETEUSER_HS);
        constants.put(ACTION_UPDATEUSER_HS, HsProfile.ACTION_UPDATEUSER_HS);
        constants.put(ACTION_SETTINGWIFI, HsProfile.ACTION_SETTINGWIFI);
        constants.put(ACTION_SETWIFI_SUCCESS, HsProfile.ACTION_SETWIFI_SUCCESS);
        constants.put(ACTION_SETWIFI_FAIL, HsProfile.ACTION_SETWIFI_FAIL);
        constants.put(ACTION_SETWIFI_UNKNOW, HsProfile.ACTION_SETWIFI_UNKNOW);

        return constants;
    }
}
