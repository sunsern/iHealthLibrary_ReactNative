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

    ERROR_NUM_BP:RCTModule.ERROR_NUM_BP,

    /**
     * The action of callback indicates the battery of Bp device.
     */
    ACTION_BATTERY_BP:RCTModule.ACTION_BATTERY_BP,

    BATTERY_BP:RCTModule.BATTERY_BP,
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

    BLOOD_PRESSURE_BP:RCTModule.BLOOD_PRESSURE_BP,
    /**
     * The action of callback indicates the device's pressure and pulse wave in the measurement.
     */
    ACTION_ONLINE_PULSEWAVE_BP:RCTModule.ACTION_ONLINE_PULSEWAVE_BP,

    FLAG_HEARTBEAT_BP:RCTModule.FLAG_HEARTBEAT_BP,

    PULSEWAVE_BP:RCTModule.PULSEWAVE_BP,
    /**
     * The action of callback indicates the result of measurement
     */
    ACTION_ONLINE_RESULT_BP:RCTModule.ACTION_ONLINE_RESULT_BP,

    HIGH_BLOOD_PRESSURE_BP:RCTModule.HIGH_BLOOD_PRESSURE_BP,

    LOW_BLOOD_PRESSURE_BP:RCTModule.LOW_BLOOD_PRESSURE_BP,

    PULSE_BP:RCTModule.PULSE_BP,

    MEASUREMENT_AHR_BP:RCTModule.MEASUREMENT_AHR_BP,

    MEASUREMENT_HSD_BP:RCTModule.MEASUREMENT_HSD_BP,

    DATAID:RCTModule.DATAID,

    /**
     * The action of callback indicates the num of historyData
     */
    ACTION_HISTORICAL_NUM_BP:RCTModule.ACTION_HISTORICAL_NUM_BP,

    HISTORICAL_NUM_BP:RCTModule.HISTORICAL_NUM_BP,

    /**
     * The action of callback indicates historyData
     */
    ACTION_HISTORICAL_DATA_BP:RCTModule.ACTION_HISTORICAL_DATA_BP,

    MEASUREMENT_DATE_BP:RCTModule.MEASUREMENT_DATE_BP,


    /**
     * The action of callback indicates the function information data of bp devices
     */
    ACTION_FUNCTION_INFORMATION_BP:RCTModule.ACTION_FUNCTION_INFORMATION_BP,

    FUNCTION_IS_UPAIR_MEASURE:RCTModule.FUNCTION_IS_UPAIR_MEASURE,

    FUNCTION_IS_ARM_MEASURE:RCTModule.FUNCTION_IS_ARM_MEASURE,

    FUNCTION_HAVE_ANGLE_SENSOR:RCTModule.FUNCTION_HAVE_ANGLE_SENSOR,

    FUNCTION_HAVE_OFFLINE:RCTModule.FUNCTION_HAVE_OFFLINE,

    FUNCTION_HAVE_HSD:RCTModule.FUNCTION_HAVE_HSD,

    FUNCTION_HAVE_ANGLE_SETTING:RCTModule.FUNCTION_HAVE_ANGLE_SETTING,

    FUNCTION_IS_MULTI_UPLOAD:RCTModule.FUNCTION_IS_MULTI_UPLOAD,

    FUNCTION_HAVE_SELF_UPDATE:RCTModule.FUNCTION_HAVE_SELF_UPDATE,

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

    IS_ENABLE_OFFLINE:RCTModule.IS_ENABLE_OFFLINE,

    /**
     * The action of callback indicates interrupted the measure.
     */
    ACTION_INTERRUPTED_BP:RCTModule.ACTION_INTERRUPTED_BP
}


module.exports = BPProfile