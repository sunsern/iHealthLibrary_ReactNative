'use strict';


var { NativeModules } = require('react-native');

var RCTModule = NativeModules.BG1Module

/**
 * @module BG1Module
 */
var BG1Module = {

    /**
     * Notify event type for BG1.
     */
    Event_Notify: RCTModule.Event_Notify,

     /**
     * Send code to bg1 device
     * 
     * @param {string} QRCode
     * @return Event ('ACTION_BG1_SENDCODE_RESULT') with a Map object.<br/>
     */
	sendCode: function(QRCode: string): void {
        if (RCTModule != null) {
            RCTModule.sendCode(QRCode);
        }else {
            console.log('~~~~~ RCTModule is null')
        }
	},
    
    /**
     * Parse bottle info from QRCode, include strip expire time,strip number,bottle id
     *
     * @param {string} QRCode
     * @return json string. {"bottleInfo":[{"bottleId":"4294967295","overDate":"2099-12-16","stripNum":"255"}]} <br/>
     */
    getBottleInfoFromQR: function(QRCode: string): void {
        if (RCTModule != null) {
            RCTModule.getBottleInfoFromQR(QRCode);
        }else {
            console.log('~~~~~ RCTModule is null')
        }
    }

}

module.exports = BG1Module
