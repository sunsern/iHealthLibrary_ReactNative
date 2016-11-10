package com.ihealth.ihealthlibrary;



import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


import java.util.Iterator;


/**
 * Created by jing on 16/11/10.
 */


public class Utils {

    private static final String TAG = "Utils";


    public static void jsonToMap(String jsonString, WritableMap writableMap) {
        JSONObject jsonObject = null;
        try {
            jsonObject = new JSONObject(jsonString);

            if (jsonObject.length()>0) {
                for (Iterator<String> keys=jsonObject.keys(); keys.hasNext();) {
                    String key = keys.next();
                    try {
                        Object object = jsonObject.get(key);

                        if (object instanceof JSONObject) {
                            WritableMap map= Arguments.createMap();
                            jsonObjectToMap((JSONObject)object, map);
                            writableMap.putMap(key, map);
                        }
                        else if (object instanceof JSONArray) {
                            JSONArray jsonArray = (JSONArray) object;
                            WritableArray writableArray = Arguments.createArray();

                            for (int i=0; i<jsonArray.length(); i++) {

                                JSONObject jsonObjectInArray = (JSONObject) jsonArray.get(i);

                                WritableMap mapInArray= Arguments.createMap();
                                jsonObjectToMap(jsonObjectInArray, mapInArray);
                                writableArray.pushMap(mapInArray);

                            }
                            writableMap.putArray(key, writableArray);
                        }
                        else {
                            objectToMap(object, writableMap, key);
                        }
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private static void jsonObjectToMap(JSONObject object, WritableMap writableMap){
        for (Iterator<String> keys=object.keys();keys.hasNext();) {

            String key = keys.next();
            Object objectValue = null;
            try {
                objectValue= object.get(key);
            } catch (JSONException e) {
                e.printStackTrace();
            }

            objectToMap(objectValue, writableMap, key);
        }
    }

    private static void objectToMap(Object object, WritableMap writableMap, String key) {
        if (object instanceof Boolean) {
            writableMap.putBoolean(key, (Boolean) object);
        } else if(object instanceof Integer) {
            writableMap.putInt(key, (Integer) object);
        } else if(object instanceof Double) {
            writableMap.putDouble(key, (Double) object);
        } else if(object instanceof String) {
            writableMap.putString(key, (String) object);
        } else {
            Log.e(TAG,"~~~~~~~~~~~~~"+object.toString());
        }
    }
}
