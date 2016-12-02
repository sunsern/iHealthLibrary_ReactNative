//
//  iHealthDeviceManagerModule.m
//  ReactNativeIOSLibrary
//
//  Created by daiqingquan on 2016/11/23.
//  Copyright © 2016年 daiqingquan. All rights reserved.
//

#import "iHealthDeviceManagerModule.h"
#import "AMHeader.h"
#import "BPHeader.h"
@implementation iHealthDeviceManagerModule

@synthesize bridge = _bridge;



RCT_EXPORT_MODULE()

#pragma mark
#pragma mark - Init
-(id)init
{
    if (self=[super init])
    {
        
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDiscover:) name:AM3SDiscover object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnect:) name:AM3SConnectNoti object:nil];
        
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDiscover:) name:BP3LDiscover object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnect:) name:BP3LConnectNoti object:nil];
        
        [AM3SController shareIHAM3SController];
        [BP3LController shareBP3LController];
        
        [ScanDeviceController commandGetInstance];
        
    }
    return self;
}

#pragma mark
#pragma mark - Notification
-(void)deviceDiscover:(NSNotification*)info {
    
    NSLog(@"Native: device discover %@", info);
    //    [self.bridge.eventDispatcher sendAppEventWithName:@"ScanDevice" body:[info userInfo]];
    NSDictionary* userInfo = [info userInfo];
    NSDictionary* deviceInfo = @{@"mac":userInfo[@"SerialNumber"],@"type":[self constantsToExport][userInfo[@"DeviceName"]]};
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"ScanDevice" body:deviceInfo];
    
}
-(void)deviceConnect:(NSNotification*)info {
    //    [self.bridge.eventDispatcher sendAppEventWithName:@"DeviceConnected" body:[info userInfo]];
    NSDictionary* userInfo = [info userInfo];
    NSDictionary* deviceInfo = @{@"mac":userInfo[@"SerialNumber"],@"type":[self constantsToExport][userInfo[@"DeviceName"]]};
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"DeviceConnected" body:deviceInfo];
}
#pragma mark
#pragma mark - constantsToExport

- (NSDictionary *)constantsToExport

{
    
    BP3* bp3 = [[BP3LController shareBP3LController] getAllCurrentBP3LInstace].firstObject;
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
             @"HS6":@"HS6",
             @"Event_Scan_Device":@"ScanDevice",
             @"Event_Scan_Finish":@"ScanFinish",
             @"Event_Device_Connected":@"DeviceConnected",
             @"Event_Device_Connect_Failed":@"DeviceConnectFailed",
             @"Event_Device_Disconnect":@"DeviceDisconnect"
             
             };
};

#pragma mark
#pragma mark - Method

RCT_EXPORT_METHOD(startDiscovery:(nonnull NSNumber *)deviceType){
    
    
    [[ScanDeviceController commandGetInstance] commandScanDeviceType:[deviceType intValue]];
    
    
    
}


RCT_EXPORT_METHOD(stopDiscovery:(nonnull NSNumber *)deviceType){
    
    
    [[ScanDeviceController commandGetInstance] commandStopScanDeviceType:[deviceType intValue]];
    
    
    //     [self.bridge.eventDispatcher sendAppEventWithName:@"ScanFinish" body:nil];
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"ScanFinish" body:nil];
}

RCT_EXPORT_METHOD(connectDevice:(nonnull NSString *)mac type:(nonnull NSNumber *)deviceType){
    
    
    [[ConnectDeviceController commandGetInstance] commandContectDeviceWithDeviceType:[deviceType intValue] andSerialNub:mac];
    
    
    
}


RCT_EXPORT_METHOD(getDevicesIDPS:(nonnull NSString *)mac){
    
    
    [[ScanDeviceController commandGetInstance] commandScanDeviceType:mac];
    
    
    
}



@end
