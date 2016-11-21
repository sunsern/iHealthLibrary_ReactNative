package com.ihealth.ihealthlibrary;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.ihealth.communication.control.Bp550BTControl;
import com.ihealth.communication.control.BpProfile;
import com.ihealth.communication.manager.iHealthDevicesManager;

/**
 * Created by zhangxu on 16/11/20.
 */

public class BP550BTModule extends ReactContextBaseJavaModule {
    private String modelName = "BP550BTModule";
    public BP550BTModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return modelName;
    }

    @ReactMethod
    public void getBattery(String mac) {
        Bp550BTControl bp550BTControl = iHealthDevicesManager.getInstance().getBp550BTControl(mac);

        if (bp550BTControl != null) {
            bp550BTControl.getBattery();
        }else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid",400);
            iHealthDeviceManagerModule.sendEvent("Error", params);
        }
    }

    @ReactMethod
    public void getOffLineNum(String mac) {
        Bp550BTControl bp550BTControl = iHealthDevicesManager.getInstance().getBp550BTControl(mac);
        if (bp550BTControl != null) {
            bp550BTControl.getOfflineNum();
        }else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid",400);
            iHealthDeviceManagerModule.sendEvent("Error", params);
        }
    }
    @ReactMethod
    public void getOffLineData(String mac) {
        Bp550BTControl bp550BTControl = iHealthDevicesManager.getInstance().getBp550BTControl(mac);;
        if (bp550BTControl != null) {
            bp550BTControl.getOfflineData();
        }else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid",400);
            iHealthDeviceManagerModule.sendEvent("Error", params);
        }
    }
    @ReactMethod
    public void getFunctionInfo(String mac) {
        Bp550BTControl bp550BTControl = iHealthDevicesManager.getInstance().getBp550BTControl(mac);
        if (bp550BTControl != null) {
            bp550BTControl.getFunctionInfo();
        }else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid",400);
            iHealthDeviceManagerModule.sendEvent("Error", params);
        }
    }

    @ReactMethod
    public void disconnect(String mac) {
        Bp550BTControl bp550BTControl = iHealthDevicesManager.getInstance().getBp550BTControl(mac);
        if (bp550BTControl != null) {
            bp550BTControl.disconnect();
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
