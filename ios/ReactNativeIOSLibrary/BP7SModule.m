//
//  BP7SModule.m
//  ReactNativeIOSLibrary
//
//  Created by Liu Yanbo on 2016/12/05.
//  Copyright © 2016年 Liu Yanbo. All rights reserved.
//

#import "BP7SModule.h"
#import "BPProfileModule.h"
#import "BPMacroFile.h"
#import "BP7SController.h"
#import "BP7S.h"
@implementation BP7SModule
@synthesize bridge = _bridge;
RCT_EXPORT_MODULE()

- (NSDictionary *)constantsToExport
{
    return @{
             @"Event_Notify":@"BP7S.MODULE.NOTIFY",
             
             };
}


-(BP7S*)getDeviceWithMac:(NSString*)mac{
    
    BP7SController *controller = [BP7SController shareBP7SController];
    NSArray *bpDeviceArray = [controller getAllCurrentBP7SInstace];
    
    for(BP7S *tempDevice in bpDeviceArray){
        if([mac isEqualToString:tempDevice.serialNumber]){
            
            return tempDevice;
        }
    }
    
    return nil;
}


#pragma mark - Method

RCT_EXPORT_METHOD(getFunctionInfo:(nonnull NSString *)mac){
    
    if ([self getDeviceWithMac:mac]!=nil) {
        [[self getDeviceWithMac:mac] commandFounction:^(NSDictionary *dic) {
            [self sendEventWithAction:@"ACTION_FUNCTION_INFORMATION_BP" keyString:@"function" valueString:dic];
        } errorBlock:^(BPDeviceError error) {
            [self sendErrorWithCode:error];
        }];
    }else{
        NSLog(@"error %d",BPDidDisconnect);
        [self sendErrorWithCode:BPDidDisconnect];
    }
    
    
}

//getOffLineNum
RCT_EXPORT_METHOD(getOffLineNum:(nonnull NSString *)mac){
    
    if ([self getDeviceWithMac:mac]!=nil) {
        [[self getDeviceWithMac:mac] commandTransferMemorytotalCount:^(NSNumber *num) {
            [self sendEventWithAction:@"ACTION_HISTORICAL_NUM_BP" keyString:@"count" valueString:num];
        } errorBlock:^(BPDeviceError error) {
            [self sendErrorWithCode:error];
        }];
    }else{
        NSLog(@"error %d",BPDidDisconnect);
        [self sendErrorWithCode:BPDidDisconnect];
    }
    
    
}

//getOffLineData
RCT_EXPORT_METHOD(getOffLineData:(nonnull NSString *)mac){
    
    if ([self getDeviceWithMac:mac]!=nil) {
        [[self getDeviceWithMac:mac] commandTransferMemoryDataWithUser:@"heds@12.com" clientID:@"2a8387e3f4e94407a3a767a72dfd52ea" clientSecret:@"fd5e845c47944a818bc511fb7edb0a77" Authentication:^(UserAuthenResult result) {
            NSLog(@"authen %d",result);
            if (result != UserAuthen_LoginSuccess) {
                [self sendErrorWithCode:result];
            }
        } totalCount:^(NSNumber *num) {
            [self sendEventWithAction:@"ACTION_HISTORICAL_NUM_BP" keyString:@"value" valueString:num];
        } pregress:^(NSNumber *pregress) {
            NSLog(@"pressure %@",pregress);
            [self sendEventWithAction:@"ACTION_ONLINE_PRESSURE_BP" keyString:@"value" valueString:pregress];
        } dataArray:^(NSArray *array) {
            NSLog(@"dataArray %@",array);
            [self sendEventWithAction:@"ACTION_HISTORICAL_DATA_BP" keyString:@"value" valueString:array];
        } errorBlock:^(BPDeviceError error) {
            NSLog(@"error %d",error);
            [self sendErrorWithCode:error];
        }];
    }else{
        NSLog(@"error %d",BPDidDisconnect);
        [self sendErrorWithCode:BPDidDisconnect];
    }
    
    
}
//getBattery
RCT_EXPORT_METHOD(getBattery:(nonnull NSString *)mac){
    
    if ([self getDeviceWithMac:mac]!=nil) {
        [[self getDeviceWithMac:mac] commandEnergy:^(NSNumber *energyValue) {
            NSLog(@"energyValue %@",energyValue);
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
//setUnit
RCT_EXPORT_METHOD(setUnit:(nonnull NSString *)mac unit:(NSString*)unit){
    
    if ([self getDeviceWithMac:mac]!=nil) {
        [[self getDeviceWithMac:mac] commandSetUnit:unit errorBlock:^(BPDeviceError error) {
            NSLog(@"error %d",error);
            [self sendErrorWithCode:error];
        }];
    }else{
        NSLog(@"error %d",BPDidDisconnect);
        [self sendErrorWithCode:BPDidDisconnect];
    }
    
    
}
//angleSet
RCT_EXPORT_METHOD(angleSet:(nonnull NSString *)mac hl:(NSNumber*)hl ll:(NSNumber*)ll hr:(NSNumber*)hr lr:(NSNumber*)lr){
    
    if ([self getDeviceWithMac:mac]!=nil) {
        NSDictionary* dict = @{@"highAngleForLeft":hl, @"lowAngleForLeft":ll, @"highAngleForRight":hr, @"lowAngleForRight":lr};
        [[self getDeviceWithMac:mac] commandSetAngle:dict errorBlock:^(BPDeviceError error) {
            NSLog(@"error %d",error);
            [self sendErrorWithCode:error];
        }];
    }else{
        NSLog(@"error %d",BPDidDisconnect);
        [self sendErrorWithCode:BPDidDisconnect];
    }
    
    
}


- (void)sendErrorWithCode:(NSInteger)errorCode{
    [self sendEventWithAction:@"ACTION_ERROR_BP" keyString:@"value" valueString:@(errorCode)];
}

- (void)sendEventWithAction:(NSString*)actionName keyString:(NSString*)key valueString:(id)value{
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"BP7S.MODULE.NOTIFY"  body:@{@"action":actionName,key:value}];
}




@end
