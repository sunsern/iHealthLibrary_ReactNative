package com.ihealth.ihealthlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.ihealth.communication.control.Bg1Control;

/**
 * Created by zhaoyongguang on 29/11/2016.
 */

public class BG1Module extends iHealthBaseModule {
    private static final String TAG = BG1Module.class.getSimpleName();
    private static final String moduleName = BG1Module.class.getSimpleName();

    public BG1Module(ReactApplicationContext reactContext) {
        super(TAG,reactContext);
    }

    @Override
    public String getName() {
        return moduleName;
    }

    @ReactMethod
    public void init(String userName, int filter, boolean showUI) {
        Bg1Control.getInstance().init(getReactApplicationContext(), userName, filter, showUI);
    }

    @ReactMethod
    public void connect() {
        Bg1Control.getInstance().connect();
    }

    @ReactMethod
    public void disconnect() {
        Bg1Control.getInstance().disconnect();
    }

    @ReactMethod
    public void sendCode(String QRCode) {
        Bg1Control.getInstance().sendCode(QRCode);
    }

    @Override
    public void handleNotify(String mac, String deviceType, String action, String message) {

    }
}
