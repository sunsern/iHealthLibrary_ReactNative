package com.ihealth.ihealthlibrary;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.ihealth.communication.control.Bg1Control;
import com.ihealth.communication.control.Bg1Profile;
import com.ihealth.communication.manager.iHealthDevicesCallback;
import com.ihealth.communication.manager.iHealthDevicesManager;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by jing on 16/10/20.
 */

public class iHealthDeviceManagerModule extends iHealthBaseModule implements LifecycleEventListener {

    private static final String modelName = "iHealthDeviceManagerModule";
    private static final String TAG = "iHealthModel";


    private final static String AM3S = "AM3S";
    private final static String AM4 = "AM4";
    private final static String PO3 = "PO3";
    private final static String BP5 = "BP5";
    private final static String BP3L = "BP3L";
    private final static String BP7S = "BP7S";
    private final static String KN550 = "KN550";
    private final static String HS4S = "HS4S";
    private final static String HS6 = "HS6";
    private final static String BG1 = "BG1";
    private final static String BG5 = "BG5";
    private final static String BG5L = "BG5L";


    private final static String Event_Scan_Device = "event_scan_device";
    private final static String Event_Scan_Finish = "event_scan_finish";
    private final static String Event_Device_Connected = "event_device_connected";
    private final static String Event_Device_Connect_Failed = "event_device_connect_failed";
    private final static String Event_Device_Disconnect = "event_device_disconnect";
    private final static String Event_Authenticate_Result = "event_authenticate_result";


    private int callbackId;
    private ReactApplicationContext mContext;

    public iHealthDeviceManagerModule(ReactApplicationContext reactContext) {
        super(TAG, reactContext);
        mContext = reactContext;
        reactContext.addLifecycleEventListener(this);
        iHealthDevicesManager.getInstance().init(reactContext);
        callbackId = iHealthDevicesManager.getInstance().registerClientCallback(miHealthDevicesCallback);
        Bg1Control.getInstance().init(reactContext, "", 0, true);
    }

    private iHealthDevicesCallback miHealthDevicesCallback = new iHealthDevicesCallback() {

        @Override
        public void onScanDevice(String mac, String deviceType, int rssi, Map manufactorData) {
            WritableMap params = Arguments.createMap();
            params.putString("mac", mac);
            params.putString("type", deviceType);
            params.putInt("rssi", rssi);
            sendEvent(Event_Scan_Device, params);
        }

        @Override
        public void onDeviceConnectionStateChange(String mac, String deviceType, int status, int errorID, Map manufactorData) {
            String eventName = null;
            if (status == iHealthDevicesManager.DEVICE_STATE_CONNECTED) {
                eventName = Event_Device_Connected;
            } else if (status == iHealthDevicesManager.DEVICE_STATE_CONNECTIONFAIL) {
                eventName = Event_Device_Connect_Failed;
            } else if (status == iHealthDevicesManager.DEVICE_STATE_DISCONNECTED) {
                eventName = Event_Device_Disconnect;
            }
            if (eventName != null) {
                WritableMap params = Arguments.createMap();
                params.putString("mac", mac);
                params.putString("type", deviceType);
                params.putInt("errorid", errorID);
                sendEvent(eventName, params);
            }
        }

        @Override
        public void onUserStatus(String username, int userStatus) {
            WritableMap params = Arguments.createMap();
            params.putInt("authen", userStatus);
            sendEvent(Event_Authenticate_Result, params);
        }

        @Override
        public void onDeviceNotify(String mac, String deviceType, String action, String message) {
            commandHandleDeviceNotify(mac, deviceType, action, message);
        }

        @Override
        public void onScanFinish() {
            sendEvent(Event_Scan_Finish, null);
        }

    };

    private void commandHandleDeviceNotify(String mac, String deviceType, String action, String message) {
        //为了与iOS返回值保持一致，需要进行二次加工
        iHealthBaseModule module = null;
        switch (deviceType) {
            case iHealthDevicesManager.TYPE_BP5:
                module = getReactApplicationContext().getNativeModule(BP5Module.class);
                break;
            case iHealthDevicesManager.TYPE_BP3L:
                module = getReactApplicationContext().getNativeModule(BP3LModule.class);
                break;
            case iHealthDevicesManager.TYPE_550BT:
                module = getReactApplicationContext().getNativeModule(BP550BTModule.class);
                break;
            case iHealthDevicesManager.TYPE_BP7S:
                module = getReactApplicationContext().getNativeModule(BP7SModule.class);
                break;
            case iHealthDevicesManager.TYPE_AM3S:
                module = getReactApplicationContext().getNativeModule(AM3SModule.class);
                break;
            case iHealthDevicesManager.TYPE_AM4:
                module = getReactApplicationContext().getNativeModule(AM4Module.class);
                break;
            case iHealthDevicesManager.TYPE_PO3:
                module = getReactApplicationContext().getNativeModule(PO3Module.class);
                break;
            case iHealthDevicesManager.TYPE_HS4S:
                module = getReactApplicationContext().getNativeModule(HS4SModule.class);
                break;
            case iHealthDevicesManager.TYPE_HS6:
                break;
            case iHealthDevicesManager.TYPE_BG1:
                break;
            case iHealthDevicesManager.TYPE_BG5:
            module = getReactApplicationContext().getNativeModule(BG5Module.class);
                break;
            case iHealthDevicesManager.TYPE_BG5l:
            module = getReactApplicationContext().getNativeModule(BG5LModule.class);
                break;
            default:
                module = null;
                break;
        }
        if (module != null) {
            module.handleNotify(mac, deviceType, action, message);
        } else {
            Log.e(TAG, "We do not support this type: " + deviceType);
        }
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(AM3S, iHealthDevicesManager.DISCOVERY_AM3S);
        constants.put(AM4, iHealthDevicesManager.DISCOVERY_AM4);
        constants.put(PO3, iHealthDevicesManager.DISCOVERY_PO3);
        constants.put(BP5, iHealthDevicesManager.DISCOVERY_BP5);
        constants.put(BP3L, iHealthDevicesManager.DISCOVERY_BP3L);
        constants.put(BP7S, iHealthDevicesManager.DISCOVERY_BP7S);
        constants.put(KN550, iHealthDevicesManager.DISCOVERY_BP550BT);
        constants.put(HS4S, iHealthDevicesManager.DISCOVERY_HS4S);
//        constants.put(HS6,);
        constants.put(BG1, (double) 110);
        constants.put(BG5, iHealthDevicesManager.DISCOVERY_BG5);
        constants.put(BG5L, iHealthDevicesManager.DISCOVERY_BG5l);


        constants.put("Event_Scan_Device", Event_Scan_Device);
        constants.put("Event_Scan_Finish", Event_Scan_Finish);
        constants.put("Event_Device_Connected", Event_Device_Connected);
        constants.put("Event_Device_Connect_Failed", Event_Device_Connect_Failed);
        constants.put("Event_Device_Disconnect", Event_Device_Disconnect);
        constants.put("Event_Authenticate_Result", Event_Authenticate_Result);


        return constants;
    }

    @Override
    public String getName() {
        return modelName;
    }

    @Override
    public void onHostResume() {
        Log.i(TAG, "onHostResume");
    }

    @Override
    public void onHostPause() {
        Log.i(TAG, "onHostPause");
    }

    @Override
    public void onHostDestroy() {
        iHealthDevicesManager.getInstance().destroy();
        Log.e(TAG, "onHostDestroy");
        if (mBroadcastReceiverRegistered) {
            unRegisterReceiver();
        }
    }

    @ReactMethod
    public void startDiscovery(double type) {
        if (type == 110) {
            registerReceiver();//scan BG1
        } else {
            iHealthDevicesManager.getInstance().startDiscovery((long) type);
        }
    }

    @ReactMethod
    public void stopDiscovery() {
        iHealthDevicesManager.getInstance().stopDiscovery();
    }

    @ReactMethod
    public void connectDevice(String mac, String type) {
        if (type.equals("BG1")) {
            Bg1Control.getInstance().connect();
        } else {
            iHealthDevicesManager.getInstance().connectDevice("", mac, type);
        }
    }

    @ReactMethod
    public void authenConfigureInfo(String userName, String clientID, String clientSecret) {
        iHealthDevicesManager.getInstance().sdkUserInAuthor(mContext, userName, clientID, clientSecret, callbackId);
    }

    @ReactMethod
    public void getDevicesIDPS(String mac, Callback callback) {
        String idpsInfo = iHealthDevicesManager.getInstance().getDevicesIDPS(mac);
        WritableMap writableMap = Arguments.createMap();
        Utils.jsonToMap(idpsInfo, writableMap);
        callback.invoke(writableMap);
    }

    @Override
    public void handleNotify(String mac, String deviceType, String action, String message) {
        //Do nothing
    }


    private void registerReceiver() {
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(Intent.ACTION_HEADSET_PLUG);
        intentFilter.addAction(Bg1Profile.ACTION_BG1_CONNECT_RESULT);
        intentFilter.addAction(Bg1Profile.ACTION_BG1_SENDCODE_RESULT);
        intentFilter.addAction(Bg1Profile.ACTION_BG1_MEASURE_ERROR);
        intentFilter.addAction(Bg1Profile.ACTION_BG1_MEASURE_STANDBY);
        intentFilter.addAction(Bg1Profile.ACTION_BG1_MEASURE_RESULT);
        intentFilter.addAction(Bg1Profile.ACTION_BG1_MEASURE_STRIP_IN);
        intentFilter.addAction(Bg1Profile.ACTION_BG1_MEASURE_GET_BLOOD);
        intentFilter.addAction(Bg1Profile.ACTION_BG1_MEASURE_STRIP_OUT);
        mContext.registerReceiver(broadcastReceiver, intentFilter);
        mBroadcastReceiverRegistered = true;
    }

    private void unRegisterReceiver() {
        mContext.unregisterReceiver(broadcastReceiver);
        mBroadcastReceiverRegistered = false;
    }

    private boolean mBroadcastReceiverRegistered = false;
    private BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (!TextUtils.isEmpty(intent.getAction())) {
                iHealthBaseModule module = getReactApplicationContext().getNativeModule(BG1Module.class);
                WritableMap params = Arguments.createMap();
                params.putString("action", intent.getAction());
                params.putString("mac", "");
                params.putString("type", "BG1");
                try {
                    JSONObject jsonObject = new JSONObject();
                    switch (intent.getAction()) {
                        case Intent.ACTION_HEADSET_PLUG:
                            Log.e(TAG, "headset state -----> " + intent.getExtras().getInt("state"));
                            Log.e(TAG, "has microphone ----> " + intent.getExtras().getInt("microphone"));
                            Log.e(TAG, "headset name ------> " + intent.getExtras().getString("name"));

                            jsonObject.put("state", intent.getExtras().getInt("state"));
                            Utils.jsonToMap(jsonObject.toString(), params);

                            if (intent.getExtras().getInt("state") == 1) {
                                sendEvent(Event_Scan_Device, params);
                            } else {
                                sendEvent(Event_Device_Disconnect, params);
                                Bg1Control.getInstance().disconnect();
                                module.handleNotify("", "BG1", Event_Device_Disconnect, jsonObject.toString());

                            }
                            sendEvent(Event_Scan_Finish, null);

                            break;
                        case Bg1Profile.ACTION_BG1_CONNECT_RESULT:
                            int connectFlag = intent.getIntExtra(Bg1Profile.BG1_CONNECT_RESULT, -1);
                            jsonObject.put(Bg1Profile.BG1_CONNECT_RESULT, connectFlag);
                            Utils.jsonToMap(jsonObject.toString(), params);
                            if (connectFlag == 0) {
                                sendEvent(Event_Device_Connected, params);
                            } else {
                                sendEvent(Event_Device_Connect_Failed, params);
                            }
                            break;
                        case Bg1Profile.ACTION_BG1_SENDCODE_RESULT:
                            int sendCodeFlag = intent.getIntExtra(Bg1Profile.BG1_SENDCODE_RESULT, -1);
                            jsonObject.put(Bg1Profile.BG1_SENDCODE_RESULT, sendCodeFlag);
                            //Utils.jsonToMap(jsonObject.toString(), params);

                            module.handleNotify("", "BG1", Bg1Profile.ACTION_BG1_SENDCODE_RESULT, jsonObject.toString());
                            break;
                        case Bg1Profile.ACTION_BG1_MEASURE_ERROR:
                            int errorNumber = intent.getIntExtra(Bg1Profile.BG1_MEASURE_ERROR, -1);
                            jsonObject.put(Bg1Profile.BG1_MEASURE_ERROR, errorNumber);
                            module.handleNotify("", "BG1", Bg1Profile.ACTION_BG1_MEASURE_ERROR, jsonObject.toString());
                            break;

                        case Bg1Profile.ACTION_BG1_MEASURE_RESULT:
                            int measureResult = intent.getIntExtra(Bg1Profile.BG1_MEASURE_RESULT, -1);
                            jsonObject.put(Bg1Profile.BG1_MEASURE_RESULT, measureResult);
                            module.handleNotify("", "BG1", Bg1Profile.ACTION_BG1_MEASURE_RESULT, jsonObject.toString());
                            break;

                        default:
                            module.handleNotify("", "BG1", intent.getAction(), jsonObject.toString());
                            break;

                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }
    };
}
