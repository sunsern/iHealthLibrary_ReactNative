package com.ihealth.ihealthlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.ihealth.communication.control.BpProfile;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by zhangxu on 16/11/16.
 */

public class BPProfileModule extends ReactContextBaseJavaModule {


    private static final String modelName = "BPProfileModule";
    private static final String TAG = "BPProfileModule";


    private static final String Action_Error = "Action_Error";
    private static final String Action_Battery = "Action_Battery";
    private static final String Action_Zeroing = "Action_Zeroing";
    private static final String Action_ZeroOver = "Action_ZeroOver";
    private static final String Action_Pressure = "Action_Pressure";
    private static final String Action_PulseWave = "Action_PulseWave";
    private static final String Action_Result = "Action_Result";

    private static final String Action_getOffLineDataNum = "Action_getOffLineDataNum";
    private static final String Action_getOffLineData = "Action_getOffLineData";
    private static final String Action_getFunctionInfo = "Action_getFunctionInfo";

    private static final String Action_enableOffline = "Action_enableOffline";
    private static final String Action_disEnableOffline = "Action_disEnableOffline";
    private static final String Action_is_enable_offline = "Action_is_enable_offline";

    private static final String Action_setUnitSuccess = "Action_setUnitSuccess";
    private static final String Action_setAngleSuccess = "Action_setAngleSuccess";

    public BPProfileModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return modelName;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {

        final Map<String, Object> constants = new HashMap<>();

        constants.put(Action_Error, BpProfile.ACTION_ERROR_BP);
        constants.put(Action_Battery, BpProfile.ACTION_BATTERY_BP);
        constants.put(Action_Zeroing, BpProfile.ACTION_ZOREING_BP);
        constants.put(Action_ZeroOver, BpProfile.ACTION_ZOREOVER_BP);
        constants.put(Action_Pressure, BpProfile.ACTION_ONLINE_PRESSURE_BP);
        constants.put(Action_PulseWave,BpProfile.ACTION_ONLINE_PULSEWAVE_BP);
        constants.put(Action_Result, BpProfile.ACTION_ONLINE_RESULT_BP);

        constants.put(Action_getOffLineDataNum, BpProfile.ACTION_HISTORICAL_NUM_BP);
        constants.put(Action_getOffLineData,BpProfile.ACTION_HISTORICAL_DATA_BP);
        constants.put(Action_getFunctionInfo,BpProfile.ACTION_FUNCTION_INFORMATION_BP);

        constants.put(Action_enableOffline, BpProfile.ACTION_ENABLE_OFFLINE_BP);
        constants.put(Action_disEnableOffline, BpProfile.ACTION_DISENABLE_OFFLINE_BP);
        constants.put(Action_is_enable_offline, BpProfile.ACTION_IS_ENABLE_OFFLINE);

        constants.put(Action_setUnitSuccess,BpProfile.ACTION_SET_UNIT_SUCCESS_BP);
        constants.put(Action_setAngleSuccess,BpProfile.ACTION_SET_ANGLE_SUCCESS_BP);


        return constants;
    }
}
