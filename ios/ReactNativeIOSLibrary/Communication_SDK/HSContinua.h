//
//  HSContinua.h
//  iHealthDemoCode
//
//  Created by user on 16/8/22.
//  Copyright © 2016年 zhiwei jing. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "HSMacroFile.h"

@interface HSContinua : NSObject
@property (strong, nonatomic)UIAlertView * Erroralert;

@property (strong, nonatomic) NSString *currentUUID;
@property (strong, nonatomic) NSString *serialNumber;
@property (strong, nonatomic) NSString *firmwareVersion;
@property (strong, nonatomic) NSTimer *startMeasureTimer;






@end
