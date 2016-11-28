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
             @"Action_Error":@"Action_Error",
             @"Action_Battery":@"Action_Battery",
             @"Action_Zeroing":@"Action_Zeroing",
             @"Action_ZeroOver":@"Action_ZeroOver",
             @"Action_Pressure":@"Action_Pressure",
             @"Action_PulseWave":@"Action_PulseWave",
             @"Action_Result":@"Action_Result",
             @"Action_getOffLineDataNum":@"Action_getOffLineDataNum",
             @"Action_getOffLineData":@"Action_getOffLineData",
             @"Action_getFunctionInfo":@"Action_getFunctionInfo",
             @"Action_setUnitSuccess":@"Action_setUnitSuccess",
             @"Action_setAngleSuccess":@"Action_setAngleSuccess",
             @"Action_enableOffline":@"Action_enableOffline",
             @"Action_disEnableOffline":@"Action_disEnableOffline",
             @"Action_interrupted":@"Action_interrupted",
             @"Action_is_enable_offline":@"Action_is_enable_offline"
             };
};




@end
