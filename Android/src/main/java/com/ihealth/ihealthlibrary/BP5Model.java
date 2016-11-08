package com.ihealth.ihealthlibrary;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.ihealth.communication.control.Bp5Control;

import com.ihealth.communication.manager.*;

/**
 * Created by jing on 16/10/24.
 */

public class BP5Model extends ReactContextBaseJavaModule {

    private static final String modelName = "BP5Model";
    private static final String TAG = "BP5Model";


    public BP5Model(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return modelName;
    }

    @ReactMethod
    public void startMeasure(String mac) {
        Bp5Control bp5Control = iHealthDevicesManager.getInstance().getBp5Control(mac);
        if (bp5Control != null) {
            bp5Control.startMeasure();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("ErrorID",400);
            iHealthDeviceManagerModel.sendEvent("Error", params);
        }
    }

    @ReactMethod
    public void stopMeasure(String mac) {
        Bp5Control bp5Control = iHealthDevicesManager.getInstance().getBp5Control(mac);
        if (bp5Control != null) {
            bp5Control.interruptMeasure();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("ErrorID",400);
            iHealthDeviceManagerModel.sendEvent("Error", params);
        }
    }

    @ReactMethod
    public void Logger(String tag, String msg) {
        Log.e(TAG, msg);
    }
}
