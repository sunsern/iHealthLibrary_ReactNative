package com.ihealth.ihealthlibrary;

import android.text.TextUtils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.ihealth.communication.control.Bp3lControl;
import com.ihealth.communication.control.BpProfile;
import com.ihealth.communication.manager.iHealthDevicesManager;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by zhangxu on 16/11/14.
 */

public class BP3LModule extends iHealthBaseModule {
    private String modelName = "BP3LModule";
    private static final String TAG = "BP3LModule";

    private static final String EVENT_NOTIFY = "event_notify_bp3l";

    public BP3LModule(ReactApplicationContext reactContext) {
        super(TAG, reactContext);
    }

    @Override
    public String getName() {
        return modelName;
    }

    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> map = new HashMap<>();
        map.put("Event_Notify", EVENT_NOTIFY);
        return map;
    }


    @ReactMethod
    public void startMeasure(String mac) {
        Bp3lControl bp3lControl = iHealthDevicesManager.getInstance().getBp3lControl(mac);
        if (bp3lControl != null) {
            bp3lControl.startMeasure();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid",400);
            sendEvent("Error", params);
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
            sendEvent("Error", params);
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
            sendEvent("Error",params);
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
            sendEvent("Error",params);
        }
    }

    @Override
    public void handleNotify(String mac, String deviceType, String action, String message) {
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
        WritableMap params = Arguments.createMap();
        params.putString("action", action);
        params.putString("mac", mac);
        params.putString("type", deviceType);
        if (!TextUtils.isEmpty(message)) {
            Utils.jsonToMap(message, params);
        }
        sendEvent(EVENT_NOTIFY, params);
    }
}
