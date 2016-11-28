//
//  BPContinuaController.h
//  testShareCommunication
//
//  Created by zhiwei jing on 13-10-22.
//  Copyright (c) 2013年 my. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BPContinua.h"

@interface BPContinuaController : NSObject{
    
    NSMutableArray *BPContinuaDeviceArray;
}

+(BPContinuaController *)shareBPContinuaController;

//获取当前所有HS3实例
-(NSArray *)getAllCurrentBPContinuaInstace;

@end
