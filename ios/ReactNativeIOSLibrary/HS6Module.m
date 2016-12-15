//
//  HS6Module.m
//  ReactNativeIOSLibrary
//
//  Created by ihealth on 16/12/12.
//  Copyright © 2016年 daiqingquan. All rights reserved.
//

#import "HS6Module.h"
#import "HSProfileModule.h"
#import "HSMacroFile.h"
#import "iHealthHS6.h"
#import "HealthUser.h"

#define EVENT_NOTIFY @"Event_Notify"

@implementation HS6Module

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

#pragma mark-init

-(NSDictionary *)constantToExport{
    return @{
            EVENT_NOTIFY:@"HS6.MODULE.NOTIFY"
                          };
}

-(iHealthHS6 *)getHs6WithUser:(HealthUser *)user{
    iHealthHS6 *hs6 = [iHealthHS6 shareIHHS6Controller];
    return hs6;
}
- (void)sendErrorWithCode:(NSInteger)errorCode{
    [self sendEventWithAction:@"ACTION_ERROR_HS" keyString:@"value" valueString:@(errorCode)];
}

- (void)sendEventWithAction:(NSString*)actionName keyString:(NSString*)key valueString:(id)value{
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"HS4.MODULE.NOTIFY"  body:@{@"action":actionName,key:value}];
}

#pragma mark
#pragma mark - Method
RCT_EXPORT_METHOD(initHs6:(nonnull NSString*)userName){

    
    }



RCT_EXPORT_METHOD(setWifi:(nonnull NSString*)ssid :(nonnull NSString*)password){
    
    HealthUser *user =[[HealthUser alloc]init];
    if ([self getHs6WithUser:user] != nil) {
        [[self getHs6WithUser:user]commandSetHS6WithPassWord:nil disposeHS6SuccessBlock:^(NSDictionary *deviceInfo) {
            NSDictionary *deviceInf = @{@"user":user,@"action":@"ACTION_HS6_SETWIFI",@"SETWIFI_RESULT":[NSDictionary dictionaryWithObjectsAndKeys:deviceInfo, nil]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];
        } disposeHS6FailBlock:^(NSString *failmsg) {
            NSDictionary *deviceInf = @{@"user":user,@"action":@"ACTION_HS6_SETWIFI",@"SETWIFI_RESULT":[NSString stringWithFormat:failmsg]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];
            
        } disposeHS6EndBlock:^(NSDictionary *deviceDic) {
            
            NSDictionary *deviceInf = @{@"user":user, @"action":@"ACTION_HS6_SETWIFI",@"SETWIFI_RESULT":[NSDictionary dictionaryWithObjectsAndKeys:deviceDic, nil]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];
            
        } disposeHS6ErrorBlock:^(NSNumber *error) {
            NSDictionary *deviceInf = @{@"user":user,@"action":@"ACTION_HS6_ERROR",@"HS6_ERROR":[NSNumber numberWithInteger:error]};
            
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];
        }];
    }
       }

RCT_EXPORT_METHOD(bindDeviceHS6:(nonnull NSString*)birthday :(nonnull NSNumber*)weight :(nonnull NSNumber*)height :(nonnull NSNumber*)isSporter :(nonnull NSNumber*)gender :(nonnull NSString*)serialNumber){
    HealthUser *user = [[HealthUser alloc]init];
    if ([self getHs6WithUser:user]) {
        [[self getHs6WithUser:user]cloudCommandUserBinedQRDeviceWithUser:user deviceID:nil BlockHS6UserAuthentication:^(UserAuthenResult result) {
            NSLog(@"UserAuthenResult:%d",result);
            if (result != UserAuthen_LoginSuccess) {
                [self sendErrorWithCode:result];
            }
        } binedResult:^(NSArray *resultArray) {
            NSDictionary *deviceInf = @{@"user":user,@"action":@"ACTION_HS6_BIND",@"BIND_HS6_RESULT":[NSArray arrayWithObjects:resultArray, nil]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];
        } binedError:^(NSString *errorCode) {
            NSDictionary *deviceInf = @{@"user":user,@"action":@"ACTION_HS6_ERROR",@"HS6_ERROR":[NSString stringWithFormat:errorCode]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];

        }];
    }
}

RCT_EXPORT_METHOD(unBindDeviceHS6:(nonnull NSString*)serialNumber){
    HealthUser *user = [[HealthUser alloc]init];
    if ([self getHs6WithUser:user] != nil) {
        [[self getHs6WithUser:user]cloudCommandUserDisBinedQRDeviceForUser:user withDeviceID:nil disBinedResult:^(NSArray *resultArray) {
            NSDictionary *deviceInf = @{@"user":user,@"ACTION_HS6_UNBIND":@"ACTION_HS6_UNBIND",@"HS6_UNBIND_RESULT":[NSDictionary dictionaryWithObjectsAndKeys:resultArray, nil]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];

        } disBinedError:^(NSString *errorCode) {
            NSDictionary *deviceInf = @{@"user":user,@"action":@"ACTION_HS6_ERROR",@"HS6_ERROR":[NSString stringWithFormat:errorCode]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];
        }];
    }
}

RCT_EXPORT_METHOD(getToken:(nonnull NSString*)clientId :(nonnull NSString*)clientSecret :(nonnull NSString*)username :(nonnull NSString*)clientPara){
    HealthUser *user = [[HealthUser alloc]init];
    if ([self getHs6WithUser:user] != nil) {
        [[self getHs6WithUser:user]commandHS6GetOpenAPITokenWithUser:user withSuccessBlock:^(NSDictionary *openAPIInfoDic) {
            NSDictionary *deviceInf = @{@"user":user,@"ACTION_HS6_GET_TOKEN":@"ACTION_HS6_GET_TOKEN",@"GET_TOKEN_RESULT":[NSDictionary dictionaryWithObjectsAndKeys:openAPIInfoDic, nil]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];
        } withErrorBlock:^(NSDictionary *errorCode) {
            NSDictionary *deviceInf = @{@"user":user ,@"ACTION_HS6_ERROR":@"ACTION_HS6_ERROR", @"HS6_ERROR":[NSDictionary dictionaryWithObjectsAndKeys:errorCode, nil]};
        }];
    }
}

RCT_EXPORT_METHOD(setUnit:(nonnull NSString*)username :(nonnull NSNumber*)unitType){
    HealthUser *user = [[HealthUser alloc]init];
    if ([self getHs6WithUser:user] != nil) {
        [[self getHs6WithUser:user]commandHS6WithUser:user withSyncWeightUnit:IHHS6SDKUnitWeight_lbs withSuccessBlock:^(BOOL syncWeightUnit) {
            NSDictionary *deviceInf = @{@"user":user,@"ACTION_HS6_SET_UNIT":@"ACTION_HS6_SET_UNIT",@"SET_UNIT_RESULT":[NSNumber numberWithBool:syncWeightUnit]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];
            
        } withErrorBlock:^(NSString *errorCode) {
            NSDictionary *deviceInf = @{@"user":user ,@"ACTION_HS6_ERROR":@"ACTION_HS6_ERROR",@"HS6_ERROR":[NSDictionary dictionaryWithObjectsAndKeys:errorCode, nil]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInf];
        }];
    }

}

@end
