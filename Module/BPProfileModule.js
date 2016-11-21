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
    Action_Error:RCTModule.Action_Error,

    /**
     * The action of callback indicates the battery of Bp device.
     */
    Action_Battery:RCTModule.Action_Battery,
    /**
     * The action of callback indicates the Bp device is being initialized and the parameter is reset.
     */
    Action_Zeroing:RCTModule.Action_Zeroing,
    /**
     * The action of callback indicates the Initialization of the Bp device has been completed.
     */
    Action_ZeroOver:RCTModule.Action_ZeroOver,
    /**
     * The action of callback indicates the deive's pressure in the measurement.
     */
    Action_Pressure:RCTModule.Action_Pressure,
    /**
     * The action of callback indicates the device's pressure and pulse wave in the measurement.
     */
    Action_PulseWave:RCTModule.Action_PulseWave,
    /**
     * The action of callback indicates the result of measurement
     */
    Action_Result:RCTModule.Action_Result,

    /**
     * The action of callback indicates the num of historyData
     */
    Action_getOffLineDataNum:RCTModule.Action_getOffLineDataNum,
    /**
     * The action of callback indicates historyData
     */
    Action_getOffLineData:RCTModule.Action_getOffLineData,
    /**
     * The action of callback indicates the function information data of bp devices
     */
    Action_getFunctionInfo:RCTModule.Action_getFunctionInfo,
    /**
     * The action of callback indicates set unit success.
     */
    Action_setUnitSuccess:RCTModule.Action_setUnitSuccess,
    /**
     * The action of callback indicates set angle success.
     */
    Action_setAngleSuccess:RCTModule.Action_setAngleSuccess,
    /**
     * The action of callback indicates turn the offline measure function on.
     */
    Action_enableOffline:RCTModule.Action_enableOffline,
    /**
     * The action of callback indicates turn the offline measure function off.
     */
    Action_disEnableOffline:RCTModule.Action_disEnableOffline,
    /**
     * The action of callback indicates is the function of offline measure on or off.
     */
    Action_is_enable_offline:RCTModule.Action_is_enable_offline
}


module.exports = BPProfile