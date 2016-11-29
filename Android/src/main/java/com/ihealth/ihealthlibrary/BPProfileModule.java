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


    private static final String ACTION_ERROR_BP = "ACTION_ERROR_BP";
    private static final String ACTION_BATTERY_BP = "ACTION_BATTERY_BP";
    private static final String ACTION_ZOREING_BP = "ACTION_ZOREING_BP";
    private static final String ACTION_ZOREOVER_BP = "ACTION_ZOREOVER_BP";
    private static final String ACTION_ONLINE_PRESSURE_BP = "ACTION_ONLINE_PRESSURE_BP";
    private static final String ACTION_ONLINE_PULSEWAVE_BP = "ACTION_ONLINE_PULSEWAVE_BP";
    private static final String ACTION_ONLINE_RESULT_BP = "ACTION_ONLINE_RESULT_BP";

    private static final String ACTION_HISTORICAL_NUM_BP = "ACTION_HISTORICAL_NUM_BP";
    private static final String ACTION_HISTORICAL_DATA_BP = "ACTION_HISTORICAL_DATA_BP";
    private static final String ACTION_FUNCTION_INFORMATION_BP = "ACTION_FUNCTION_INFORMATION_BP";

    private static final String ACTION_ENABLE_OFFLINE_BP = "ACTION_ENABLE_OFFLINE_BP";
    private static final String ACTION_DISENABLE_OFFLINE_BP = "ACTION_DISENABLE_OFFLINE_BP";
    private static final String ACTION_IS_ENABLE_OFFLINE = "ACTION_IS_ENABLE_OFFLINE";

    private static final String ACTION_SET_UNIT_SUCCESS_BP = "ACTION_SET_UNIT_SUCCESS_BP";
    private static final String ACTION_SET_ANGLE_SUCCESS_BP = "ACTION_SET_ANGLE_SUCCESS_BP";

    private static final String ACTION_INTERRUPTED_BP = "ACTION_INTERRUPTED_BP";

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

        constants.put(ACTION_ERROR_BP, BpProfile.ACTION_ERROR_BP);
        constants.put(ACTION_BATTERY_BP, BpProfile.ACTION_BATTERY_BP);
        constants.put(ACTION_ZOREING_BP, BpProfile.ACTION_ZOREING_BP);
        constants.put(ACTION_ZOREOVER_BP, BpProfile.ACTION_ZOREOVER_BP);
        constants.put(ACTION_ONLINE_PRESSURE_BP, BpProfile.ACTION_ONLINE_PRESSURE_BP);
        constants.put(ACTION_ONLINE_PULSEWAVE_BP,BpProfile.ACTION_ONLINE_PULSEWAVE_BP);
        constants.put(ACTION_ONLINE_RESULT_BP, BpProfile.ACTION_ONLINE_RESULT_BP);

        constants.put(ACTION_HISTORICAL_NUM_BP, BpProfile.ACTION_HISTORICAL_NUM_BP);
        constants.put(ACTION_HISTORICAL_DATA_BP,BpProfile.ACTION_HISTORICAL_DATA_BP);
        constants.put(ACTION_FUNCTION_INFORMATION_BP,BpProfile.ACTION_FUNCTION_INFORMATION_BP);

        constants.put(ACTION_ENABLE_OFFLINE_BP, BpProfile.ACTION_ENABLE_OFFLINE_BP);
        constants.put(ACTION_DISENABLE_OFFLINE_BP, BpProfile.ACTION_DISENABLE_OFFLINE_BP);
        constants.put(ACTION_IS_ENABLE_OFFLINE, BpProfile.ACTION_IS_ENABLE_OFFLINE);

        constants.put(ACTION_SET_UNIT_SUCCESS_BP,BpProfile.ACTION_SET_UNIT_SUCCESS_BP);
        constants.put(ACTION_SET_ANGLE_SUCCESS_BP,BpProfile.ACTION_SET_ANGLE_SUCCESS_BP);

        constants.put(ACTION_INTERRUPTED_BP, BpProfile.ACTION_INTERRUPTED_BP);


        return constants;
    }
}
