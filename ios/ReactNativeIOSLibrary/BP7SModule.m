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

- (void)sendErrorWithCode:(NSInteger)errorCode{
    [self sendEventWithAction:@"ACTION_ERROR_BP" keyString:@"value" valueString:@(errorCode)];
}

- (void)sendEventWithAction:(NSString*)actionName keyString:(NSString*)key valueString:(id)value{
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"BP7S.MODULE.NOTIFY"  body:@{@"action":actionName,key:value}];
}

@end
