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
@implementation PO3Module


RCT_EXPORT_MODULE()


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
        if([mac isEqualToString:tempPO3.currentUUID]){
            
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
            
//            NSDictionary* deviceInfo = @{@"battery":battery,@"type":[self constantsToExport][userInfo[@"DeviceName"]]};
//            [self.bridge.eventDispatcher sendDeviceEventWithName:@"ScanDevice" body:deviceInfo];
            
        } withErrorBlock:^(PO3ErrorID errorID) {
            
        }];
    }else{
        
        
        
    }
    
    
}


RCT_EXPORT_METHOD(startMeasure:(nonnull NSString *)mac){
    
    
    if ([self getPO3WithMac:mac]!=nil) {
        [[self getPO3WithMac:mac] commandStartPO3MeasureData:^(BOOL startData) {
            
        } Measure:^(NSDictionary *measureDataDic) {
            
        } FinishPO3MeasureData:^(BOOL finishData) {
            
        } DisposeErrorBlock:^(PO3ErrorID errorID) {
            
        }];
    }else{
        
        
        
    }
    
}

RCT_EXPORT_METHOD(getHistoryData:(nonnull NSString *)mac){
    
    
    if ([self getPO3WithMac:mac]!=nil) {
        
        [[self getPO3WithMac:mac] commandDisposePO3DataCount:^(NSNumber *dataCount) {
            
        } TransferMemorryData:^(BOOL startData) {
            
        } Memory:^(NSDictionary *historyDataDic) {
            
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
