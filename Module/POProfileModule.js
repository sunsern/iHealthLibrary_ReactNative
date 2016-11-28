/**
 * Created by Jeepend on 15/11/2016.
 */
'use strict';


var {NativeModules} = require('react-native');

var RCTModule = NativeModules.POProfileModule

var POProfileModule = {
    ACTION_OFFLINEDATA_PO: RCTModule.ACTION_OFFLINEDATA_PO,
    ACTION_NO_OFFLINEDATA_PO: RCTModule.ACTION_NO_OFFLINEDATA_PO,
    ACTION_BATTERY_PO: RCTModule.ACTION_BATTERY_PO,
    ACTION_LIVEDA_PO: RCTModule.ACTION_LIVEDA_PO,
    ACTION_RESULTDATA_PO: RCTModule.ACTION_RESULTDATA_PO,
    ACTION_ERROR_PO: RCTModule.ACTION_ERROR_PO
}

module.exports = POProfileModule