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
             @"Action_Error_HS": @"Action_Error_HS",
             @"Action_Online_Result_HS": @"Action_Online_Result_HS",
             @"Action_Historical_Data_HS": @"Action_Historical_Data_HS",
             @"Action_Historical_Num_HS": @"Action_Historical_Num_HS",
             @"Action_No_HistoricalData": @"Action_No_HistoricalData",
             @"Action_Battery_HS": @"Action_Battery_HS",
             @"Action_LiveData_HS": @"Action_LiveData_HS",
             @"Action_StableData_HS":@"Action_StableData_HS",
             @"Action_ImpedanceData_HS":@"Action_ImpedanceData_HS",
             @"Action_Mangement_HS":@"Action_Mangement_HS",
             @"Action_AddUser_HS":@"Action_AddUser_HS",
             @"Action_DeleteUser_HS":@"Action_DeleteUser_HS",
             @"Action_UpdateUser_HS":@"Action_UpdateUser_HS",
             @"Action_SettingWifi":@"Action_SettingWifi",
             @"Action_SetWifi_Success":@"Action_SetWifi_Success",
             @"Action_SetWifi_Fail":@"Action_SetWifi_Fail",
             @"Action_SetWifi_Unknow":@"Action_SetWifi_Unknow",
             
             
             };

}
@end
