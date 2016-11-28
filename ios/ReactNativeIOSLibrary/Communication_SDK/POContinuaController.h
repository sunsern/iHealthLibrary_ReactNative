//
//  POContinuaController.h
//  iHealthDemoCode
//
//  Created by user on 16/8/22.
//  Copyright © 2016年 zhiwei jing. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface POContinuaController : NSObject

/**
 * Initialize PO Continua controller class
 */
+(POContinuaController *)sharePOContinuaController;


/**
 * Access control class instance after receiving ContinuaPOConnectNoti, then use instance to call PO related communication methods
 */
-(NSArray *)getAllCurrentPOContinuaInstace;


@end
