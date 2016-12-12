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
        [[self getPO3WithMac:mac] commandStartPO3MeasureData:^(BOOL startData) {
            
        } Measure:^(NSDictionary *measureDataDic) {
            
            NSDictionary* deviceInfo = @{@"action":@"ACTION_LIVEDA_PO",@"pulseWave":[measureDataDic valueForKey:@"wave"],@"dataID":[measureDataDic valueForKey:@"dataID"],@"pi":[measureDataDic valueForKey:@"PI"],@"pulsestrength":[measureDataDic valueForKey:@"bpm"],@"bloodoxygen":[measureDataDic valueForKey:@"spo2"],@"heartrate":[measureDataDic valueForKey:@"height"]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
            resultDic=[[NSMutableDictionary alloc] initWithDictionary:deviceInfo];
            
        } FinishPO3MeasureData:^(BOOL finishData) {
           
            [resultDic setValue:@"ACTION_LIVEDA_PO" forKey:POACTION];
           
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:resultDic];
            
            
        } DisposeErrorBlock:^(PO3ErrorID errorID) {
            
        }];
    }else{
        
        NSDictionary* deviceInfo = @{@"action":@"ACTION_ERROR_PO",@"error_po":@"disconnect"};
        [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        
    }
    
}

RCT_EXPORT_METHOD(getHistoryData:(nonnull NSString *)mac){
    
    
    if ([self getPO3WithMac:mac]!=nil) {
        
        [[self getPO3WithMac:mac] commandDisposePO3DataCount:^(NSNumber *dataCount) {
            
        } TransferMemorryData:^(BOOL startData) {
            
        } Memory:^(NSDictionary *historyDataDic) {
            
            NSDictionary* deviceInfo = @{
                                         POACTION:@"ACTION_OFFLINEDATA_PO",
                                         @"measureDate":[historyDataDic valueForKey:@"date"],
                                         @"dataID":[historyDataDic valueForKey:@"dataID"],
                                         @"pulseWave":[historyDataDic valueForKey:@"wave"],
                                         @"pulsestrength":[historyDataDic valueForKey:@"height"],
                                         @"bloodoxygen":[historyDataDic valueForKey:@"spo2"],
                                         @"heartrate":[historyDataDic valueForKey:@"height"]};
            
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];

            
        } DisposePO3WaveHistoryData:^(NSDictionary *waveHistoryDataDic) {
            
        } FinishTransmission:^(BOOL finishData) {
            
        } DisposeErrorBlock:^(PO3ErrorID errorID) {
            
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
