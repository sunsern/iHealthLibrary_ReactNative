//
//  BP3LModule.m
//  ReactNativeIOSLibrary
//
//  Created by daiqingquan on 2016/11/23.
//  Copyright © 2016年 daiqingquan. All rights reserved.
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
    return @{};
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
            
        } pressure:^(NSArray *pressureArr) {
            
        } xiaoboWithHeart:^(NSArray *xiaoboArr) {
            
        } xiaoboNoHeart:^(NSArray *xiaoboArr) {
            
        } result:^(NSDictionary *dic) {
            
        } errorBlock:^(BPDeviceError error) {
            
        }];
    }else{

    }
    
    
}

RCT_EXPORT_METHOD(stopMeasure:(nonnull NSString *)mac){
    
    if ([self getDeviceWithMac:mac]!=nil) {
        [[self getDeviceWithMac:mac] stopBPMeassureErrorBlock:^{
            
        } errorBlock:^(BPDeviceError error) {
            
        }];
    }else{
        
    }
    
    
}

RCT_EXPORT_METHOD(getBattery:(nonnull NSString *)mac){
    
    if ([self getDeviceWithMac:mac]!=nil) {
        [[self getDeviceWithMac:mac] commandEnergy:^(NSNumber *energyValue) {
            
        } errorBlock:^(BPDeviceError error) {
            
        }];
    }else{
        
    }
    
    
}

RCT_EXPORT_METHOD(disconnect:(nonnull NSString *)mac){
    
    if ([self getDeviceWithMac:mac]!=nil) {
        [[self getDeviceWithMac:mac] commandDisconnectDevice];
    }else{
        
    }
    
    
}

@end
