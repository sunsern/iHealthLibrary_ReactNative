/**
 * Created by zhangxu on 16/11/16.
 */
'use strict';


var { NativeModules } = require('react-native');

var RCTModule = NativeModules.BPProfileModule

var BPProfile = {

    /**
     * The action of callback indicates the error of BP device.
     */
    ACTION_ERROR_BP:RCTModule.ACTION_ERROR_BP,

    /**
     * The action of callback indicates the battery of Bp device.
     */
    ACTION_BATTERY_BP:RCTModule.ACTION_BATTERY_BP,
    /**
     * The action of callback indicates the Bp device is being initialized and the parameter is reset.
     */
    ACTION_ZOREING_BP:RCTModule.ACTION_ZOREING_BP,
    /**
     * The action of callback indicates the Initialization of the Bp device has been completed.
     */
    ACTION_ZOREOVER_BP:RCTModule.ACTION_ZOREOVER_BP,
    /**
     * The action of callback indicates the deive's pressure in the measurement.
     */
    ACTION_ONLINE_PRESSURE_BP:RCTModule.ACTION_ONLINE_PRESSURE_BP,
    /**
     * The action of callback indicates the device's pressure and pulse wave in the measurement.
     */
    ACTION_ONLINE_PULSEWAVE_BP:RCTModule.ACTION_ONLINE_PULSEWAVE_BP,
    /**
     * The action of callback indicates the result of measurement
     */
    ACTION_ONLINE_RESULT_BP:RCTModule.ACTION_ONLINE_RESULT_BP,

    /**
     * The action of callback indicates the num of historyData
     */
    ACTION_HISTORICAL_NUM_BP:RCTModule.ACTION_HISTORICAL_NUM_BP,
    /**
     * The action of callback indicates historyData
     */
    ACTION_HISTORICAL_DATA_BP:RCTModule.ACTION_HISTORICAL_DATA_BP,
    /**
     * The action of callback indicates the function information data of bp devices
     */
    ACTION_FUNCTION_INFORMATION_BP:RCTModule.ACTION_FUNCTION_INFORMATION_BP,
    /**
     * The action of callback indicates set unit success.
     */
    ACTION_SET_UNIT_SUCCESS_BP:RCTModule.ACTION_SET_UNIT_SUCCESS_BP,
    /**
     * The action of callback indicates set angle success.
     */
    ACTION_SET_ANGLE_SUCCESS_BP:RCTModule.ACTION_SET_ANGLE_SUCCESS_BP,
    /**
     * The action of callback indicates turn the offline measure function on.
     */
    ACTION_ENABLE_OFFLINE_BP:RCTModule.ACTION_ENABLE_OFFLINE_BP,
    /**
     * The action of callback indicates turn the offline measure function off.
     */
    ACTION_DISENABLE_OFFLINE_BP:RCTModule.ACTION_DISENABLE_OFFLINE_BP,
    /**
     * The action of callback indicates is the function of offline measure on or off.
     */
    ACTION_IS_ENABLE_OFFLINE:RCTModule.ACTION_IS_ENABLE_OFFLINE,
    /**
     * The action of callback indicates interrupted the measure.
     */
    ACTION_INTERRUPTED_BP:RCTModule.ACTION_INTERRUPTED_BP
}


module.exports = BPProfile