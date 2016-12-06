//
//  BPProfileModule.m
//  ReactNativeIOSLibrary
//
//  Created by daiqingquan on 2016/11/23.
//  Copyright © 2016年 daiqingquan. All rights reserved.
//

#import "BPProfileModule.h"

@implementation BPProfileModule


RCT_EXPORT_MODULE()

#pragma mark
#pragma mark - constantsToExport


- (NSDictionary *)constantsToExport
{
    return @{
             @"ACTION_ERROR_BP":@"ACTION_ERROR_BP",
             @"ACTION_BATTERY_BP":@"ACTION_BATTERY_BP",
             @"ACTION_ZOREING_BP":@"ACTION_ZOREING_BP",
             @"ACTION_ZOREOVER_BP":@"ACTION_ZOREOVER_BP",
             @"ACTION_ONLINE_PRESSURE_BP":@"ACTION_ONLINE_PRESSURE_BP",
             @"ACTION_ONLINE_PULSEWAVE_BP":@"ACTION_ONLINE_PULSEWAVE_BP",
             @"ACTION_ONLINE_RESULT_BP":@"ACTION_ONLINE_RESULT_BP",
             @"ACTION_HISTORICAL_NUM_BP":@"ACTION_HISTORICAL_NUM_BP",
             @"ACTION_HISTORICAL_DATA_BP":@"ACTION_HISTORICAL_DATA_BP",
             @"ACTION_FUNCTION_INFORMATION_BP":@"ACTION_FUNCTION_INFORMATION_BP",
             @"ACTION_SET_UNIT_SUCCESS_BP":@"ACTION_SET_UNIT_SUCCESS_BP",
             @"ACTION_SET_ANGLE_SUCCESS_BP":@"ACTION_SET_ANGLE_SUCCESS_BP",
             @"Action_enableOffline":@"Action_enableOffline",
             @"Action_disEnableOffline":@"Action_disEnableOffline",
             @"ACTION_INTERRUPTED_BP":@"ACTION_INTERRUPTED_BP",
             @"Action_is_enable_offline":@"Action_is_enable_offline"
             };
};




@end
