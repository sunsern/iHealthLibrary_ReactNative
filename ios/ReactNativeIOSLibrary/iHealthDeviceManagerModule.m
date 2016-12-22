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
#import "HSHeader.h"
#import "BGHeader.h"
#import "POHeader.h"
#import "IHSDKCloudUser.h"
@implementation iHealthDeviceManagerModule

@synthesize bridge = _bridge;

#define FetchUserInfo @"com.rn.ihealth.dm.userinfo"

RCT_EXPORT_MODULE()

#pragma mark
#pragma mark - Init
-(id)init
{
    if (self=[super init])
    {
        
         [ScanDeviceController commandGetInstance];
        
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDiscover:) name:AM3Discover object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnect:) name:AM3ConnectNoti object:nil];
        
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDiscover:) name:AM3SDiscover object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnect:) name:AM3SConnectNoti object:nil];
        
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDiscover:) name:AM4Discover object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnect:) name:AM4ConnectNoti object:nil];
        //BP3L
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDiscover:) name:BP3LDiscover object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnect:) name:BP3LConnectNoti object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDisconnect:) name:BP3LDisConnectNoti object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnectFailed:) name:BP3LConnectFailed object:nil];
        //BP7S
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDiscover:) name:BP7SDiscover object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnect:) name:BP7SConnectNoti object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDisconnect:) name:BP7SDisConnectNoti object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnectFailed:) name:BP7SConnectFailed object:nil];
        
        //KN-550BT
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDiscover:) name:KN550BTDiscover object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnect:) name:KN550BTConnectNoti object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDisconnect:) name:KN550BTDisConnectNoti object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnectFailed:) name:KN550BTConnectFailed object:nil];
        
        //BG5L
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDiscover:) name:BG5LDiscover object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnect:) name:BG5LConnectNoti object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDisconnect:) name:BG5LDisConnectNoti object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnectFailed:) name:BG5LConnectFailed object:nil];
        
        //BG5
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnect:) name:BG5ConnectNoti object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDisconnect:) name:BG5DisConnectNoti object:nil];
        
        //BG1
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(bg1Discover:) name:BG1ConnectNoti object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceBG1Disconnect:) name:BG1DisConnectNoti object:nil];
        
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDiscover:) name:HS4Discover object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnect:) name:HS4ConnectNoti object:nil];
        
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDiscover:) name:PO3Discover object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnect:) name:PO3ConnectNoti object:nil];
        
         [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceDiscover:) name:BP5ConnectNoti object:nil];
        
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(deviceConnect:) name:BP5ConnectNoti object:nil];
       
        [AM3Controller shareIHAM3Controller];
        [AM3SController_V2 shareIHAM3SController];
        [AM4Controller shareIHAM4Controller];
        [BP3LController shareBP3LController];
        [BG5Controller shareIHBg5Controller];
        [BG5LController shareIHBg5lController];
        
    }
    return self;
}

#pragma mark
#pragma mark - Notification
-(void)deviceDiscover:(NSNotification*)info {
    
    NSLog(@"Native: device discover %@", info);
    
    NSDictionary* userInfo = [info userInfo];
    NSString* deviceName = userInfo[@"DeviceName"];
    NSString* serialNumber = userInfo[@"SerialNumber"];
    NSString* deviceId = userInfo[@"ID"];
    if(serialNumber.length > 0){
        NSDictionary* deviceInfo = [[NSDictionary alloc]init];
        if ([userInfo[@"DeviceName"] isEqualToString:@"BG5"]) {
            deviceInfo = @{@"mac":userInfo[@"SerialNumber"],@"type":@"BG5L"};
        }
        else
        {
            deviceInfo = @{@"mac":userInfo[@"SerialNumber"],@"type":[self constantsToExport][userInfo[@"DeviceName"]]};
        }
        [self.bridge.eventDispatcher sendDeviceEventWithName:@"ScanDevice" body:deviceInfo];
    }else if (deviceId.length > 0){
        NSDictionary* deviceInfo = @{@"mac":deviceId,@"type":[self constantsToExport][deviceName]};
        [self.bridge.eventDispatcher sendDeviceEventWithName:@"ScanDevice" body:deviceInfo];
    }
    
}

-(void)bg1Discover:(NSNotification*)info {
    
    
    NSDictionary* deviceInfo = @{@"mac":@"",@"type":@"BG1"};
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"ScanDevice" body:deviceInfo];
    
}

-(void)deviceConnect:(NSNotification*)info {
    
    NSDictionary* userInfo = [info userInfo];
    NSLog(@"连接成功：%@",userInfo);
    NSDictionary* deviceInfo = [[NSDictionary alloc]init];
    if ([userInfo[@"DeviceName"] isEqualToString:@"BG5"]&&[userInfo[@"Type"] isEqual:@2])
    {
        deviceInfo = @{@"mac":userInfo[@"SerialNumber"],@"type":@"BG5L"};
    }
    else
    {
        deviceInfo = @{@"mac":userInfo[@"SerialNumber"],@"type":[self constantsToExport][userInfo[@"DeviceName"]]};
    }
    
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"DeviceConnected" body:deviceInfo];
}

-(void)deviceBG1Disconnect:(NSNotification*)info {
    
    NSDictionary* deviceInfo = @{@"mac":@"",@"type":@"BG1"};
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"DeviceDisconnect" body:deviceInfo];
}

-(void)deviceDisconnect:(NSNotification*)info {
    NSDictionary* userInfo = [info userInfo];
    
    if (userInfo[@"SerialNumber"]!=nil  && userInfo[@"DeviceName"]!=nil) {
        
        NSDictionary* deviceInfo = [[NSDictionary alloc]init];
        if ([userInfo[@"DeviceName"] isEqualToString:@"BG5"]&&[userInfo[@"Type"] isEqual:@2])
        {
            deviceInfo = @{@"mac":userInfo[@"SerialNumber"],@"type":@"BG5L"};
        }
        else
        {
            deviceInfo = @{@"mac":userInfo[@"SerialNumber"],@"type":[self constantsToExport][userInfo[@"DeviceName"]]};
        }
        [self.bridge.eventDispatcher sendDeviceEventWithName:@"DeviceDisconnect" body:deviceInfo];
    }
}

-(void)deviceConnectFailed:(NSNotification*)info {
    NSDictionary* userInfo = [info userInfo];
    if([userInfo[@"DeviceName"]!=nil && [userInfo[@"Type"]!=nil){
    
        NSDictionary* deviceInfo = [[NSDictionary alloc]init];
        if ([userInfo[@"DeviceName"] isEqualToString:@"BG5"]&&[userInfo[@"Type"] isEqual:@2])
        {
            deviceInfo = @{@"mac":userInfo[@"SerialNumber"],@"type":@"BG5L"};
        }
        else
        {
            deviceInfo = @{@"mac":userInfo[@"SerialNumber"],@"type":[self constantsToExport][userInfo[@"DeviceName"]]};
        }
        [self.bridge.eventDispatcher sendDeviceEventWithName:@"DeviceDisconnect" body:deviceInfo];
    
    }
    
}
#pragma mark
#pragma mark - constantsToExport

- (NSDictionary *)constantsToExport

{
    

    return @{
             @"AM3" : @"AM3",
             @"AM3S" :@"AM3S",
             @"AM4" :@"AM4",
             @"BP3L" :@"BP3L",
             @"BP7S" : @"BP7S",
             @"KN550" : @"KN-550BT",
             @"KN-550BT" : @"KN-550BT",
             @"HS4S" :@"HS4S",
             @"HS4" :@"HS4",
             @"BG5L": @"BG5L",
             @"PO3":@"PO3",
             @"BP5":@"BP5",
             @"BP7":@"BP7",
             @"BG1":@"BG1",
             @"BG5":@"BG5",
             @"HS6":@"HS6",
             @"Event_Scan_Device":@"ScanDevice",
             @"Event_Scan_Finish":@"ScanFinish",
             @"Event_Device_Connected":@"DeviceConnected",
             @"Event_Device_Connect_Failed":@"DeviceConnectFailed",
             @"Event_Device_Disconnect":@"DeviceDisconnect",
             @"Event_Authenticate_Result":@"Event_Authenticate_Result"
             };
};

#pragma mark
#pragma mark - Method

RCT_EXPORT_METHOD(startDiscovery:(nonnull NSString *)deviceType){
    
    
    if ([deviceType isEqualToString:@"BP5"] ||[deviceType isEqualToString:@"BG1"] ||[deviceType isEqualToString:@"BG5"] ||[deviceType isEqualToString:@"HS6"] || [deviceType isEqualToString:@"BP7"]) {
        
        if ([deviceType isEqualToString:@"BG1"]) {
            
            [[BG1Controller shareBG1Controller] initBGAudioModule];
            
        }
        
        
    }else{
        if ([deviceType isEqualToString:@"AM3"]) {
            
            [[ScanDeviceController commandGetInstance] commandScanDeviceType:HealthDeviceType_AM3];

        }else if ([deviceType isEqualToString:@"AM3S"]){
            
             [[ScanDeviceController commandGetInstance] commandScanDeviceType:HealthDeviceType_AM3S];
        }else if ([deviceType isEqualToString:@"AM4"]){
            
             [[ScanDeviceController commandGetInstance] commandScanDeviceType:HealthDeviceType_AM4];
            
        }else if ([deviceType isEqualToString:@"BP3L"]){
            
             [[ScanDeviceController commandGetInstance] commandScanDeviceType:HealthDeviceType_BP3L];
        }else if ([deviceType isEqualToString:@"BP7S"]){
            
             [[ScanDeviceController commandGetInstance] commandScanDeviceType:HealthDeviceType_BP7S];
        }else if ([deviceType isEqualToString:@"KN-550BT"]){
            
            [[ScanDeviceController commandGetInstance] commandScanDeviceType:HealthDeviceType_KN550BT];
        }else if ([deviceType isEqualToString:@"HS4S"] || [deviceType isEqualToString:@"HS4"]){
            
             [[ScanDeviceController commandGetInstance] commandScanDeviceType:HealthDeviceType_HS4];
        }else if ([deviceType isEqualToString:@"BG5L"]){
            
             [[ScanDeviceController commandGetInstance] commandScanDeviceType:HealthDeviceType_BG5L];
            
        }else if ([deviceType isEqualToString:@"PO3"]){
            
             [[ScanDeviceController commandGetInstance] commandScanDeviceType:HealthDeviceType_PO3];
            
        }else{
        
        
        
        }
        
    }
    
   
    
    
    
}


RCT_EXPORT_METHOD(stopDiscovery:(nonnull NSString *)deviceType){
    
    
    [[ScanDeviceController commandGetInstance] commandStopScanDeviceType:[deviceType intValue]];
    
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"ScanFinish" body:nil];
}

RCT_EXPORT_METHOD(connectDevice:(nonnull NSString *)mac type:(nonnull NSString *)deviceType){
    
    
    if ([deviceType isEqualToString:@"BP5"] ||[deviceType isEqualToString:@"BG1"] ||[deviceType isEqualToString:@"HS6"] || [deviceType isEqualToString:@"BP7"]) {
        
        NSMutableDictionary *idpsTempDic = [[NSMutableDictionary alloc]init];
        if ([deviceType isEqualToString:@"BG1"]) {
            
            [[BG1 shareBG1CommunicationObject]commandConnectBGwithDeviceModel:@0x00FF1304 DisposeDiscoverBlock:^(BOOL result) {
                
            } DisposeBGIDPSBlock:^(NSDictionary *idpsDic) {
                
                bg1IdpsDic = [NSDictionary dictionaryWithDictionary:idpsDic];
                
                
                
            } DisposeConnectBGBlock:^(BOOL result) {
                
                NSString *bg1Mac = @"";
                if (bg1IdpsDic[@"SerialNumber"] != nil) {
                    bg1Mac = bg1IdpsDic[@"SerialNumber"];
                }
                NSDictionary* deviceInfo = @{@"mac":bg1Mac,@"type":@"BG1"};
                [self.bridge.eventDispatcher sendDeviceEventWithName:@"DeviceConnected" body:deviceInfo];
                
            } DisposeBGErrorBlock:^(NSNumber *errorID) {
               
                NSDictionary* deviceInfo = @{@"mac":@"",@"action":@"action_measure_error_for_bg1",@"action_measure_error_for_bg1":errorID};
                [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
                
            }];
        }
        
    }else{
        if ([deviceType isEqualToString:@"AM3"]) {
            
            [[ConnectDeviceController commandGetInstance] commandContectDeviceWithDeviceType:HealthDeviceType_AM3 andSerialNub:mac];
            
        }else if ([deviceType isEqualToString:@"AM3S"]){
            
            [[ConnectDeviceController commandGetInstance] commandContectDeviceWithDeviceType:HealthDeviceType_AM3S andSerialNub:mac];
        }else if ([deviceType isEqualToString:@"AM4"]){
            
             [[ConnectDeviceController commandGetInstance] commandContectDeviceWithDeviceType:HealthDeviceType_AM4 andSerialNub:mac];
            
        }else if ([deviceType isEqualToString:@"BP3L"]){
            
            [[ConnectDeviceController commandGetInstance] commandContectDeviceWithDeviceType:HealthDeviceType_BP3L andSerialNub:mac];
        }else if ([deviceType isEqualToString:@"BP7S"]){
            
             [[ConnectDeviceController commandGetInstance] commandContectDeviceWithDeviceType:HealthDeviceType_BP7S andSerialNub:mac];
        }else if ([deviceType isEqualToString:@"KN-550BT"]){
            
            [[ConnectDeviceController commandGetInstance] commandContectDeviceWithDeviceType:HealthDeviceType_KN550BT andSerialNub:mac];
        }else if ([deviceType isEqualToString:@"HS4S"] || [deviceType isEqualToString:@"HS4"]){
            
             [[ConnectDeviceController commandGetInstance] commandContectDeviceWithDeviceType:HealthDeviceType_HS4 andSerialNub:mac];
        }else if ([deviceType isEqualToString:@"BG5L"]){
            
            [[ConnectDeviceController commandGetInstance] commandContectDeviceWithDeviceType:HealthDeviceType_BG5L andSerialNub:mac];
            
        }else if ([deviceType isEqualToString:@"PO3"]){
            
             [[ConnectDeviceController commandGetInstance] commandContectDeviceWithDeviceType:HealthDeviceType_PO3 andSerialNub:mac];
            
        }else{
            
            
            
        }
        
    }
    
}


RCT_EXPORT_METHOD(getDevicesIDPS:(nonnull NSString *)mac){
    
    
    [[ScanDeviceController commandGetInstance] commandScanDeviceType:mac];
    
    
    
}

RCT_EXPORT_METHOD(authenConfigureInfo:(NSString *)userID clientID:(NSString *)clientID clientSecret:(NSString *)clientSecret){
    
    HealthUser *currentUser = [[HealthUser alloc]init];
    currentUser.userID = userID;
    currentUser.clientID = clientID;
    currentUser.clientSecret = clientSecret;
    [[IHSDKCloudUser commandGetSDKUserInstance] commandSDKUserLogin:currentUser UserValidationSuccess:^(UserAuthenResult result) {
        [self authenResult:result userID:userID clientID:clientID clientSecret:clientSecret];
    } UserValidationReturn:^(NSString *userID) {
        
    } DisposeErrorBlock:^(UserAuthenResult errorID) {
        if (errorID == UserAuthen_UserInvalidateRight) {
            [self authenResult:UserAuthen_LoginSuccess userID:userID clientID:clientID clientSecret:clientSecret];
        }else{
            [self authenResult:errorID userID:userID clientID:clientID clientSecret:clientSecret];
        }
        
    }];
}

- (void)authenResult:(UserAuthenResult)result userID:(NSString*)userID clientID:(NSString*)clientID clientSecret:(NSString*)clientSecret{
    if (result <= UserAuthen_TrySuccess) {
        NSArray* userInfo = @[userID,clientID,clientSecret];
        [[NSUserDefaults standardUserDefaults] setObject:userInfo forKey:FetchUserInfo];
    }else{
        [[NSUserDefaults standardUserDefaults] removeObjectForKey:FetchUserInfo];
    }
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"Event_Authenticate_Result" body:@{@"authen":@(result)}];
}

+ (NSArray*)userInfos{
    NSArray* userInfos = [[NSUserDefaults standardUserDefaults] objectForKey:FetchUserInfo];
    if (userInfos.count == 3) {
        return userInfos;
    }else{
        return nil;
    }
}

+ (NSString*)autherizedUserID{
    return [[self userInfos] objectAtIndex:0];
}

+ (NSString*)autherizedClientID{
    return [[self userInfos] objectAtIndex:1];
}

+ (NSString*)autherizedClientSecret{
    return [[self userInfos] objectAtIndex:2];
}


@end
