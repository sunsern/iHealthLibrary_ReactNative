//
//  BGController.h
//  iHealthDemoCode
//
//  Created by Realank on 2017/1/4.
//  Copyright © 2017年 zhiwei jing. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface BGController : NSObject{
    //区分设备
    NSString* deviceName;
    NSNumber* bluetoothType;
    //发送通知
    NSString* deviceConnectNotiName;
    NSString* deviceDisconnectNotiName;
    //创建实例
    Class DeviceClass;
}

-(instancetype) initUniqueInstance;

/**
 * Get all BG3 instance,Access control class instance after receiving BG3ConnectNoti, then use instance to call BG3 related communication methods.
 */
-(NSArray *)allConnectedInstance;

@end
