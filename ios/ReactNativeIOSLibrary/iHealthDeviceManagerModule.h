//
//  iHealthDeviceManagerModule.h
//  ReactNativeIOSLibrary
//
//  Created by daiqingquan on 2016/11/23.
//  Copyright © 2016年 daiqingquan. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTEventEmitter.h>
#import "ScanDeviceController.h"
#import "ConnectDeviceController.h"

@interface iHealthDeviceManagerModule : RCTEventEmitter<RCTBridgeModule>
{
    NSDictionary *bg1IdpsDic;
}

+ (NSString*)autherizedUserID;
+ (NSString*)autherizedClientID;
+ (NSString*)autherizedClientSecret;

@end
