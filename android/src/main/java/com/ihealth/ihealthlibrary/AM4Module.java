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
        Am4Control control = getControl(mac);
        if (control != null) {
            control.getUserId();
        } else {
            Log.e(TAG,"Can not find AM4 Control mac:" + mac);
        }
    }

    @ReactMethod
    public void disconnect(String mac) {
        Am4Control control = getControl(mac);
        if (control != null) {
            control.disconnect();
        } else {
            Log.e(TAG,"Can not find AM4 Control mac:" + mac);
        }
    }
    @ReactMethod
    public void getUserInfo(String mac) {
        Am4Control control = getControl(mac);
        if (control != null) {
            control.getUserInfo();
        } else {
            Log.e(TAG,"Can not find AM4 Control mac:" + mac);
        }
    }
    @ReactMethod
    public void setUserInfo(String mac, int age, int height, float weight, int gender, int unit, int target, int activityLevel, int min) {
        Am4Control control = getControl(mac);
        if (control != null) {
            control.setUserInfo(age, height, weight, gender, unit, target, activityLevel, min);
        } else {
            Log.e(TAG,"Can not find AM4 Control mac:" + mac);
        }
    }

    private static Am4Control getControl(String mac) {
        return iHealthDevicesManager.getInstance().getAm4Control(mac);
    }

    public static WritableMap handleNotify(String mac, String deviceType, String action, String message) {
        WritableMap params = Arguments.createMap();
        params.putString("mac", mac);
        params.putString("type", deviceType);
        Utils.jsonToMap(message, params);

        return params;
    }
}
