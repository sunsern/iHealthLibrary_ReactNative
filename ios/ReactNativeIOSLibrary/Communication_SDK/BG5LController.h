//
//  BG5LController.h
//  testShareCommunication
//
//  Created by daiqingquan on 14-1-16.
//  Copyright (c) 2014年 my. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BGMacroFile.h"


@interface BG5LController : BGController


/**
 *Initialization for BG5L (wireless BG via Bluetooth)
 */
+(BG5LController *)shareIHBg5lController;

/**
 * Get all BG5L Instance
 * The methold needs to be called when the BG5L has been triggered. When the app detected the glucose meter, the notification with the name of BG5LConnectNoti will be sent. After the device disconnected, the notification with the name of  BG5LDisConnectNoti will be received.
 */
-(NSArray *)getAllCurrentBG5LInstace;


@end
