//
//  ECG3Controller.h
//  iHealthDemoCode
//
//  Created by daiqingquan on 15/9/15.
//  Copyright (c) 2015年 zhiwei jing. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ECG3USBController : NSObject{
    
    NSMutableArray *ECG3DeviceArray;
}

+(ECG3USBController *)shareECG3USBController;


-(NSArray *)getAllCurrentECG3USBInstace;




@end
