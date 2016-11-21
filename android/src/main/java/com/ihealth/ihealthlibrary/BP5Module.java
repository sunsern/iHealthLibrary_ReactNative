package com.ihealth.ihealthlibrary;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.ihealth.communication.control.Bp5Control;

import com.ihealth.communication.control.BpProfile;
import com.ihealth.communication.manager.*;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by jing on 16/10/24.
 */

public class BP5Module extends ReactContextBaseJavaModule {

    private static final String modelName = "BP5Module";
    private static final String TAG = "BP5Module";



    public BP5Module(ReactApplicationContext reactContext) {
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
            params.putInt("errorid",400);
            iHealthDeviceManagerModule.sendEvent("Error", params);
        }
    }

    @ReactMethod
    public void stopMeasure(String mac) {
        Bp5Control bp5Control = iHealthDevicesManager.getInstance().getBp5Control(mac);
        if (bp5Control != null) {
            bp5Control.interruptMeasure();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid",400);
            iHealthDeviceManagerModule.sendEvent("Error", params);
        }
    }
    @ReactMethod
    public void getBattery(String mac) {
        Bp5Control bp5Control = iHealthDevicesManager.getInstance().getBp5Control(mac);
        if (bp5Control != null) {
            bp5Control.getBattery();
        }else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid",400);
            iHealthDeviceManagerModule.sendEvent("Error", params);
        }
    }
    @ReactMethod
    public void enbleOffline(String mac) {
        Bp5Control bp5Control = iHealthDevicesManager.getInstance().getBp5Control(mac);
        if (bp5Control != null) {
            bp5Control.enbleOffline();
        }else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid",400);
            iHealthDeviceManagerModule.sendEvent("Error", params);
        }
    }
    @ReactMethod
    public void disableOffline(String mac) {
        Bp5Control bp5Control = iHealthDevicesManager.getInstance().getBp5Control(mac);
        if (bp5Control != null) {
            bp5Control.disableOffline();
        }else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid",400);
            iHealthDeviceManagerModule.sendEvent("Error", params);
        }
    }
    @ReactMethod
    public void isEnableOffline(String mac) {
        Bp5Control bp5Control = iHealthDevicesManager.getInstance().getBp5Control(mac);
        if (bp5Control != null) {
            bp5Control.isEnableOffline();
        }else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid",400);
            iHealthDeviceManagerModule.sendEvent("Error", params);
        }
    }
    @ReactMethod
    public void getOfflineNum(String mac) {
        Bp5Control bp5Control = iHealthDevicesManager.getInstance().getBp5Control(mac);
        if (bp5Control != null) {
            bp5Control.getOfflineNum();
        }else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid",400);
            iHealthDeviceManagerModule.sendEvent("Error", params);
        }
    }
    @ReactMethod
    public void getOfflineData(String mac) {
        Bp5Control bp5Control = iHealthDevicesManager.getInstance().getBp5Control(mac);
        if (bp5Control != null) {
            bp5Control.getOfflineData();
        }else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid",400);
            iHealthDeviceManagerModule.sendEvent("Error", params);
        }
    }
    @ReactMethod
    public void disconnect(String mac) {
        Bp5Control bp5Control = iHealthDevicesManager.getInstance().getBp5Control(mac);
        if (bp5Control != null) {
            bp5Control.disconnect();
        }else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid",400);
            iHealthDeviceManagerModule.sendEvent("Error",params);
        }
    }


    @ReactMethod
    public void Logger(String tag, String msg) {
        Log.e(TAG, msg);
    }


    public static WritableMap handleNotify(String mac, String deviceType, String action, String message) {
        switch (action) {
            case BpProfile.ACTION_BATTERY_BP:

                break;
            case BpProfile.ACTION_ZOREING_BP:

                break;
            case BpProfile.ACTION_ZOREOVER_BP:

                break;
            case BpProfile.ACTION_ONLINE_PRESSURE_BP:

                break;
            case BpProfile.ACTION_ONLINE_PULSEWAVE_BP:

                break;
            case BpProfile.ACTION_ONLINE_RESULT_BP:

                break;
            default:
                break;
        }
        if (message == "") {
            WritableMap params = Arguments.createMap();
            params.putString("mac", mac);
            params.putString("type", deviceType);
            return params;
        }else {
            WritableMap params = Arguments.createMap();
            params.putString("mac", mac);
            params.putString("type", deviceType);
            Utils.jsonToMap(message, params);

            return params;
        }
    }
}
