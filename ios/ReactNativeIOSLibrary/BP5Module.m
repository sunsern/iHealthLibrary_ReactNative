//
//  BP5Module.m
//  ReactNativeIOSLibrary
//
//  Created by daiqingquan on 2016/11/23.
//  Copyright © 2016年 daiqingquan. All rights reserved.
//

#import "BP5Module.h"
#import "BPProfileModule.h"
#import "BP5Module.h"
#import "BPMacroFile.h"
#import "BP5Controller.h"
#import "BP5.h"
#import "iHealthDeviceManagerModule.h"
@implementation BP5Module


RCT_EXPORT_MODULE()


#pragma mark
#pragma mark - Init
-(id)init
{
    if (self=[super init])
    {
        
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(DeviceConnectForBP5:) name:BP5ConnectNoti object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(DeviceDisConnectForBP5:) name:BP5DisConnectNoti object:nil];
        
        [BP5Controller shareBP5Controller];
        
    }
    return self;
}

-(BP5*)getBP5WithMac:(NSString*)mac{

    BP5Controller *controller = [BP5Controller shareBP5Controller];
    NSArray *bpDeviceArray = [controller getAllCurrentBP5Instace];
    
    for(BP5 *tempBP5 in bpDeviceArray){
        if([mac isEqualToString:tempBP5.currentUUID]){
           
            return tempBP5;
            break;
        }
    }

    return nil;
}

#pragma mark
#pragma mark - Notification
#pragma mark - BP5
-(void)DeviceConnectForBP5:(NSNotification *)tempNoti{
    BP5Controller *controller = [BP5Controller shareBP5Controller];
    NSArray *bpDeviceArray = [controller getAllCurrentBP5Instace];
   
    BP5 *bpInstance = [bpDeviceArray objectAtIndex:0];
      
}




#pragma mark
#pragma mark - Method

RCT_EXPORT_METHOD(startMeasure:(nonnull NSString *)mac){
    
    if ([self getBP5WithMac:mac]!=nil) {
        [[self getBP5WithMac:mac] commandStartMeasureWithUser:[iHealthDeviceManagerModule autherizedUserID] clientID:[iHealthDeviceManagerModule autherizedClientID] clientSecret:[iHealthDeviceManagerModule autherizedClientSecret] Authentication:^(UserAuthenResult result) {
            
        } pressure:^(NSArray *pressureArr) {
            
        } xiaoboWithHeart:^(NSArray *xiaoboArr) {
            
        } xiaoboNoHeart:^(NSArray *xiaoboArr) {
            
        } result:^(NSDictionary *dic) {
            
        } errorBlock:^(BPDeviceError error) {
            
        }];
    }else{
    
    
    
    }
    
    
}


RCT_EXPORT_METHOD(stopMeasure:(nonnull NSString *)mac){
    
    
    if ([self getBP5WithMac:mac]!=nil) {
        [[self getBP5WithMac:mac] stopBPMeassureErrorBlock:^{
            
        } errorBlock:^(BPDeviceError error) {
            
        }];
    }else{
        
        
        
    }

}

RCT_EXPORT_METHOD(getBattery:(nonnull NSString *)mac){
    
    
    if ([self getBP5WithMac:mac]!=nil) {
        
        [[self getBP5WithMac:mac] commandEnergy:^(NSNumber *energyValue) {
            
        } errorBlock:^(BPDeviceError error) {
            
        }];
        
    }else{
        
        
        
    }

    
    
    
}


RCT_EXPORT_METHOD(enbleOffline:(nonnull NSString *)mac){
    
    
    if ([self getBP5WithMac:mac]!=nil) {
        
        [[self getBP5WithMac:mac] commandSetOffline:YES errorBlock:^(BPDeviceError error) {
            
        }];
    }else{
        
        
        
    }
    
    
    
}


RCT_EXPORT_METHOD(disableOffline:(nonnull NSString *)mac){
    
    
    if ([self getBP5WithMac:mac]!=nil) {
        
        [[self getBP5WithMac:mac] commandSetOffline:NO errorBlock:^(BPDeviceError error) {
            
        }];
    }else{
        
        
        
    }
    

    
    
    
}


RCT_EXPORT_METHOD(isEnableOffline:(nonnull NSString *)mac){
    
    
    if ([self getBP5WithMac:mac]!=nil) {
        
        [[self getBP5WithMac:mac] commandSetOffline:NO errorBlock:^(BPDeviceError error) {
            
        }];
    }else{
        
        
        
    }
    
    
    
    
    
}



RCT_EXPORT_METHOD(getOfflineNum:(nonnull NSString *)mac){
    
    
    if ([self getBP5WithMac:mac]!=nil) {
        
        [[self getBP5WithMac:mac] commandSetOffline:NO errorBlock:^(BPDeviceError error) {
            
        }];
    }else{
        
        
        
    }
    
    
    
    
    
}



RCT_EXPORT_METHOD(getOfflineData:(nonnull NSString *)mac){
    
    
    if ([self getBP5WithMac:mac]!=nil) {
        
        [[self getBP5WithMac:mac] commandSetOffline:NO errorBlock:^(BPDeviceError error) {
            
        }];
    }else{
        
        
        
    }
    
    
    
    
    
}



RCT_EXPORT_METHOD(disconnect:(nonnull NSString *)mac){
    
    
    
    
    
    
}



@end
