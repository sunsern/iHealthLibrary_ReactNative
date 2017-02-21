//
//  BP3LModule.m
//  ReactNativeIOSLibrary
//
//  Created by Liu Yanbo on 2016/12/05.
//  Copyright © 2016年 Liu Yanbo. All rights reserved.
//

#import "BP3LModule.h"
#import "BPProfileModule.h"
#import "BPMacroFile.h"
#import "BP3LController.h"
#import "BP3L.h"
#import "iHealthDeviceManagerModule.h"
#define EVENT_NOTIFY @"BP3L.MODULE.NOTIFY"

@implementation BP3LModule
@synthesize bridge = _bridge;
RCT_EXPORT_MODULE()

- (NSDictionary *)constantsToExport
{
    return @{
             @"Event_Notify":EVENT_NOTIFY,
             
             };
}


-(BP3L*)getDeviceWithMac:(NSString*)mac{
    
    BP3LController *controller = [BP3LController shareBP3LController];
    NSArray *bpDeviceArray = [controller getAllCurrentBP3LInstace];
    
    for(BP3L *tempDevice in bpDeviceArray){
        if([mac isEqualToString:tempDevice.serialNumber]){
            
            return tempDevice;
        }
    }
    
    return nil;
}


#pragma mark - Method


RCT_EXPORT_METHOD(startMeasure:(nonnull NSString *)mac){
    
    if ([self getDeviceWithMac:mac]!=nil) {
        [[self getDeviceWithMac:mac] commandStartMeasureWithUser:[iHealthDeviceManagerModule autherizedUserID] clientID:[iHealthDeviceManagerModule autherizedClientID] clientSecret:[iHealthDeviceManagerModule autherizedClientSecret] Authentication:^(UserAuthenResult result) {
            NSLog(@"authen %d",result);
            if (result != UserAuthen_LoginSuccess) {
                [self sendErrorWithCode:result];
            }
            
        } pressure:^(NSArray *pressureArr) {
            NSLog(@"pressure %@",pressureArr);
            NSDictionary* response = @{
                                       kACTION:kACTION_ONLINE_PRESSURE_BP,
                                       kBLOOD_PRESSURE_BP:pressureArr.firstObject,
                                       };
            [self sendEventWithDict:response];
        } xiaoboWithHeart:^(NSArray *xiaoboArr) {
            NSLog(@"xiaoboWithHeart %@",xiaoboArr);
            NSDictionary* response = @{
                                       kACTION:kACTION_ONLINE_PULSEWAVE_BP,
                                       kBLOOD_PRESSURE_BP:xiaoboArr.firstObject,
                                       kFLAG_HEARTBEAT_BP:@(1),
                                       kPULSEWAVE_BP:xiaoboArr
                                       };
            [self sendEventWithDict:response];
        } xiaoboNoHeart:^(NSArray *xiaoboArr) {
            NSLog(@"xiaoboNoHeart %@",xiaoboArr);
            NSDictionary* response = @{
                                       kACTION:kACTION_ONLINE_PULSEWAVE_BP,
                                       kBLOOD_PRESSURE_BP:xiaoboArr.firstObject,
                                       kFLAG_HEARTBEAT_BP:@(0),
                                       kPULSEWAVE_BP:xiaoboArr
                                       };
            [self sendEventWithDict:response];
        } result:^(NSDictionary *dic) {
            NSLog(@"result %@",dic);
            NSDictionary* response = @{
                                       kACTION:kACTION_ONLINE_RESULT_BP,
                                       kHIGH_BLOOD_PRESSURE_BP:dic[@"sys"],
                                       kLOW_BLOOD_PRESSURE_BP:dic[@"dia"],
                                       kPULSE_BP:dic[@"heartRate"],
                                       kMEASUREMENT_AHR_BP:dic[@"irregular"],
                                       kDATAID:dic[@"dataID"],
                                       };
            [self sendEventWithDict:response];
        } errorBlock:^(BPDeviceError error) {
            NSLog(@"error %d",error);
            [self sendErrorWithCode:error];
        }];
    }else{
        NSLog(@"error %d",BPDidDisconnect);
        [self sendErrorWithCode:BPDidDisconnect];
    }
    
    
}

RCT_EXPORT_METHOD(stopMeasure:(nonnull NSString *)mac){
    
    if ([self getDeviceWithMac:mac]!=nil) {
        [[self getDeviceWithMac:mac] stopBPMeassureErrorBlock:^{
            
            NSDictionary* response = @{
                                       kACTION:kACTION_INTERRUPTED_BP,
                                       };
            [self sendEventWithDict:response];
        } errorBlock:^(BPDeviceError error) {
            NSLog(@"error %d",error);
            [self sendErrorWithCode:error];
        }];
    }else{
        NSLog(@"error %d",BPDidDisconnect);
        [self sendErrorWithCode:BPDidDisconnect];
    }
    
    
}

RCT_EXPORT_METHOD(getBattery:(nonnull NSString *)mac){
    
    if ([self getDeviceWithMac:mac]!=nil) {
        [[self getDeviceWithMac:mac] commandEnergy:^(NSNumber *energyValue) {
            NSDictionary* response = @{
                                       kACTION:kACTION_BATTERY_BP,
                                       kBATTERY_BP:energyValue
                                       };
            [self sendEventWithDict:response];
        } errorBlock:^(BPDeviceError error) {
            NSLog(@"error %d",error);
            [self sendErrorWithCode:error];
        }];
    }else{
        NSLog(@"error %d",BPDidDisconnect);
        [self sendErrorWithCode:BPDidDisconnect];
    }
    
    
}

RCT_EXPORT_METHOD(disconnect:(nonnull NSString *)mac){
    
    if ([self getDeviceWithMac:mac]!=nil) {
        [[self getDeviceWithMac:mac] commandDisconnectDevice];
    }else{
        NSLog(@"error %d",BPDidDisconnect);
        [self sendErrorWithCode:BPDidDisconnect];
    }
    
    
}

- (void)sendErrorWithCode:(NSInteger)errorCode{
    [self sendEventWithDict:@{kACTION:kACTION_ERROR_BP,kERROR_NUM_BP:@(errorCode)}];
}

- (void)sendEventWithDict:(NSDictionary*)dict{
    [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:dict];
}

@end
