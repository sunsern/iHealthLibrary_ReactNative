//
//  HSProfileModule.m
//  ReactNativeIOSLibrary
//
//  Created by ihealth on 16/12/2.
//  Copyright © 2016年 daiqingquan. All rights reserved.
//

#import "HSProfileModule.h"

@implementation HSProfileModule

RCT_EXPORT_MODULE()

#pragma mark
#pragma mark - constantsToExport

-(NSDictionary *)constantsToExport{
    return @{
             @"ACTION_LIVEDATA_HS" : @"ACTION_LIVEDATA_HS",
             @"LIVEDATA_HS" : @"LIVEDATA_HS",
             
             @"ACTION_ONLINE_RESULT_HS" : @"ACTION_ONLINE_RESULT_HS",
             @"DATAID" : @"DATAID",
             @"WEIGHT_HS" : @"WEIGHT_HS",
             @"FAT_HS" : @"FAT_HS",
             @"WATER_HS" : @"WATER_HS",
             @"MUSCLE_HS" : @"MUSCLE_HS",
             @"SKELETON_HS" : @"SKELETON_HS",
             @"FATELEVEL_HS" : @"FATELEVEL_HS",
             @"DCI_HS" : @"DCI_HS",
             
             
             @"ACTION_HISTORICAL_DATA_HS" : @"ACTION_HISTORICAL_DATA_HS",
             @"HISTORYDATA__HS" : @"HISTORYDATA__HS",
             @"MEASUREMENT_DATE_HS" : @"MEASUREMENT_DATE_HS",
             @"ACTION_NO_HISTORICALDATA" : @"ACTION_NO_HISTORICALDATA",
             
             @"ACTION_ERROR_HS" : @"ACTION_ERROR_HS",
             @"ERROR_NUM_HS" : @"ERROR_NUM_HS",
             @"ERROR_ID_ILLEGAL_ARGUMENT" : @"ERROR_ID_ILLEGAL_ARGUMENT",
             @"ERROR_ID_WIFI_DISABLED" : @"ERROR_ID_WIFI_DISABLED",
             @"ERROR_DESCRIPTION_HS" : @"ERROR_DESCRIPTION_HS",
             
           //HS6
             @"ACTION_HS6_SETWIFI":@"ACTION_HS6_SETWIFI",
             @"SETWIFI_RESULT":@"SETWIFI_RESULT",
             
             @"ACTION_HS6_BIND":@"ACTION_HS6_BIND",
             @"HS6_BIND_EXTRA":@"HS6_BIND_EXTRA",
             @"BIND_HS6_RESULT":@"BIND_HS6_RESULT",
             @"HS6_MODEL":@"HS6_MODEL",
             @"HS6_POSITION":@"HS6_POSITION",
             @"HS6_SETTED_WIFI":@"HS6_SETTED_WIFI",
             
             @"ACTION_HS6_UNBIND":@"ACTION_HS6_UNBIND",
             @"HS6_UNBIND_RESULT":@"HS6_UNBIND_RESULT",
             
             @"ACTION_HS6_GET_TOKEN":@"ACTION_HS6_GET_TOKEN",
             @"GET_TOKEN_RESULT":@"GET_TOKEN_RESULT",
             
             @"ACTION_HS6_SET_UNIT":@"ACTION_HS6_SET_UNIT",
             @"SET_UNIT_RESULT":@"SET_UNIT_RESULT",
             
             @"ACTION_HS6_ERROR":@"ACTION_HS6_ERROR",
             @"HS6_ERROR":@"HS6_ERROR",
             
             
             };

}
@end
