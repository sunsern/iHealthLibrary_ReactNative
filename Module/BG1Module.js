'use strict';


var { NativeModules } = require('react-native');

var RCTModule = NativeModules.BG1Module

var BG1Module = {

    /**
     * Notify event type for BG1.
     */
    Event_Notify: RCTModule.Event_Notify,

    /**
     * Init the controller.
     *
     * @param context  Context.
     * @param userName UserName
     * @param filter   0
     * @param showUI   Whether show a toast when modify system volume.
     *                 <p>
     *                 If true,some device may show a system toast to let the user know
     *                 "Listening at high volume for long periods(Continuing to increase the volume)
     *                 may damage your hearing." and then let user choose "OK" to
     *                 have a better experience with iHealth Align.
     *                 <p>
     *                 value true is recommended to have a better iHealth Align compatibility.
     */
    init: function (userName:string,filter:number,showUI: boolean): void {

        if (RCTModule != null) {
            RCTModule.init(userName,filter,showUI);
        }else {
            console.log('~~~~~ RCTModule is null')
        }

    },
    /**
    * connect BG1 device
    *
    */
	connect: function(): void {
		RCTModule.connect()
	},

    /**
     * Send code to bg1 device
     *
     * @param QRCode
     */
	sendCode: function(
		QRCode: string
	): void {
		RCTModule.sendCode(QRCode)
	},
    /**
    * disconnect BG1 device
    *
    */
    disconnect: function (): void {
        if (RCTModule != null) {
            RCTModule.disconnect();
        }else {
            console.log('~~~~~ RCTModule is null')
        }
    }
}

module.exports = BG1Module
