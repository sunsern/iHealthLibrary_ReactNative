//
//  FDTHController.h
//  iHealthDemoCode
//
//  Created by daiqingquan on 16/7/24.
//  Copyright © 2016年 zhiwei jing. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "FDTH.h"
#import "HTSMacroFile.h"
@interface FDTHController : NSObject{
    
    NSMutableArray *FDTHArray;
    
}


+(FDTHController *)shareIHFDTHController;

//Get all FDTH instance,use FDTHInstance to call FDTH related communication methods.

-(NSArray *)getAllCurrentFDTHInstace;




@end
