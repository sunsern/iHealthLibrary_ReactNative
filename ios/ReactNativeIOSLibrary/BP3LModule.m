//
//  BP3LModule.m
//  ReactNativeIOSLibrary
//
//  Created by Liu Yanbo on 2016/11/23.
//  Copyright © 2016年 Liu Yanbo. All rights reserved.
//

#import "BP3LModule.h"

@implementation BP3LModule

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

#pragma mark

- (NSDictionary *)constantsToExport {
    return @{@"deviceName":@"BP3L"};
};

@end
