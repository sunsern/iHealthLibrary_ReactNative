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
             @"ACTION_ERROR_BP":kACTION_ERROR_BP,
             @"ACTION_BATTERY_BP":kACTION_BATTERY_BP,
             @"ACTION_ZOREING_BP":kACTION_ZOREING_BP,
             @"ACTION_ZOREOVER_BP":kACTION_ZOREOVER_BP,
             @"ACTION_ONLINE_PRESSURE_BP":kACTION_ONLINE_PRESSURE_BP,
             @"ACTION_ONLINE_PULSEWAVE_BP":kACTION_ONLINE_PULSEWAVE_BP,
             @"ACTION_ONLINE_RESULT_BP":kACTION_ONLINE_RESULT_BP,
             @"ACTION_HISTORICAL_NUM_BP":kACTION_HISTORICAL_NUM_BP,
             @"ACTION_HISTORICAL_DATA_BP":kACTION_HISTORICAL_DATA_BP,
             @"ACTION_HISTORICAL_OVER_BP":kACTION_HISTORICAL_OVER_BP,
             @"ACTION_FUNCTION_INFORMATION_BP":kACTION_FUNCTION_INFORMATION_BP,
             @"ACTION_SET_UNIT_SUCCESS_BP":kACTION_SET_UNIT_SUCCESS_BP,
             @"ACTION_SET_ANGLE_SUCCESS_BP":kACTION_SET_ANGLE_SUCCESS_BP,
             @"ACTION_INTERRUPTED_BP":kACTION_INTERRUPTED_BP,
             
             @"Action_enableOffline":@"Action_enableOffline",
             @"Action_disEnableOffline":@"Action_disEnableOffline",
             @"Action_is_enable_offline":@"Action_is_enable_offline",
             
             @"ERROR_NUM_BP":kERROR_NUM_BP,
             @"BATTERY_BP":kBATTERY_BP,
             @"BLOOD_PRESSURE_BP":kBLOOD_PRESSURE_BP,
             @"FLAG_HEARTBEAT_BP":kFLAG_HEARTBEAT_BP,
             @"PULSEWAVE_BP":kPULSEWAVE_BP,
             @"HIGH_BLOOD_PRESSURE_BP":kHIGH_BLOOD_PRESSURE_BP,
             @"LOW_BLOOD_PRESSURE_BP":kLOW_BLOOD_PRESSURE_BP,
             @"PULSE_BP":kPULSE_BP,
             @"MEASUREMENT_AHR_BP":kMEASUREMENT_AHR_BP,
             @"MEASUREMENT_HSD_BP":kMEASUREMENT_HSD_BP,
             @"DATAID":kDATAID,
             
             @"HISTORICAL_NUM_BP":kHISTORICAL_NUM_BP,
             @"HISTORICAL_DATA_BP":kHISTORICAL_DATA_BP,
             
             @"FUNCTION_IS_UPAIR_MEASURE":kFUNCTION_IS_UPAIR_MEASURE,
             @"FUNCTION_IS_ARM_MEASURE":kFUNCTION_IS_ARM_MEASURE,
             @"FUNCTION_HAVE_ANGLE_SENSOR":kFUNCTION_HAVE_ANGLE_SENSOR,
             @"FUNCTION_HAVE_OFFLINE":kFUNCTION_HAVE_OFFLINE,
             @"FUNCTION_HAVE_ANGLE_SETTING":kFUNCTION_HAVE_ANGLE_SETTING,
             @"FUNCTION_IS_MULTI_UPLOAD":kFUNCTION_IS_MULTI_UPLOAD,
             @"FUNCTION_HAVE_SELF_UPDATE":kFUNCTION_HAVE_SELF_UPDATE,
             };
};




@end
