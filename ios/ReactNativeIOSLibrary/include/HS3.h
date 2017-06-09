//
//  HS3.h
//  testShareCommunication
//
//  Created by daiqingquan on 13-10-10.
//  Copyright (c) 2013年 my. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HSMacroFile.h"


@interface HS3 : NSObject
@property (retain, nonatomic) NSString *currentUUID;
@property (retain, nonatomic) NSString *deviceID;
@property (retain, nonatomic) NSString *modelNumber;
@property (retain, nonatomic) NSDictionary *commInfoDic;
@property (retain, nonatomic) NSString *firmwareVersion;



-(void)commandInitMeasureWeightID:(WeightID)weightID FinishInit:(FinishHS3Init)finishInit DisposeErrorBlock:(DisposeHS3ErrorBlock)disposeHS3ErrorBlock;

/*  Establish memory and measurement connection*/
/*
 Import Parameters:nil
 Return Parameters:
    The measurement via SDK will be operated in the case of 1-4, and will be terminated if any of 5-8 occurs. The interface needs to be re-called after analyzing the return parameters.
    Notice: when a new user registers via SDK, an ‘iHealth disclaimer’ will pop up automatically, and will require the user to agree in order to continue. SDK applications require an Internet connection; there is 10-day trial period if the SDK cannot connect to the internet, the SDK is fully functional during tryout period, but will be terminated without a working internet connection after 10 days.
 
    startTransmission：Start Memory transmission，Success: Yes，Fail: No.
    hs3UploadDataNum：Memory Number，Range:0～200.
    progress: Memory transmission progress，Range:0.0～1.0.
    memorryData: Record data including weight(kg)[Range:0.0~150.0], measure time，coordinated key：weight、date.
    finishTransmission：Finish memory transmission.
    stableWeight：Stable weight (Kg) [value range:0.0~150.0]
    disposeHS3ErrorBlock：Error code in measurement process
    error code definition：refer to ‘error’ in Section 6: HS3 error instructions.
 
 */
-(void)commandInitWithUser:(StartHS3Transmission)startTransmission UploadDataNum:(DisposeHS3UploadDataNum)hs3UploadDataNum DisposeProgress:(DisposeHS3Progress)progress MemorryData:(HS3MemorryData)memorryData FinishTransmission:(FinishHS3Transmission)finishTransmission StableWeight:(StableHS3Weight)stableWeight DisposeErrorBlock:(DisposeHS3ErrorBlock)disposeHS3ErrorBlock;

/* Turn off Bluetooth Connection */
//This method can be called only for hsInstance.HS3 with FirmwareVersion>=1.0.2
/*
 Return parameters:
    disposeResult：YES’ means measurement has been terminated, ‘NO’ means termination failed.
    disposeHS3ErrorBlock: refer to “error” : HS3 error instruction.
*/
-(void)commandTurnOffBTConnectAutoResult:(DisposeResult)disposeResult DisposeErrorBlock:(DisposeHS3ErrorBlock)disposeHS3ErrorBlock;


/* Turn on Bluetooth Connection */
//This method can be called only for hsInstance.HS3 with FirmwareVersion>=1.0.2
/*
 Return parameters:
    disposeResult：YES’ means measurement has been terminated, ‘NO’ means termination failed.
    disposeHS3ErrorBlock: refer to “error” : HS3 error instruction.
 */
-(void)commandTurnOnBTConnectAutoResult:(DisposeResult)disposeResult DisposeErrorBlock:(DisposeHS3ErrorBlock)disposeHS3ErrorBlock;

@end
