//
//  PO3Module.m
//  ReactNativeIOSLibrary
//
//  Created by daiqingquan on 2016/12/4.
//  Copyright © 2016年 daiqingquan. All rights reserved.
//

#import "PO3Module.h"
#import "PO3.h"
#import "PO3Controller.h"
#import "POProfileModule.h"

@implementation PO3Module{


    NSMutableDictionary*resultDic;

}

#define EVENT_NOTIFY @"event_notify_po3"

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()


#pragma mark
#pragma mark - constantsToExport
- (NSDictionary *)constantsToExport
{
    return @{ @"Event_Notify": EVENT_NOTIFY };
    
}


#pragma mark
#pragma mark - Init
-(id)init
{
    if (self=[super init])
    {
        
        
    }
    return self;
}

-(PO3*)getPO3WithMac:(NSString*)mac{
    
    PO3Controller *controller = [PO3Controller shareIHPO3Controller];
    NSArray *poDeviceArray = [controller getAllCurrentPO3Instace];
    
    for(PO3 *tempPO3 in poDeviceArray){
        if([mac isEqualToString:tempPO3.serialNumber]){
            
            return tempPO3;
            break;
        }
    }
    
    return nil;
}

#pragma mark
#pragma mark - Method

RCT_EXPORT_METHOD(getBattery:(nonnull NSString *)mac){
    
    if ([self getPO3WithMac:mac]!=nil) {
        [[self getPO3WithMac:mac] commandPO3GetDeviceBattery:^(NSNumber *battery) {
            
            NSDictionary* deviceInfo = @{POACTION:@"ACTION_BATTERY_PO",PO_BATTERY:battery};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(PO3ErrorID errorID) {
            
        }];
    }else{
        
        NSDictionary* deviceInfo = @{POACTION:@"ACTION_ERROR_PO",@"error_po":@"disconnect"};
        [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        
    }
    
    
}


RCT_EXPORT_METHOD(startMeasure:(nonnull NSString *)mac){
    
    
    if ([self getPO3WithMac:mac]!=nil) {
        
        [[self getPO3WithMac:mac] commandPO3StartMeasure:^(BOOL resetSuc) {
            
        } withMeasureData:^(NSDictionary *measureDataDic) {
            
            NSDictionary* deviceInfo = @{@"action":@"ACTION_LIVEDA_PO",@"pulseWave":[measureDataDic valueForKey:@"wave"],@"dataID":[measureDataDic valueForKey:@"dataID"],@"pi":[measureDataDic valueForKey:@"PI"],@"pulsestrength":[measureDataDic valueForKey:@"bpm"],@"bloodoxygen":[measureDataDic valueForKey:@"spo2"],@"heartrate":[measureDataDic valueForKey:@"height"]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
            resultDic=[[NSMutableDictionary alloc] initWithDictionary:deviceInfo];
            
        } withFinishMeasure:^(BOOL finishData) {
            
            [resultDic setValue:@"ACTION_LIVEDA_PO" forKey:POACTION];
            
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:resultDic];
            
        } withErrorBlock:^(PO3ErrorID errorID) {
            
        }];
        
    }else{
        
        NSDictionary* deviceInfo = @{@"action":@"ACTION_ERROR_PO",@"error_po":@"disconnect"};
        [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        
    }
    
}

RCT_EXPORT_METHOD(getHistoryData:(nonnull NSString *)mac){
    
    
    if ([self getPO3WithMac:mac]!=nil) {
        
        [[self getPO3WithMac:mac] commandPO3OfflineDataCount:^(NSNumber *dataCount) {
            
        } withStartUpload:^(BOOL resetSuc) {
            
        } withOfflineData:^(NSDictionary *OfflineData) {
            NSDictionary* deviceInfo = @{
                                         POACTION:@"ACTION_OFFLINEDATA_PO",
                                         @"measureDate":[OfflineData valueForKey:@"date"],
                                         @"dataID":[OfflineData valueForKey:@"dataID"],
                                         @"pulseWave":[OfflineData valueForKey:@"wave"],
                                         @"pulsestrength":[OfflineData valueForKey:@"height"],
                                         @"bloodoxygen":[OfflineData valueForKey:@"spo2"],
                                         @"heartrate":[OfflineData valueForKey:@"height"]};
            
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];

        } withOfflineWaveData:^(NSDictionary *offlineWaveDataDic) {
            
        } withFinishMeasure:^(BOOL resetSuc) {
            
        } withErrorBlock:^(PO3ErrorID errorID) {
            
        }];
        
    }else{
        
        
        
    }
    
    
    
    
}


RCT_EXPORT_METHOD(disconnect:(nonnull NSString *)mac){
    
    
    if ([self getPO3WithMac:mac]!=nil) {
        
        [[self getPO3WithMac:mac] commandPO3Disconnect:^(BOOL resetSuc) {
            
        } withErrorBlock:^(PO3ErrorID errorID) {
            
        }];
        
    }else{
        
        
        
    }

    
    
}




@end
