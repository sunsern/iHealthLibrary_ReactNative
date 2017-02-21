//
//  HS6Module.m
//  ReactNativeIOSLibrary
//
//  Created by ihealth on 16/12/12.
//  Copyright © 2016年 daiqingquan. All rights reserved.
//

#import "HS6Module.h"
#import "HS6ProfileModule.h"
#import "HSMacroFile.h"
#import "iHealthHS6.h"
#import "HealthUser.h"
#import "iHealthDeviceManagerModule.h"

#define EVENT_NOTIFY @"HS6.MODULE.NOTIFY"

@implementation HS6Module

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

#pragma mark-init

-(NSDictionary *)constantToExport{
    return @{
             @"Event_Notify" : EVENT_NOTIFY
                          };
}

- (void)sendErrorWithCode:(NSInteger)errorCode{
    [self sendEventWithAction:@"ACTION_ERROR_HS" keyString:@"value" valueString:@(errorCode)];
}

- (void)sendEventWithAction:(NSString*)actionName keyString:(NSString*)key valueString:(id)value{
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"HS6.MODULE.NOTIFY"  body:@{@"action":actionName,key:value}];
}

#pragma mark
#pragma mark - Method
 RCT_EXPORT_METHOD(init:(nonnull NSString*)userName){
    
     [iHealthHS6 shareIHHS6Controller];
     NSLog(@"Set User Succeed!");
}


//设置Wifi
RCT_EXPORT_METHOD(setWifi:(nonnull NSString*)ssid :(nonnull NSString*)password){
    
    HealthUser *user =[[HealthUser alloc]init];
    iHealthHS6 *hs6Controller = [iHealthHS6 shareIHHS6Controller];
    if (hs6Controller != nil) {
        [hs6Controller commandSetHS6WithPassWord:@"aaaaaaaa" disposeHS6SuccessBlock:^(NSDictionary *deviceInfo) {
            NSDictionary *deviceInf = @{@"mac":@"",@"action":ACTION_HS6_SETWIFI,SETWIFI_RESULT:[NSDictionary dictionaryWithObjectsAndKeys:deviceInfo, nil]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];
        } disposeHS6FailBlock:^(NSString *failmsg) {
            NSDictionary *deviceInf = @{@"mac":@"",@"action":ACTION_HS6_SETWIFI,SETWIFI_RESULT:[NSString stringWithFormat:failmsg]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];
            
        } disposeHS6EndBlock:^(NSDictionary *deviceDic) {
            
           // NSDictionary *deviceInf = @{@"mac":@"", @"action":ACTION_HS6_SETWIFI,SETWIFI_RESULT:[NSDictionary dictionaryWithObjectsAndKeys:deviceDic, nil]};
           //[self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];
            
        } disposeHS6ErrorBlock:^(NSNumber *error) {
            NSDictionary *deviceInf = @{@"mac":@"",@"action":ACTION_HS6_ERROR,HS6_ERROR:[NSNumber numberWithInteger:error]};
            
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];
        }];
    }
       }
//绑定设备
RCT_EXPORT_METHOD(bindDeviceHS6:(nonnull NSString*)birthday :(nonnull NSNumber*)weight :(nonnull NSNumber*)height :(nonnull NSNumber*)isSporter :(nonnull NSNumber*)gender :(nonnull NSString*)serialNumber){
   iHealthHS6 *hs6Controller = [iHealthHS6 shareIHHS6Controller];
    if (hs6Controller != nil) {
        [hs6Controller cloudCommandUserBinedQRDeviceWithUser:nil deviceID:nil BlockHS6UserAuthentication:^(UserAuthenResult result) {
            NSLog(@"UserAuthenResult:%d",result);
            if (result != UserAuthen_LoginSuccess) {
                [self sendErrorWithCode:result];
            }
        } binedResult:^(NSArray *resultArray) {
            NSDictionary *deviceInf = @{@"mac":@"",@"action":ACTION_HS6_BIND,BIND_HS6_RESULT:[NSArray arrayWithObjects:resultArray, nil]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];
        } binedError:^(NSString *errorCode) {
            NSDictionary *deviceInf = @{@"mac":@"",@"action":ACTION_HS6_ERROR,HS6_ERROR:[NSString stringWithFormat:errorCode]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];

        }];
    }
}
//解绑
RCT_EXPORT_METHOD(unBindDeviceHS6:(nonnull NSString*)serialNumber){
    
    iHealthHS6 *hs6Controller = [iHealthHS6 shareIHHS6Controller];

    if (hs6Controller != nil) {
        [hs6Controller cloudCommandUserDisBinedQRDeviceForUser:nil withDeviceID:nil disBinedResult:^(NSArray *resultArray) {
            NSDictionary *deviceInf = @{@"mac":@"",@"action":ACTION_HS6_UNBIND,HS6_UNBIND_RESULT:[NSDictionary dictionaryWithObjectsAndKeys:resultArray, nil]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];

        } disBinedError:^(NSString *errorCode) {
            NSDictionary *deviceInf = @{@"mac":@"",@"action":ACTION_HS6_ERROR,HS6_ERROR:[NSString stringWithFormat:errorCode]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];
        }];
    }
}
//获取OpenAPI
RCT_EXPORT_METHOD(getToken:(nonnull NSString*)clientId :(nonnull NSString*)clientSecret :(nonnull NSString*)username :(nonnull NSString*)clientPara){

    iHealthHS6 *hs6Controller = [iHealthHS6 shareIHHS6Controller];

    if (hs6Controller != nil) {
        [hs6Controller commandHS6GetOpenAPITokenWithUser:nil withSuccessBlock:^(NSDictionary*openAPIInfoDic) {
            NSDictionary *deviceInf = @{@"mac":@"",@"action":ACTION_HS6_GET_TOKEN,GET_TOKEN_RESULT:[NSDictionary dictionaryWithObjectsAndKeys:openAPIInfoDic, nil]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];
        } withErrorBlock:^(NSDictionary *errorCode) {
            NSDictionary *deviceInf = @{@"mac":@"" ,@"action":ACTION_HS6_ERROR, HS6_ERROR:[NSDictionary dictionaryWithObjectsAndKeys:errorCode, nil]};
        }];
    }
}
//设置单位
RCT_EXPORT_METHOD(setUnit:(nonnull NSString*)username :(nonnull NSNumber*)unitType){
     iHealthHS6 *hs6Controller = [iHealthHS6 shareIHHS6Controller];
    if (hs6Controller != nil) {
        [hs6Controller commandHS6WithUser:nil withSyncWeightUnit:IHHS6SDKUnitWeight_lbs withSuccessBlock:^(BOOL syncWeightUnit) {
            NSDictionary *deviceInf = @{@"mac":@"",@"action":ACTION_HS6_SET_UNIT,SET_UNIT_RESULT:[NSNumber numberWithBool:syncWeightUnit]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];
            
        } withErrorBlock:^(NSString *errorCode) {
            NSDictionary *deviceInf = @{@"mac":@"" ,@"action":ACTION_HS6_ERROR,HS6_ERROR:[NSDictionary dictionaryWithObjectsAndKeys:errorCode, nil]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];
        }];
    }

}

@end
