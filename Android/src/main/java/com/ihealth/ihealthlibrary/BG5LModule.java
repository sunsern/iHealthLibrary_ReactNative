package com.ihealth.ihealthlibrary;

import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.ihealth.communication.control.Bg5Profile;
import com.ihealth.communication.control.Bg5lControl;
import com.ihealth.communication.manager.iHealthDevicesManager;

import java.util.HashMap;
import java.util.Map;


/**
 * Created by gyl on 2016/11/15.
 */


public class BG5LModule extends iHealthBaseModule {

    private static final String modelName = "BG5LModule";
    private static final String TAG = modelName;

    private static final String EVENT_NOTIFY = "event_notify_bg5l";

    public BG5LModule(ReactApplicationContext reactContext) {
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
        Bg5lControl bg5lControl = iHealthDevicesManager.getInstance().getBG5lControl(mac);
        if (bg5lControl != null) {
            bg5lControl.holdLink();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void setTime(String mac) {
        Bg5lControl bg5lControl = iHealthDevicesManager.getInstance().getBG5lControl(mac);
        if (bg5lControl != null) {
            bg5lControl.setTime();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void setUnit(String mac, double type) {
        Bg5lControl bg5lControl = iHealthDevicesManager.getInstance().getBG5lControl(mac);
        if (bg5lControl != null) {
            bg5lControl.setUnit((int) type);
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void getBattery(String mac) {
        Bg5lControl bg5lControl = iHealthDevicesManager.getInstance().getBG5lControl(mac);
        if (bg5lControl != null) {
            bg5lControl.getBattery();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void startMeasure(String mac, double type) {
        Bg5lControl bg5lControl = iHealthDevicesManager.getInstance().getBG5lControl(mac);
        if (bg5lControl != null) {
            bg5lControl.startMeasure((int) type);
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void getOfflineData(String mac) {
        Bg5lControl bg5lControl = iHealthDevicesManager.getInstance().getBG5lControl(mac);
        if (bg5lControl != null) {
            bg5lControl.getOfflineData();
            Log.v(TAG, "bg5lControl.deleteOfflineData();");
        } else {
            Log.v(TAG, "bg5lControl.deleteOfflineData()    ERROR;");
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void deleteOfflineData(String mac) {
        Bg5lControl bg5lControl = iHealthDevicesManager.getInstance().getBG5lControl(mac);
        if (bg5lControl != null) {
            bg5lControl.deleteOfflineData();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

//    @ReactMethod
//    public void setBottleMessage(String mac, String QRCode) {
//        Bg5lControl bg5lControl = iHealthDevicesManager.getInstance().getBG5lControl(mac);
//        if (bg5lControl != null) {
//            bg5lControl.setBottleMessage(QRCode);
//        } else {
//            WritableMap params = Arguments.createMap();
//            params.putInt("errorid", 400);
//            sendEvent(EVENT_NOTIFY, params);
//        }
//    }

//    @ReactMethod
//    public void setBottleMessage(String mac , String QRCode, final int stripNum, final String overDate) {
//        Bg5lControl bg5lControl = iHealthDevicesManager.getInstance().getBG5lControl(mac);
//        if (bg5lControl != null) {
//            bg5lControl.setBottleMessage(QRCode, stripNum, overDate);
//        } else {
//            WritableMap params = Arguments.createMap();
//            params.putInt("errorid", 400);
//            iHealthDeviceManagerModule.sendEvent("Error", params);
//        }
//    }

    @ReactMethod
    public void setBottleMessageWithInfo(String mac, double stripType, double measureType, String QRCode, double stripNum, String overDate){
        Bg5lControl bg5lControl = iHealthDevicesManager.getInstance().getBG5lControl(mac);
        if(bg5lControl != null){
            bg5lControl.setBottleMessageWithInfo((int)stripType, (int)measureType, QRCode, (int)stripNum, overDate);
        }else{
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void getBottleMessage(String mac) {
        Bg5lControl bg5lControl = iHealthDevicesManager.getInstance().getBG5lControl(mac);
        if (bg5lControl != null) {
            bg5lControl.getBottleMessage();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void setBottleId(String mac, double bottleID) {
        Bg5lControl bg5lControl = iHealthDevicesManager.getInstance().getBG5lControl(mac);
        if (bg5lControl != null) {
            bg5lControl.setBottleId((long) bottleID);
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void getBottleId(String mac) {
        Bg5lControl bg5lControl = iHealthDevicesManager.getInstance().getBG5lControl(mac);
        if (bg5lControl != null) {
            bg5lControl.getBottleId();
        } else {
            WritableMap params = Arguments.createMap();
            params.putInt("errorid", 400);
            sendEvent(EVENT_NOTIFY, params);
        }
    }

    @ReactMethod
    public void disConnect(String mac) {
        Bg5lControl bg5lControl = iHealthDevicesManager.getInstance().getBG5lControl(mac);
        if (bg5lControl != null) {
            bg5lControl.disconnect();
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

        Log.v(TAG, "mac：" + mac + "   deviceType:" + deviceType + "    message" + message);
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
