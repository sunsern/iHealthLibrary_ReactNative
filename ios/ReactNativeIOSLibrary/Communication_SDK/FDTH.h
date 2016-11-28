//
//  FDTH.h
//  iHealthDemoCode
//
//  Created by daiqingquan on 16/7/24.
//  Copyright © 2016年 zhiwei jing. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HTSMacroFile.h"


typedef enum{
    FDTHDeviceDisconnect, //Device disconnect
}FDTHDeviceError;

typedef void (^DisposeFDTHResult)(NSMutableArray* ResultArray);

typedef void (^DisposeFDTHErrorBlock)(FDTHDeviceError errorID);

typedef void (^GetFDTHBattary)(NSNumber* battary);



@interface FDTH : NSObject{

    DisposeFDTHErrorBlock _disposeFDTHErrorBlock;
    
    GetFDTHBattary _getFDTHBattary;
    
    DisposeFDTHResult _disposeFDTHResult;

}

@property (strong, nonatomic) NSString *currentUUID;
@property (strong, nonatomic) NSString *deviceID;
@property (retain, nonatomic) NSString *firmwareVersion;


/* @param battary FDTH battery percentage, from 0～100.*/
-(void)commandGetBattary:(GetFDTHBattary)battary DisposeErrorBlock:(DisposeFDTHErrorBlock)disposeErrorBlock;


/* @param  FDTH result userID:1,2*/
-(void)commandFDTHResultWithUser:(NSNumber*)userID FDTHResult:(DisposeFDTHResult)resultArray DisposeErrorBlock:(DisposeFDTHErrorBlock)disposeErrorBlock;

@end
