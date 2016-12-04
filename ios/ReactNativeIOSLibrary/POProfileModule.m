//
//  POProfileModule.m
//  ReactNativeIOSLibrary
//
//  Created by daiqingquan on 2016/12/4.
//  Copyright © 2016年 daiqingquan. All rights reserved.
//

#import "POProfileModule.h"

@implementation POProfileModule


RCT_EXPORT_MODULE()

#pragma mark
#pragma mark - constantsToExport


- (NSDictionary *)constantsToExport
{
    return @{
             @"ACTION_BATTERY_PO":@"ACTION_BATTERY_PO",
             @"BATTERY_PO":@"BATTERY_PO",
             @"ACTION_LIVEDA_PO":@"ACTION_LIVEDA_PO",
             @"PULSE_WAVE_PO":@"PULSE_WAVE_PO",
             @"PI_PO":@"PI_PO",
             @"PULSE_STRENGTH_PO":@"PULSE_STRENGTH_PO",
             @"BLOOD_OXYGEN_PO":@"BLOOD_OXYGEN_PO",
             @"PULSE_RATE_PO":@"PULSE_RATE_PO",
             @"ACTION_RESULTDATA_PO":@"ACTION_RESULTDATA_PO",
             @"DATAID":@"DATAID",
             @"ACTION_OFFLINEDATA_PO":@"ACTION_OFFLINEDATA_PO",
             @"OFFLINEDATA_PO":@"OFFLINEDATA_PO",
             @"MEASURE_DATE_PO":@"MEASURE_DATE_PO",
             @"ACTION_NO_OFFLINEDATA_PO":@"ACTION_NO_OFFLINEDATA_PO",
             @"ACTION_NO_OFFLINEDATA_PO":@"ACTION_NO_OFFLINEDATA_PO",
             @"ACTION_ERROR_PO":@"ACTION_ERROR_PO"
             };
};




@end
