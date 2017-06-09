//
//  HS4.h
//  testShareCommunication
//
//  Created by daiqingquan on 13-12-2.
//  Copyright (c) 2013年 my. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HSMacroFile.h"



@interface HS4 : NSObject
@property (strong, nonatomic) NSString *currentUUID;
@property (strong, nonatomic) NSString *deviceID;
@property (strong, nonatomic) NSNumber*daiModel;
@property (retain, nonatomic) NSString *firmwareVersion;

/*Establish memory and measurement connection*/
//When using the SDK for the first time, measuring method needs to be called to finish user verification.
/*
 Import parameter:
    tempUnit: Unit displayed on HS4: HSUnit_Kg、HSUnit_LB、HSUnit_ST。
    
 Return parameters:
    The measurement via SDK will be operated in the case of 1-4, and will be terminated if any of 5-8 occurs. The interface needs to be re-called after analyzing the return parameters.
    Notice: when a new user registers via SDK, an ‘iHealth disclaimer’ will pop up automatically, and will require the user to agree in order to continue. SDK applications require an Internet connection; there is 10-day trial period if the SDK cannot connect to the internet, the SDK is fully functional during tryout period, but will be terminated without a working internet connection after 10 days.

    unStableWeight: Current weight, (Kg) [Value Range:0~180]
    stableWeight: Stable weight, (Kg) [Value Range:0~180]
    disposeErrorBlock: error code
    Error code definition：
    refer to “error” : HS4 error instruction.
*/

-(void)commandMeasureWithUint:(HSUnit)tempUnit Weight:(UnStableWeight)unStableWeight StableWeight:(StableWeight)stableWeight DisposeErrorBlock:(DisposeHS4ErrorBlock)disposeErrorBlock;

/*Upload memory data*/
//If user doesn’t pass the verification, HS4UserInvalidate will be returned for calling this method, user information invalid.
/*
 Import parameters：
    tempUser, included properties: userID, refer to the instructions for HS3
 Return parameters:
    startTransmission：Start Memory transmission.
    progress: Memory transmission progress，[Range:0.0～1.0].
    memorryData:Record data including weight (kg), measurement time，coordinated key：weight，date.[Range of weight 0.0~180.0(kg)]
    finishTransmission：Finish memory transmission.
    disposeErrorBlock: Record the error code in uploading process.
    Error code definition: refer to ”error” : HS4 error instruction.
*/
-(void)commandTransferMemorryData:(StartHS4Transmission)startTransmission DisposeProgress:(DisposeProgress)progress MemorryData:(MemorryData)memorryData FinishTransmission:(FinishHS4Transmission)finishTransmission DisposeErrorBlock:(DisposeHS4ErrorBlock)disposeErrorBlock;

//End Current Measure Connection
-(void)commandEndCurrentConnection:(DisposeResult)result DisposeErrorBlock:(DisposeHS4ErrorBlock)disposeErrorBlock;

//Disconnect current device
-(void)commandDisconnectDevice;

@end
