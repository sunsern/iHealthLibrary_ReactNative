package com.ihealth.ihealthlibrary;

import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.ihealth.communication.control.Bg5Control;
import com.ihealth.communication.control.Bg5Profile;
import com.ihealth.communication.manager.iHealthDevicesManager;

import java.util.HashMap;
import java.util.Map;


/**
 * Created by gyl on 2016/11/15.
 */


public class BG5Module extends iHealthBaseModule {

    private static final String modelName = "BG5Module";
    private static final String TAG = modelName;

    private static final String EVENT_NOTIFY = "event_notify_bg5";

    public BG5Module(ReactApplicationContext reactContext) {
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
    public void holdLink(String mac) {
        Bg5Control bg5Control = iHealthDevicesManager.getInstance().getBg5Control(mac);
        if (bg5Control != null) {
            bg5Control.holdLink();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void setTime(String mac) {
        Bg5Control bg5Control = iHealthDevicesManager.getInstance().getBg5Control(mac);
        if (bg5Control != null) {
            bg5Control.setTime();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void setUnit(String mac, double type) {
        Bg5Control bg5Control = iHealthDevicesManager.getInstance().getBg5Control(mac);
        if (bg5Control != null) {
            bg5Control.setUnit((int) type);
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void getBattery(String mac) {
        Bg5Control bg5Control = iHealthDevicesManager.getInstance().getBg5Control(mac);
        if (bg5Control != null) {
            bg5Control.getBattery();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void startMeasure(String mac, double type) {
        Bg5Control bg5Control = iHealthDevicesManager.getInstance().getBg5Control(mac);
        if (bg5Control != null) {
            bg5Control.startMeasure((int) type);
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void getOfflineData(String mac) {
        Bg5Control bg5Control = iHealthDevicesManager.getInstance().getBg5Control(mac);
        if (bg5Control != null) {
            bg5Control.getOfflineData();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void deleteOfflineData(String mac) {
        Bg5Control bg5Control = iHealthDevicesManager.getInstance().getBg5Control(mac);
        if (bg5Control != null) {
            bg5Control.deleteOfflineData();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void setBottleMessage(String mac, String QRCode) {
        Bg5Control bg5Control = iHealthDevicesManager.getInstance().getBg5Control(mac);
        if (bg5Control != null) {
            bg5Control.setBottleMessage(QRCode);
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

//    @ReactMethod
//    public void setBottleMessage(String mac , String QRCode, final int stripNum, final String overDate) {
//        Bg5Control bg5Control = iHealthDevicesManager.getInstance().getBg5Control(mac);
//        if (bg5Control != null) {
//            bg5Control.setBottleMessage(QRCode, stripNum, overDate);
//        } else {
//            WritableMap params = Arguments.createMap();
//            params.putInt("errorid", 400);
//            iHealthDeviceManagerModule.sendEvent("Error", params);
//        }
//    }

    @ReactMethod
    public void getBottleMessage(String mac) {
        Bg5Control bg5Control = iHealthDevicesManager.getInstance().getBg5Control(mac);
        if (bg5Control != null) {
            bg5Control.getBottleMessage();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void setBottleId(String mac, double bottleID) {
        Bg5Control bg5Control = iHealthDevicesManager.getInstance().getBg5Control(mac);
        if (bg5Control != null) {
            bg5Control.setBottleId((long) bottleID);
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void getBottleId(String mac) {
        Bg5Control bg5Control = iHealthDevicesManager.getInstance().getBg5Control(mac);
        if (bg5Control != null) {
            bg5Control.getBottleId();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void disConnect(String mac) {
        Bg5Control bg5Control = iHealthDevicesManager.getInstance().getBg5Control(mac);
        if (bg5Control != null) {
            bg5Control.disconnect();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void Logger(String tag, String msg) {
        Log.e(TAG, msg);
    }


    @Override
    public void handleNotify(String mac, String deviceType, String action, String message) {
        switch (action) {

            case Bg5Profile.ACTION_KEEP_LINK:

                break;

            case Bg5Profile.ACTION_SET_TIME:

                break;

            case Bg5Profile.ACTION_SET_UNIT:

                break;

            case Bg5Profile.ACTION_BATTERY_BG:

                break;

            case Bg5Profile.ACTION_START_MEASURE:

                break;

            case Bg5Profile.ACTION_HISTORICAL_DATA_BG:

                break;

            case Bg5Profile.ACTION_DELETE_HISTORICAL_DATA:

                break;

            case Bg5Profile.ACTION_SET_BOTTLE_MESSAGE_SUCCESS:

                break;

            case Bg5Profile.ACTION_GET_CODEINFO:

                break;

            case Bg5Profile.ACTION_SET_BOTTLE_ID_SUCCESS:

                break;

            case Bg5Profile.ACTION_GET_BOTTLEID:

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
