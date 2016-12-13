//
//  HS6Module.m
//  ReactNativeIOSLibrary
//
//  Created by ihealth on 16/12/12.
//  Copyright © 2016年 daiqingquan. All rights reserved.
//

#import "HS6Module.h"
#import "HSProfileModule.h"
#import "HSMacroFile.h"
#import "iHealthHS6.h"

#define EVENT_NOTIFY @"Event_Notify"

@implementation HS6Module

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

#pragma mark-init

-(NSDictionary *)constantToExport{
    return @{
            EVENT_NOTIFY:@"HS4.MODULE.NOTIFY"
                          };
}
-(iHealthHS6 *)hs6Controller{

    iHealthHS6 *hs6Instance = [iHealthHS6 shareIHHS6Controller];
    
    return hs6Instance;
}


#pragma mark
#pragma mark - Method



RCT_EXPORT_METHOD(setWifi:(nonnull NSString*)ssid :(nonnull NSString*)password){
    
    
    }
@end
