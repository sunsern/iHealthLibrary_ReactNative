package com.ihealth.ihealthlibrary;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;


import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.ihealth.communication.manager.*;

/**
 * Created by jing on 16/10/20.
 */

public class iHealthDeviceManagerModel extends ReactContextBaseJavaModule implements LifecycleEventListener{

    private static final String modelName = "iHealthDeviceManagerModel";
    private static final String TAG = "iHealthModel";

    private final static String  AM3 = "AM3";
    private final static long   DISCOVERY_AM3  = 1 << 0;

    private final static String  AM3S = "AM3S";
    private final static long   DISCOVERY_AM3S  = 1 << 1;

    private final static String  AM4 = "AM4";
    private final static long   DISCOVERY_AM4  = 1 << 2;

    private final static String  BP5 = "BP5";
    private final static long   DISCOVERY_BP5  = 1 << 25;



    private final static String  MSG = "MSG";


    private int callbackId;
    private static ReactApplicationContext reactApplicationContext;

    public iHealthDeviceManagerModel(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addLifecycleEventListener(this);
        reactApplicationContext = reactContext;
        iHealthDevicesManager.getInstance().init(reactContext);
        callbackId = iHealthDevicesManager.getInstance().registerClientCallback(miHealthDevicesCallback);
    }

    private iHealthDevicesCallback miHealthDevicesCallback = new iHealthDevicesCallback() {

        @Override
        public void onScanDevice(String mac, String deviceType, int rssi, Map manufactorData) {
            WritableMap params = Arguments.createMap();
            params.putString("Mac", mac);
            params.putString("Type",deviceType);
            params.putInt("RSSI",rssi);
            sendEvent("onScanDevice", params);
        }

        @Override
        public void onDeviceConnectionStateChange(String mac, String deviceType, int status, int errorID, Map manufactorData) {
            WritableMap params = Arguments.createMap();
            params.putString("Mac", mac);
            params.putString("Type",deviceType);
            params.putInt("Status",status);
            params.putInt("ErrorID",errorID);
            sendEvent("ConnectionStateChange", params);
        }

        @Override
        public void onUserStatus(String username, int userStatus) {

        }

        @Override
        public void onDeviceNotify(String mac, String deviceType, String action, String message) {
            WritableMap params = Arguments.createMap();
            params.putString("Mac", mac);
            params.putString("Type",deviceType);
            params.putString("Action",action);
            params.putString("Message",message);
            sendEvent("onDeviceNotify",params);
        }

        @Override
        public void onScanFinish() {
            sendEvent("onScanFinish", null);
        }

    };

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(AM3, DISCOVERY_AM3);
        constants.put(AM3S,DISCOVERY_AM3S);
        constants.put(AM4, DISCOVERY_AM4);
        constants.put(BP5, DISCOVERY_BP5);
        constants.put(MSG, MSG);
        return constants;
    }

    @Override
    public String getName() {
        return modelName;
    }

    @Override
    public void onHostResume() {
        Log.i(TAG,"onHostResume");
    }

    @Override
    public void onHostPause() {
        Log.i(TAG,"onHostPause");
    }

    @Override
    public void onHostDestroy() {
        Log.e(TAG,"onHostDestroy");
    }





    public static void sendEvent(String eventName, WritableMap msg) {
        reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, msg);
    }

    @ReactMethod
    public void Logger(String tag, String msg) {
        Log.e(TAG, msg);
    }



    @ReactMethod
    public void startDiscovery(double type) {
        iHealthDevicesManager.getInstance().startDiscovery((long)type);
    }

    @ReactMethod
    public boolean connectDevice(String mac) {
        return iHealthDevicesManager.getInstance().connectDevice("",mac);
    }

}
