//
//  BGContinuaController.h
//  testShareCommunication
//
//  Created by zhiwei jing on 13-10-22.
//  Copyright (c) 2013年 my. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BGContinua.h"

@interface BGContinuaController : NSObject{
    
    NSMutableArray *BGContinuaDeviceArray;
}

+(BGContinuaController *)shareBGContinuaController;

//获取当前所有HS3实例
-(NSArray *)getAllCurrentBGContinuaInstace;

@end
