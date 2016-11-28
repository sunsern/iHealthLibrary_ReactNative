package com.ihealth.ihealthlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.ihealth.communication.control.PoProfile;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by lixuesong on 15/11/2016.
 */

public class POProfileModule extends ReactContextBaseJavaModule {
    private static final String modelName = "POProfileModule";
    private static final String TAG = "POProfileModule";

    private static final String ACTION_BATTERY_PO = "ACTION_BATTERY_PO";
    private static final String ACTION_LIVEDA_PO = "ACTION_LIVEDA_PO";
    private static final String ACTION_RESULTDATA_PO = "ACTION_RESULTDATA_PO";
    private static final String ACTION_OFFLINEDATA_PO = "ACTION_OFFLINEDATA_PO";
    private static final String ACTION_NO_OFFLINEDATA_PO = "ACTION_NO_OFFLINEDATA_PO";
    private static final String ACTION_ERROR_PO = "ACTION_ERROR_PO";

    public POProfileModule(ReactApplicationContext reactContext) {
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
        constants.put(ACTION_BATTERY_PO, PoProfile.ACTION_BATTERY_PO);
        constants.put(ACTION_LIVEDA_PO, PoProfile.ACTION_LIVEDA_PO);
        constants.put(ACTION_RESULTDATA_PO, PoProfile.ACTION_RESULTDATA_PO);
        constants.put(ACTION_OFFLINEDATA_PO, PoProfile.ACTION_OFFLINEDATA_PO);
        constants.put(ACTION_NO_OFFLINEDATA_PO, PoProfile.ACTION_NO_OFFLINEDATA_PO);
        constants.put(ACTION_ERROR_PO, PoProfile.ACTION_ERROR_PO);

        return constants;
    }
}
