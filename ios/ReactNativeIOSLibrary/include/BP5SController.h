//
//  BP5SController.h
//  testShareCommunication
//
//  Created by my on 14/10/13.
//  Copyright (c) 2013年 my. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BPMacroFile.h"
@interface BP5SController : BPController
/**
 * Initialize BP5S controller class
 */
+(BP5SController *)shareBP5SController;

/**
 * Get all BP5S instance,Access control class instance after receiving BP5SConnectNoti then use instance to call BP5S related communication methods.
 */
-(NSArray *)getAllCurrentBP5SInstace;

@end
