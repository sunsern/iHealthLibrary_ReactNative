package com.ihealth.ihealthlibrary;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.WritableMap;
import com.ihealth.communication.manager.*;
import com.ihealth.communication.control.*;

/**
 * Created by jing on 16/10/20.
 */

public class AM4Module extends ReactContextBaseJavaModule {
    private static final String modelName = "AM4Module";
    private static final String TAG = "AM4Module";

    public AM4Module(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return modelName;
    }

    @ReactMethod
    public void getBattery(String mac) {
        Am4Control am4Control = iHealthDevicesManager.getInstance().getAm4Control(mac);
        if (am4Control != null) {
            am4Control.getUserId();
        } else {
            Log.e(TAG,"mac:" + mac);
        }
    }


    public static WritableMap handleNotify(String mac, String deviceType, String action, String message) {
        WritableMap params = Arguments.createMap();
        params.putString("mac", mac);
        params.putString("type", deviceType);
        Utils.jsonToMap(message, params);

        return params;
    }
}
