//
//  HSContinuaController.h
//  iHealthDemoCode
//
//  Created by user on 16/8/22.
//  Copyright © 2016年 zhiwei jing. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HSContinua.h"

@interface HSContinuaController : NSObject{
     NSMutableArray *HSContinuaDeviceArray;
}
+(HSContinuaController *)shareHSContinuaController;

//获取当前所有HS实例
-(NSArray *)getAllCurrentHSContinuaInstace;


@end
