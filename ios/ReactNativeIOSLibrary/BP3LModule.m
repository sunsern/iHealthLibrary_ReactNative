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
@implementation BP3LModule
@synthesize bridge = _bridge;
RCT_EXPORT_MODULE()

- (NSDictionary *)constantsToExport
{
    return @{
             @"Event_Notify":@"BP3L.MODULE.NOTIFY",
             
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
        [[self getDeviceWithMac:mac] commandStartMeasureWithUser:@"heds@12.com" clientID:@"2a8387e3f4e94407a3a767a72dfd52ea" clientSecret:@"fd5e845c47944a818bc511fb7edb0a77" Authentication:^(UserAuthenResult result) {
            NSLog(@"authen %d",result);
            if (result != UserAuthen_LoginSuccess) {
                [self sendErrorWithCode:result];
            }
            
        } pressure:^(NSArray *pressureArr) {
            NSLog(@"pressure %@",pressureArr);
            [self sendEventWithAction:@"ACTION_ONLINE_PRESSURE_BP" keyString:@"value" valueString:pressureArr.firstObject];
        } xiaoboWithHeart:^(NSArray *xiaoboArr) {
            NSLog(@"xiaoboWithHeart %@",xiaoboArr);
            [self sendEventWithAction:@"ACTION_ONLINE_PULSEWAVE_BP" keyString:@"value" valueString:xiaoboArr.firstObject];
        } xiaoboNoHeart:^(NSArray *xiaoboArr) {
            NSLog(@"xiaoboNoHeart %@",xiaoboArr);
            [self sendEventWithAction:@"ACTION_ONLINE_PULSEWAVE_BP" keyString:@"Action_PulseWave" valueString:xiaoboArr.firstObject];
        } result:^(NSDictionary *dic) {
            NSLog(@"result %@",dic);
            [self sendEventWithAction:@"ACTION_ONLINE_RESULT_BP" keyString:@"value" valueString:dic];
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
            
            [self sendEventWithAction:@"ACTION_INTERRUPTED_BP" keyString:@"value" valueString:@(1)];
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
            [self sendEventWithAction:@"ACTION_BATTERY_BP" keyString:@"battery" valueString:energyValue];
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
    [self sendEventWithAction:@"ACTION_ERROR_BP" keyString:@"value" valueString:@(errorCode)];
}

- (void)sendEventWithAction:(NSString*)actionName keyString:(NSString*)key valueString:(id)value{
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"BP3L.MODULE.NOTIFY"  body:@{@"action":actionName,key:value}];
}

@end
