package com.ihealth.ihealthlibrary;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.ihealth.communication.control.Bp3lControl;
import com.ihealth.communication.control.BpProfile;
import com.ihealth.communication.manager.iHealthDevicesManager;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by zhangxu on 16/11/14.
 */

public class BP3LModule extends ReactContextBaseJavaModule {


    private String modelName = "BP3LModule";

    private static final String TAG = "BP3LModule";


    public BP3LModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }


    @Override
    public String getName() {
        return modelName;
    }


    @ReactMethod
    public void startMeasure(String mac) {
        Bp3lControl bp3lControl = iHealthDevicesManager.getInstance().getBp3lControl(mac);
        if (bp3lControl != null) {
            bp3lControl.startMeasure();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid",400);
            iHealthDeviceManagerModule.sendEvent("Error", params);
        }
    }


    @ReactMethod
    public void stopMeasure(String mac) {
        Bp3lControl bp3lControl = iHealthDevicesManager.getInstance().getBp3lControl(mac);
        if (bp3lControl != null) {
            bp3lControl.interruptMeasure();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid",400);
            iHealthDeviceManagerModule.sendEvent("Error", params);
        }
    }

    @ReactMethod
    public void getBattery(String mac) {
        Bp3lControl bp3lControl = iHealthDevicesManager.getInstance().getBp3lControl(mac);
        if (bp3lControl != null) {
            bp3lControl.getBattery();
        }else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid",400);
            iHealthDeviceManagerModule.sendEvent("Error",params);
        }
    }

    @ReactMethod
    public void disconnect(String mac) {
        Bp3lControl bp3lControl = iHealthDevicesManager.getInstance().getBp3lControl(mac);
        if (bp3lControl != null) {
            bp3lControl.disconnect();
        }else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid",400);
            iHealthDeviceManagerModule.sendEvent("Error",params);
        }
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
