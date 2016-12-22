//
//  BP550BTModule.m
//  ReactNativeIOSLibrary
//
//  Created by daiqingquan on 2016/11/23.
//  Copyright © 2016年 daiqingquan. All rights reserved.
//

#import "BP550BTModule.h"
#import "KN550BT.h"
#import "KN550BTController.h"
#import "BPProfileModule.h"


#define EVENT_NOTIFY @"event_notify_bp550bt"

@implementation BP550BTModule

@synthesize bridge = _bridge;
RCT_EXPORT_MODULE()

- (NSDictionary *)constantsToExport
{
    return @{
             @"Event_Notify":@"event_notify_bp550bt",
             
             };
}

#pragma mark
#pragma mark - Init
-(id)init
{
    if (self=[super init])
    {
        
//        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(DeviceConnectForKN550BT:) name:KN550BTConnectNoti object:nil];
//        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(DeviceDisConnectForKN550BT:) name:KN550BTDisConnectNoti object:nil];
        
        [KN550BTController shareKN550BTController];
        
    }
    return self;
}


-(KN550BT*)getDeviceWithMac:(NSString*)mac{
    
    KN550BTController *controller = [KN550BTController shareKN550BTController];
    NSArray *bpDeviceArray = [controller getAllCurrentKN550BTInstace];
    
    for(KN550BT *tempDevice in bpDeviceArray){
        if([mac isEqualToString:tempDevice.serialNumber]){
            
            tempDevice.reactNativeFlg = @YES;
            return tempDevice;
        }
    }
    
    return nil;
}


-(void)DeviceConnectForKN550BT:(NSNotification *)tempNoti{
    KN550BTController *controller = [KN550BTController shareKN550BTController];
    NSArray *BPDeviceArray = [controller getAllCurrentKN550BTInstace];
    
    KN550BT *bpInstance = [BPDeviceArray objectAtIndex:0];
    NSString *mac = bpInstance.currentUUID;
    NSDictionary *IDPSDic = [tempNoti userInfo];
    
    NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"kn550bt_connected_bg",@"idps":IDPSDic };
    [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
    
}

-(void)DeviceDisConnectForKN550BT:(NSNotification *)tempNoti{
    
    NSDictionary *IDPSDic = [tempNoti userInfo];
    NSString *mac = [IDPSDic objectForKey:@"SerialNumber"];
    
    NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"kn550bt_disconnected_bg",@"idps":IDPSDic};
    [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
    
}




#pragma mark - Method

RCT_EXPORT_METHOD(getFunctionInfo:(nonnull NSString *)mac){
    
    if ([self getDeviceWithMac:mac]!=nil) {
        [[self getDeviceWithMac:mac] commandFounction:^(NSDictionary *dic) {
           
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"function_info_bp",@"upAirMeasureFlg": [dic objectForKey:@"upAirMeasureFlg"],
                                         @"armMeasureFlg": [dic objectForKey:@"armMeasureFlg"],
                                         @"haveAngleSensor": [dic objectForKey:@"haveAngleSensor"],
                                         @"haveOffline": [dic objectForKey:@"haveOffline"],
                                         @"haveHSD": [dic objectForKey:@"haveHSD"],@"haveAngleSet": [dic objectForKey:@"haveAngleSet"],
                                         @"mutableUpload": [dic objectForKey:@"mutableUpload"],
                                         @"selfUpdate": [dic objectForKey: @"selfUpdate"]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } errorBlock:^(BPDeviceError error) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_bp",@"error":[NSNumber numberWithInteger:error]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        }];
    }else{
        
        NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_bp",@"error":[NSNumber numberWithInteger:BPDidDisconnect]};
        [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        
    }
    
    
}

RCT_EXPORT_METHOD(getBattery:(nonnull NSString *)mac){
    
    if ([self getDeviceWithMac:mac]!=nil) {
        [[self getDeviceWithMac:mac] commandEnergy:^(NSNumber *energyValue) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"battery_bp",@"battery":energyValue};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            NSLog(@"%@",deviceInfo);
            
        } errorBlock:^(BPDeviceError error) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_bp",@"error":[NSNumber numberWithInteger:error]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        }];
        
    }else{
        
        NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_bp",@"error":[NSNumber numberWithInteger:BPDidDisconnect]};
        [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
    }
    
    
}

RCT_EXPORT_METHOD(getOffLineNum:(nonnull NSString *)mac){
    
    if ([self getDeviceWithMac:mac]!=nil) {
        [[self getDeviceWithMac:mac]commandTransferMemorytotalCount:^(NSNumber *num) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"offlinenum",@"offlinenum":num };
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } errorBlock:^(BPDeviceError error) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_bp",@"error":[NSNumber numberWithInteger:error]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        }];
         
         }else{
             NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_bp",@"error":[NSNumber numberWithInteger:BPDidDisconnect]};
             [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
             
    }
    
    
}

RCT_EXPORT_METHOD(getOffLineData:(nonnull NSString *)mac){
    
    if ([self getDeviceWithMac:mac]!=nil) {
        [[self getDeviceWithMac:mac]commandTransferMemoryDataWithUser:@"NoUser" clientID:nil clientSecret:nil Authentication:^(UserAuthenResult result) {
            
        } totalCount:^(NSNumber *num) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"offlinenum",@"offlinenum":num };
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } pregress:^(NSNumber *pregress) {
            
        } dataArray:^(NSArray *array) {
            
            NSMutableArray * tempArr = [[NSMutableArray alloc]init];
            
            for(NSDictionary *history in array)
            {
                NSDate *tempDate = [history objectForKey:@"time"];
                
                //将时间格式转化成字符串，适配plugin和react native
                NSDateFormatter *mydateFormatter = [[NSDateFormatter alloc] init];
                [mydateFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
                NSString *dateStr = [mydateFormatter stringFromDate:tempDate];
                
                NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:dateStr,@"date",[history objectForKey:@"dia"],@"dia",[history objectForKey:@"sys"],@"sys",[history objectForKey:@"irregular"],@"arrhythmia",[history objectForKey:@"heartRate"],@"heartRate", [history objectForKey:@"dataID"],@"dataID",nil];
                
                [tempArr addObject:dic];
                
            }
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"historicaldata_bp",@"history":[NSArray arrayWithArray:tempArr] };
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } errorBlock:^(BPDeviceError error) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_bp",@"error":[NSNumber numberWithInteger:error]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        }];
        
    }else{
        
        NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_bp",@"error":[NSNumber numberWithInteger:BPDidDisconnect]};
        [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        
    }
    
    
}

RCT_EXPORT_METHOD(disconnect:(nonnull NSString *)mac){
    
    if ([self getDeviceWithMac:mac]!=nil) {
        
        [[self getDeviceWithMac:mac] commandDisconnectDevice];
        
    }else{
      
        NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_bp",@"error":[NSNumber numberWithInteger:BPDidDisconnect]};
        [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
    
    }
    
    
}


@end
