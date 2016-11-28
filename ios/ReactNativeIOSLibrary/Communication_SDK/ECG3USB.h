//
//  ECG3.h
//  iHealthDemoCode
//
//  Created by daiqingquan on 15/9/15.
//  Copyright (c) 2015年 zhiwei jing. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "ECGMacroFile.h"

@interface ECG3USB : NSObject

@property (nonatomic, retain) NSMutableData *resultData;

@property (nonatomic, retain)  NSMutableData*allOAData;

@property (nonatomic, retain)  NSMutableData*allOBData;

@property (strong, nonatomic) NSString *currentUUID;
@property (strong, nonatomic) NSString *serialNumber;
@property (strong, nonatomic) NSString *firmwareVersion;



//传输文件
-(void)commandAskDataInfo:(DisposeECG3USBDataStartBlock)disposeECG3USBDataStartBlock DisposeECG3USBDataFinishBlock:(DisposeECG3USBDataFinishBlock)disposeECG3USBDataFinishBlock DisposeECG3USBDataTimeBlock:(DisposeECG3USBDataTimeBlock)disposeECG3USBDataTimeBlock DisposeECG3USBDataPercentBlock:(DisposeECG3USBDataPercentBlock)disposeECG3USBDataPercentBlock disposeECGUSBErrorBlock:(DisposeECG3USBErrorBlock)disposeECGUSBErrorBlock;

-(void)commandDeleteDataResultBlock:(DisposeECG3USBDeleteResultBlock)disposeECG3USBDeleteResultBlock disposeECGUSBErrorBlock:(DisposeECG3USBErrorBlock)disposeECGUSBErrorBlock;

-(void)commandStopSendData:(NSNumber*)groupNums;


-(void)commandDeleteAllData;

@end
