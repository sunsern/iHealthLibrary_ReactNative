//
//  iHealthDeviceManagerModule.h
//  ReactNativeIOSLibrary
//
//  Created by daiqingquan on 2016/11/23.
//  Copyright © 2016年 daiqingquan. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "ScanDeviceController.h"
#import "ConnectDeviceController.h"
@interface iHealthDeviceManagerModule : NSObject<RCTBridgeModule>

+ (NSString*)autherizedUserID;
+ (NSString*)autherizedClientID;
+ (NSString*)autherizedClientSecret;

@end
