package com.ihealth.ihealthlibrary;

import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.ihealth.communication.control.Am4Control;
import com.ihealth.communication.manager.iHealthDevicesManager;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by jing on 16/10/20.
 */

public class AM4Module extends iHealthBaseModule {
    private static final String modelName = "AM4Module";
    private static final String TAG = "AM4Module";

    private static final String NOTIFY_EVENT = "notify_event_am4";

    public AM4Module(ReactApplicationContext reactContext) {
        super(TAG, reactContext);
    }

    @Override
    public String getName() {
        return modelName;
    }

    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> map = new HashMap<>();
        map.put("NOTIFY_EVENT_AM4", NOTIFY_EVENT);
        return map;
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

    @Override
    public void handleNotify(String mac, String deviceType, String action, String message) {
        WritableMap params = Arguments.createMap();
        params.putString("action", action);
        params.putString("mac", mac);
        params.putString("type", deviceType);
        if (!TextUtils.isEmpty(message)) {
            Utils.jsonToMap(message, params);
        }
        sendEvent(NOTIFY_EVENT, params);
    }
}
