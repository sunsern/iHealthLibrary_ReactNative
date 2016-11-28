//
//  iHealthDeviceManagerModule.m
//  ReactNativeIOSLibrary
//
//  Created by daiqingquan on 2016/11/23.
//  Copyright © 2016年 daiqingquan. All rights reserved.
//

#import "iHealthDeviceManagerModule.h"
#import "AMHeader.h"
@implementation iHealthDeviceManagerModule

@synthesize bridge = _bridge;



RCT_EXPORT_MODULE()

#pragma mark
#pragma mark - Init
-(id)init
{
    if (self=[super init])
    {
        
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceAM3SDiscover:) name:AM3SDiscover object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnectForAM3S:) name:AM3SConnectNoti object:nil];
        
        [AM3SController shareIHAM3SController];
        
        [ScanDeviceController commandGetInstance];
    }
    return self;
}

#pragma mark
#pragma mark - Notification
-(void)deviceAM3SDiscover:(NSNotification*)info {
    
    [self.bridge.eventDispatcher sendAppEventWithName:@"ScanDevice" body:[info userInfo]];
    
}
#pragma mark
#pragma mark - constantsToExport

- (NSDictionary *)constantsToExport
{
    return @{
             @"AM3" : [NSNumber numberWithInt:HealthDeviceType_AM3],
             @"AM3S" : [NSNumber numberWithInt:HealthDeviceType_AM3S],
             @"AM4" : [NSNumber numberWithInt:HealthDeviceType_AM4],
             @"BP3L" : [NSNumber numberWithInt:HealthDeviceType_BP3L],
             @"BP7S" : [NSNumber numberWithInt:HealthDeviceType_BP7S],
             @"KN550" : [NSNumber numberWithInt:HealthDeviceType_KN550BT],
             @"HS4S" : [NSNumber numberWithInt:HealthDeviceType_HS4],
             @"BG5L" : [NSNumber numberWithInt:HealthDeviceType_BG5L],
             @"PO3" : [NSNumber numberWithInt:HealthDeviceType_PO3],
             @"BP5":@"BP5",
             @"BG1":@"BG1",
             @"BG5":@"BG5",
             @"HS6":@"BG5",
             @"ScanDevice":@"ScanDevice",
             @"ScanFinish":@"ScanFinish",
              @"DeviceConnected":@"DeviceConnected",
              @"DeviceConnectFailed":@"DeviceConnectFailed",
              @"DeviceDisconnect":@"DeviceDisconnect"
             
             };
};

#pragma mark
#pragma mark - Method

RCT_EXPORT_METHOD(startDiscovery:(nonnull NSNumber *)deviceType){
    
    
    [[ScanDeviceController commandGetInstance] commandScanDeviceType:[deviceType intValue]];
    

    
}


RCT_EXPORT_METHOD(stopDiscovery:(nonnull NSNumber *)deviceType){
    
    
    [[ScanDeviceController commandGetInstance] commandStopScanDeviceType:[deviceType intValue]];
    
    
     [self.bridge.eventDispatcher sendAppEventWithName:@"ScanFinish" body:nil];
}

RCT_EXPORT_METHOD(connectDevice:(nonnull NSString *)mac type:(nonnull NSNumber *)deviceType){
    
    
    [[ConnectDeviceController commandGetInstance] commandContectDeviceWithDeviceType:[deviceType intValue] andSerialNub:mac];
    
    
    
}


RCT_EXPORT_METHOD(getDevicesIDPS:(nonnull NSString *)mac){
    
    
    [[ScanDeviceController commandGetInstance] commandScanDeviceType:mac];
    
    
    
}



@end
