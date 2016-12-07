package com.ihealth.ihealthlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.ihealth.communication.control.Bg5Profile;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by gaoyuanlong on 16/11/17.
 */

public class BGProfileModule extends ReactContextBaseJavaModule {

    private static final String modelName = "BGProfileModule";
    private static final String TAG = modelName;

    private static final String ACTION_KEEP_LINK = "ACTION_KEEP_LINK";
    private static final String ACTION_SET_TIME = "ACTION_SET_TIME";
    private static final String ACTION_SET_UNIT = "ACTION_SET_UNIT";
    private static final String ACTION_GET_BATTERY = "ACTION_GET_BATTERY";
    private static final String ACTION_START_MEASURE = "ACTION_START_MEASURE";
    private static final String ACTION_GET_OFFLINEDATA_COUNT = "ACTION_GET_OFFLINEDATA_NUM";
    private static final String ACTION_GET_OFFLINEDATA = "ACTION_GET_OFFLINE_DATA";
    private static final String ACTION_DELETE_OFFLINEDATA = "ACTION_DELETE_OFFLINEDATA";
    private static final String ACTION_SET_BOTTLEMESSAGE = "ACTION_SET_BOTTLEMESSAGE";
    private static final String ACTION_GET_BOTTLEMESSAGE = "ACTION_GET_BOTTLEMESSAGE";
    private static final String ACTION_SET_BOTTLEID = "ACTION_SET_BOTTLEID";
    private static final String ACTION_GET_BOTTLEID = "ACTION_GET_BOTTLEID";
    private static final String ACTION_ERROR_BG = "ACTION_ERROR_BG";

    private static final String KEEP_LINK = "KEEP_LINK";
    private static final String SET_TIME = "SET_TIME";
    private static final String SET_UNIT = "SET_UNIT";
    private static final String GET_BATTERY = "GET_BATTERY";
    private static final String START_MEASURE = "START_MEASURE";
    private static final String GET_OFFLINEDATA_COUNT = "GET_OFFLINEDATA_COUNT";
    private static final String GET_OFFLINEDATA = "GET_OFFLINEDATA";
    private static final String DELETE_OFFLINEDATA = "DELETE_OFFLINEDATA";
    private static final String SET_BOTTLEMESSAGE = "SET_BOTTLEMESSAGE";
    private static final String GET_EXPIRECTIME = "GET_EXPIRECTIME";
    private static final String GET_USENUM = "GET_USENUM";
//    private static final String SET_BOTTLEID = "SET_BOTTLEID";
    private static final String GET_BOTTLEID = "GET_BOTTLEID";
    private static final String ERROR_NUM_BG = "ERROR_NUM_BG";
    private static final String ERROR_DESCRIPTION_BG = "ERROR_DESCRIPTION_BG";


    public BGProfileModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return modelName;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {

        final Map<String, Object> constants = new HashMap<>();

        constants.put(ACTION_KEEP_LINK, Bg5Profile.ACTION_KEEP_LINK);
        constants.put(ACTION_SET_TIME, Bg5Profile.ACTION_SET_TIME);
        constants.put(ACTION_SET_UNIT, Bg5Profile.ACTION_SET_UNIT);
        constants.put(ACTION_GET_BATTERY, Bg5Profile.ACTION_BATTERY_BG);
        constants.put(ACTION_START_MEASURE, Bg5Profile.ACTION_START_MEASURE);
        constants.put(ACTION_GET_OFFLINEDATA_COUNT, Bg5Profile.ACTION_HISTORICAL_NUM_BG);
        constants.put(ACTION_GET_OFFLINEDATA, Bg5Profile.ACTION_HISTORICAL_DATA_BG);
        constants.put(ACTION_DELETE_OFFLINEDATA, Bg5Profile.ACTION_DELETE_HISTORICAL_DATA);
        constants.put(ACTION_SET_BOTTLEMESSAGE, Bg5Profile.ACTION_SET_BOTTLE_MESSAGE_SUCCESS);
        constants.put(ACTION_GET_BOTTLEMESSAGE, Bg5Profile.ACTION_GET_CODEINFO);
        constants.put(ACTION_SET_BOTTLEID, Bg5Profile.ACTION_SET_BOTTLE_ID_SUCCESS);
        constants.put(ACTION_GET_BOTTLEID, Bg5Profile.ACTION_GET_BOTTLEID);
        constants.put(ACTION_ERROR_BG, Bg5Profile.ACTION_ERROR_BG);

        constants.put(KEEP_LINK, Bg5Profile.KEEP_LINK);
        constants.put(SET_TIME, Bg5Profile.SET_TIME);
        constants.put(SET_UNIT, Bg5Profile.SET_UNIT);
        constants.put(GET_BATTERY, Bg5Profile.BATTERY_BG);
        constants.put(START_MEASURE, Bg5Profile.START_MEASURE);
        constants.put(GET_OFFLINEDATA_COUNT, Bg5Profile.HISTORICAL_NUM_BG);
        constants.put(GET_OFFLINEDATA, Bg5Profile.HISTORICAL_DATA_BG);
        constants.put(DELETE_OFFLINEDATA, Bg5Profile.DELETE_HISTORICAL_DATA);
        constants.put(SET_BOTTLEMESSAGE, Bg5Profile.SET_BOTTLE_MESSAGE);
        constants.put(GET_EXPIRECTIME, Bg5Profile.GET_EXPIRECTIME);
        constants.put(GET_USENUM, Bg5Profile.GET_USENUM);
        constants.put(GET_BOTTLEID, Bg5Profile.GET_BOTTLEID);
//        constants.put(SET_BOTTLEID, Bg5Profile.SET_BOTTLEID);
        constants.put(ERROR_NUM_BG, Bg5Profile.ERROR_NUM_BG);
//        constants.put(ERROR_DESCRIPTION_BG, Bg5Profile.ERROR_DESCRIPTION_BG);

        return constants;
    }
}
