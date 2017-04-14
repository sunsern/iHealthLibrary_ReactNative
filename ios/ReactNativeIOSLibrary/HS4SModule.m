//
//  HS4SModule.m
//  ReactNativeIOSLibrary
//
//  Created by ihealth on 16/12/2.
//  Copyright © 2016年 daiqingquan. All rights reserved.
//

#import "HS4SModule.h"
#import "HSProfileModule.h"
#import "HSMacroFile.h"
#import "HS4Controller.h"
#import "HS4.h"
#import "iHealthDeviceManagerModule.h"

#define EVENT_NOTIFY @"HS4.MODULE.NOTIFY" 

@implementation HS4SModule

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

#pragma mark-init

-(NSDictionary *)constantsToExport{
    return @{
             @"Event_Notify" :  EVENT_NOTIFY
             };
}


-(HS4 *)getHS4WithMac:(NSString *)mac{
    HS4Controller *controller = [HS4Controller shareIHHs4Controller];
    NSArray *hs4DeviceArray = [controller getAllCurrentHS4Instace];
    for (HS4 *tempHS4 in  hs4DeviceArray) {
        if ([mac isEqualToString:tempHS4.deviceID]){
            return tempHS4;
            break;
        }
    }
    return nil;
}

#pragma mark
#pragma mark - Notification
#pragma mark - HS4
-(void)DeviceConnectForHS4S:(NSNotification *)notify{
    HS4Controller *controller = [HS4Controller shareIHHs4Controller];
    NSArray *hs4DeviceArray = [controller getAllCurrentHS4Instace];
    
    HS4 *hs4Instance = [hs4DeviceArray objectAtIndex:0];
}

#pragma mark
#pragma mark - Method

RCT_EXPORT_METHOD(getOfflineData:(nonnull NSString*)mac){
    if ([self getHS4WithMac:mac] != nil) {
        
        __block NSDictionary *sigleData;
        [[self getHS4WithMac:mac]commandTransferMemorryData:^(NSDictionary *startDataDictionary) {
            sigleData=startDataDictionary;
            NSLog(@"sigledata:%@",sigleData);
        } DisposeProgress:^(NSNumber *progress) {
            
        } MemorryData:^(NSArray *historyDataArray) {
            [historyDataArray arrayByAddingObject:sigleData];
            NSDictionary *deviceInfo = @{@"mac":mac,@"action":ACTION_HISTORICAL_DATA_HS,DATAID:[sigleData valueForKey:@"dataID"],MEASUREMENT_DATE_HS:[sigleData valueForKey:@"date"],WEIGHT_HS:[sigleData valueForKey:@"weight"],HISTORDATA__HS:historyDataArray};
            
             [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            NSLog(@"historyDataArray:%@",historyDataArray);
            
        } FinishTransmission:^{
            
        } DisposeErrorBlock:^(HS4DeviceError errorID) {
            NSDictionary *deviceInfo = @{@"mac":mac,@"action":ACTION_NO_HISTORICALDATA,ACTION_ERROR_HS:[NSNumber numberWithInteger:errorID]};
            
             [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}


RCT_EXPORT_METHOD(measureOnline:(nonnull NSString*)mac :(nonnull NSNumber*)unit :(nonnull NSNumber*)userId){
    if ([self getHS4WithMac:mac] != nil) {
        HealthUser* healthUser = [[HealthUser alloc] init];
        healthUser.userID = [iHealthDeviceManagerModule autherizedUserID];
        healthUser.clientID = [iHealthDeviceManagerModule autherizedClientID];
        healthUser.clientSecret = [iHealthDeviceManagerModule autherizedClientSecret];
        [[self getHS4WithMac:mac]commandMeasureWithUint:HSUnit_Kg  Weight:^(NSNumber *unStableWeight) {
            NSDictionary *deviceInfo = @{@"mac":mac,@"action":ACTION_LIVEDATA_HS,LIVEDATA_HS:unStableWeight};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } StableWeight:^(NSDictionary *StableWeightDic) {
            NSDictionary *deviceInfo =@{@"mac":mac,@"action":ACTION_ONLINE_RESULT_HS,DATAID:[StableWeightDic valueForKey:@"dataID"],WEIGHT_HS:[StableWeightDic valueForKey:@"Weight"] };
            
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        } DisposeErrorBlock:^(HS4DeviceError errorID) {
            NSDictionary *deviceInfo = @{@"mac":mac,@"action":ACTION_ERROR_HS,ERROR_NUM_HS:[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }

}

RCT_EXPORT_METHOD(disconnect:(nonnull NSString*)mac){
    if ([self getHS4WithMac:mac] != nil){
        [[self getHS4WithMac:mac] commandDisconnectDevice];
        NSLog(@"End device connnect!");
    }
}

- (void)sendErrorWithCode:(NSInteger)errorCode{
    [self sendEventWithAction:@"ACTION_ERROR_HS" keyString:@"value" valueString:@(errorCode)];
}

- (void)sendEventWithAction:(NSString*)actionName keyString:(NSString*)key valueString:(id)value{
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"HS4.MODULE.NOTIFY"  body:@{@"action":actionName,key:value}];
}

@end
