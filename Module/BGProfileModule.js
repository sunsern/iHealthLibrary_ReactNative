/**
 * Created by gaoyuanlong on 16/11/16.
 */
'use strict';


var {NativeModules} = require('react-native');

var RCTModule = NativeModules.BGProfileModule

/**
 * @module BGProfileModule
 */
module.exports = {

    /**
     * The action value of event indicating the error of BG device.<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>BGProfileModule.ACTION_ERROR_BG</td></tr>
     * <tr><td>BGProfileModule.ERROR_NUM_BG</td><td> The error num</td></tr>
     * <tr><td>BGProfileModule.ERROR_DESCRIPTION_BG</td><td>Detailed description of the error</td></tr>
     * </tbody>
     * </table>
     * <b>Example:</b><br/>
     * {<br/>
     * &nbsp; &nbsp; "action": "action_measure_error",<br/>
	 * &nbsp; &nbsp; "error": 400,<br/>
	 * &nbsp; &nbsp; "description": "setAlarmClock() parameter min should be in the range [0, 59]."<br/>
	 * }<br/>
     */
    ACTION_ERROR_BG: RCTModule.ACTION_ERROR_BG,

    /**
     * The action value of event indicating the result of keep link command.<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>BGProfileModule.ACTION_KEEP_LINK</td></tr>
     * <tr><td>BGProfileModule.KEEP_LINK</td><td>keep link command result</td></tr>
     * </tbody>
     * </table>
     * <b>Example:</b><br/>
     * {<br/>
     * &nbsp; &nbsp; "action": "action_keep_link",<br/>
	 * &nbsp; &nbsp; "keep_link": true <br/>
	 * }<br/>
     */
    ACTION_KEEP_LINK: RCTModule.ACTION_KEEP_LINK,

    /**
     * The action value of event indicating the result of set time command.<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>BGProfileModule.ACTION_SET_TIME</td></tr>
     * <tr><td>BGProfileModule.SET_TIME</td><td>set time command result</td></tr>
     * </tbody>
     * </table>
     * <b>Example:</b><br/>
     * {<br/>
     * &nbsp; &nbsp; "action": "action_set_time",<br/>
	 * &nbsp; &nbsp; "set_time": true <br/>
	 * }<br/>
     */
    ACTION_SET_TIME: RCTModule.ACTION_SET_TIME,

    /**
     * The action value of event indicating the result of set unit command.<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>BGProfileModule.ACTION_SET_UNIT</td></tr>
     * <tr><td>BGProfileModule.SET_UNIT</td><td>set unit command result</td></tr>
     * </tbody>
     * </table>
     * <b>Example:</b><br/>
     * {<br/>
     * &nbsp; &nbsp; "action": "action_set_unit",<br/>
	 * &nbsp; &nbsp; "set_unit": true <br/>
	 * }<br/>
     */
    ACTION_SET_UNIT: RCTModule.ACTION_SET_UNIT,

    /**
     * The action value of event indicating the result of get battery command.<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>BGProfileModule.ACTION_GET_BATTERY</td></tr>
     * <tr><td>BGProfileModule.GET_BATTERY</td><td>get battery command result</td></tr>
     * </tbody>
     * </table>
     * <b>Example:</b><br/>
     * {<br/>
     * &nbsp; &nbsp; "action": "action_battery_bg",<br/>
	 * &nbsp; &nbsp; "battery": 50 <br/>
	 * }<br/>
     */
    ACTION_GET_BATTERY: RCTModule.ACTION_GET_BATTERY,

    /**
     * The action value of event indicating the result of start measure command.<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>BGProfileModule.ACTION_START_MEASURE</td></tr>
     * <tr><td>BGProfileModule.START_MEASURE</td><td>start measure command result</td></tr>
     * </tbody>
     * </table>
     * <b>Example:</b><br/>
     * {<br/>
     * &nbsp; &nbsp; "action": "action_start_measure",<br/>
	 * &nbsp; &nbsp; "start_measure":true <br/>
	 * }<br/>
     */
    ACTION_START_MEASURE: RCTModule.ACTION_START_MEASURE,

    /**
     * The action value of event indicating the result of get offline data count command.<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>BGProfileModule.ACTION_GET_OFFLINEDATA_COUNT</td></tr>
     * <tr><td>BGProfileModule.GET_OFFLINEDATA_COUNT</td><td>Get offline data count command result</td></tr>
     * </tbody>
     * </table>
     * <b>Example:</b><br/>
     * {<br/>
     * &nbsp; &nbsp; "action": "action_historicalnum_bg",<br/>
	 * &nbsp; &nbsp; "count":10 <br/>
	 * }<br/>
     */
    ACTION_GET_OFFLINEDATA_COUNT: RCTModule.ACTION_GET_OFFLINEDATA_COUNT,

    /**
     * The action value of event indicating the result of get offline data command.<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>BGProfileModule.ACTION_GET_OFFLINEDATA</td></tr>
     * <tr><td>BGProfileModule.GET_OFFLINEDATA</td><td>Get offline data command result</td></tr>
     * </tbody>
     * </table>
     * <b>Example:</b><br/>
     * {<br/>
     * &nbsp; &nbsp; "action": "action_historicaldata_bg",<br/>
	 * &nbsp; &nbsp; "his_data_bg":{"history":[{"dataID":"ABCDEF1234567890","value":140,"date":"2016-12-1 01:15:00"},
	 *                                         {"dataID":"1234567890ABCDEF","value":120,"date":"2016-12-1 01:16:00"}]} <br/>
	 * }<br/>
     */
    ACTION_GET_OFFLINEDATA: RCTModule.ACTION_GET_OFFLINEDATA,

    /**
     * The action value of event indicating the result of delete offline data command.<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>BGProfileModule.ACTION_DELETE_OFFLINEDATA</td></tr>
     * <tr><td>BGProfileModule.DELETE_OFFLINEDATA</td><td>delete offline data command result</td></tr>
     * </tbody>
     * </table>
     * <b>Example:</b><br/>
     * {<br/>
     * &nbsp; &nbsp; "action": "action_delete_historical_data",<br/>
	 * &nbsp; &nbsp; "delete_historical_data": true <br/>
	 * }<br/>
     */
    ACTION_DELETE_OFFLINEDATA: RCTModule.ACTION_DELETE_OFFLINEDATA,

    /**
     * The action value of event indicating the result of set bottle message command.<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>BGProfileModule.ACTION_SET_BOTTLEMESSAGE</td></tr>
     * <tr><td>BGProfileModule.SET_BOTTLEMESSAGE</td><td>Set bottle message command result</td></tr>
     * </tbody>
     * </table>
     * <b>Example:</b><br/>
     * {<br/>
     * &nbsp; &nbsp; "action": "action_set_bottle_message_success",<br/>
	 * &nbsp; &nbsp; "set_bottle_message": true <br/>
	 * }<br/>
     */
    ACTION_SET_BOTTLEMESSAGE: RCTModule.ACTION_SET_BOTTLEMESSAGE,

    /**
     * The action value of event indicating the result of get bottle message command.<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>BGProfileModule.ACTION_GET_BOTTLEMESSAGE</td></tr>
     * <tr><td>BGProfileModule.GET_BOTTLEMESSAGE</td><td>Get bottle message command result</td></tr>
     * </tbody>
     * </table>
     * <b>Example:</b><br/>
     * {<br/>
     * &nbsp; &nbsp; "action": "action_get_codeinfo",<br/>
	 * &nbsp; &nbsp; "expiretime": 2017-01-01<br/>
	 * &nbsp; &nbsp; "usenum": 1024 <br/>
	 * }<br/>
     */
    ACTION_GET_BOTTLEMESSAGE: RCTModule.ACTION_GET_BOTTLEMESSAGE,

    /**
     * The action value of event indicating the result of set bottleID command.<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>BGProfileModule.ACTION_SET_BOTTLEID</td></tr>
     * <tr><td>BGProfileModule.SET_BOTTLEID</td><td>Set bottleID command result</td></tr>
     * </tbody>
     * </table>
     * <b>Example:</b><br/>
     * {<br/>
     * &nbsp; &nbsp; "action": "action_setbottleid_success",<br/>
	 * &nbsp; &nbsp; "set_bottle_id": true <br/>
	 * }<br/>
     */
    ACTION_SET_BOTTLEID: RCTModule.ACTION_SET_BOTTLEID,

    /**
     * The action value of event indicating the result of get bottleID command.<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>BGProfileModule.ACTION_GET_BOTTLEID</td></tr>
     * <tr><td>BGProfileModule.GET_BOTTLEID</td><td>Get bottleID command result</td></tr>
     * </tbody>
     * </table>
     * <b>Example:</b><br/>
     * {<br/>
     * &nbsp; &nbsp; "action": "action_get_bottleid",<br/>
	 * &nbsp; &nbsp; "bottleid": 121212 <br/>
	 * }<br/>
     */
    ACTION_GET_BOTTLEID: RCTModule.ACTION_GET_BOTTLEID,


    /**
     * The action value of event indicating the result of strip was put in the devices.<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>BGProfileModule.ACTION_STRIP_IN</td></tr>
     * </tbody>
     * </table>
     * <b>Example:</b><br/>
     * {<br/>
     * &nbsp; &nbsp; "action": "action_measure_strip_in",<br/>
	 * }<br/>
     */
    ACTION_STRIP_IN: RCTModule.ACTION_STRIP_IN,

    /**
     * The action value of event indicating the result of strip out of the devices.<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>BGProfileModule.ACTION_STRIP_OUT</td></tr>
     * </tbody>
     * </table>
     * <b>Example:</b><br/>
     * {<br/>
     * &nbsp; &nbsp; "action": "action_measure_strip_out",<br/>
	 * }<br/>
     */
    ACTION_STRIP_OUT: RCTModule.ACTION_STRIP_OUT,

    /**
     * The action value of event indicating the result of get the blood.<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>BGProfileModule.ACTION_GET_BLOOD</td></tr>
     * </tbody>
     * </table>
     * <b>Example:</b><br/>
     * {<br/>
     * &nbsp; &nbsp; "action": "action_measure_get_blood",<br/>
	 * }<br/>
     */
    ACTION_GET_BLOOD: RCTModule.ACTION_GET_BLOOD,

    /**
     * The action value of event indicating the result of get measure value from devices.<br/>
     * The key and value will be as below:
     * <table style="width:100px;" cellpadding="2" cellspacing="0" border="1" bordercolor="#000000">
     * <tbody>
     * <tr><td>Key</td><td>Value</td></tr>
     * <tr><td>action</td><td>BGProfileModule.ACTION_ONLINE_RESULT_BG</td></tr>
     * <tr><td>BGProfileModule.ONLINE_RESULT_BG</td><td>The bg value measured by device</td></tr>
     * <tr><td>BGProfileModule.dataID</td><td>The dataID measured by device</td></tr>
     * </tbody>
     * </table>
     * <b>Example:</b><br/>
     * {<br/>
     * &nbsp; &nbsp; "action": "action_value_bg",<br/>
	 * &nbsp; &nbsp; "result": 155 <br/>
	 * &nbsp; &nbsp; "dataID": 123456789ABCDE <br/>
	 * }<br/>
     */
    ACTION_ONLINE_RESULT_BG: RCTModule.ACTION_ONLINE_RESULT_BG,

    /**
     * The error num means different error.
     * <p>0:Battery is low.</p>
     * <p>1:Glucose test result is out of the measurement range.</p>
     * <p>2:Unknown interference detected, please repeat the test.</p>
     * <p>3:Strip is used or unknown moisture detected, discard the test strip and repeat the test with a new strip..</p>
     * <p>4:Reading transmission error. Repeat the test with a new test strip. If the problem persists, contact iHealth customer service for assistance.</p>
     * <p>5:The environmental temperature is beyond normal range, place the meter at room temperature for at least 30 minutes, then repeat the test.</p>
     * <p>6:The environmental temperature is beyond normal range, place the meter at room temperature for at least 30 minutes, then repeat the test.</p>
     * <p>7:Test strip coding error.</p>
     * <p>8:Communication error, press"START" or rescan the code to repeat the test.</p>
     * <p>9:Strip removed in the middle of reading, repeat the test with a new strip.</p>
     * <p>10:Insert a new test strip and repeat the test.</p>
     * <p>11:Cannot write to SN or KEY.</p>
     * <p>12:Please set time.</p>
     * <p>13:0 test strips remaining.</p>
     * <p>14:Test strip expired.</p>
     * <p>15:Unplug the charging cable before testing.</p>
     * <p>18:Unplug the charging cable before read the history data</>
     * <p>19:Charging line is inserted</>
     * <p>20:Charging line pull out</>
     * <p>21:The bluetooth module failure</>
     * <p>112:Device don't support to query energy.</p>
     * <p>400:Parameters out of range.</p>
     */
    ERROR_NUM_BG: RCTModule.ERROR_NUM_BG,

    /**
     * The error discription.
     */
    ERROR_DESCRIPTION_BG: RCTModule.ERROR_DESCRIPTION_BG,

    /**
     * Get battery value.
     */
    GET_BATTERY: RCTModule.GET_BATTERY,

    /**
     * Get offlin data count value.
     */
    GET_OFFLINEDATA_COUNT: RCTModule.GET_OFFLINEDATA_COUNT,

    /**
     * Get offline data value.
     */
    GET_OFFLINEDATA: RCTModule.GET_OFFLINEDATA,

    /**
     * Set bottle message value.
     */
    SET_BOTTLEMESSAGE: RCTModule.SET_BOTTLEMESSAGE,

    /**
     * the start mode of Bg5 device.
     * <li>
     * value=1, start by insert strip, no need to call <BG5Module.startMeasure> 
     * </li>
     * <li>
     * value=2, start by tap the button, need to call <BG5Module.startMeasure> 
     * </li>
     * </ul>
     */
    START_MODE: RCTModule.START_MODE,

    /**
     * Get bottle message value.
     */
    GET_EXPIRECTIME: RCTModule.GET_EXPIRECTIME,

    /**
     * Get use num value.
     */
    GET_USENUM: RCTModule.GET_USENUM,


    /**
     * Get bottle ID value.
     */
    GET_BOTTLEID: RCTModule.GET_BOTTLEID,

    /**
     * The bg value measured by device
     */
    ONLINE_RESULT_BG: RCTModule.ONLINE_RESULT_BG,

    /**
     * The dataID measured by device
     */
    DATA_ID: RCTModule.DATA_ID,

    /**
     * Callback indicating the code analysis result.
     */
    ACTION_CODE_ANALYSIS:RCTModule.ACTION_CODE_ANALYSIS,

    /**
     * the strip number
     */
    STRIP_NUM_BG:RCTModule.STRIP_NUM_BG,

    /**
     * the expire time
     */
    STRIP_EXPIRETIME_BG:RCTModule.STRIP_EXPIRETIME_BG,

    /**
     * the bottle id
     */
    BOTTLEID_BG:RCTModule.BOTTLEID_BG
}