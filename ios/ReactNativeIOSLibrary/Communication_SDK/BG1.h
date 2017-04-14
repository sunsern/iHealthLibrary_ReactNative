//
//  BG1.h
//  iHealth_BG1
//
//  Created by daiqingquan on 14-1-9.
//  Copyright (c) 2014年 daiqingquan. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import "BGMacroFile.h"


@interface BG1 : NSObject

/**
 * Initialization for BG1 Instance.
 */
+ (BG1 *)shareBG1CommunicationObject;


/**
 * Start connect BG1 and get the connection status.
 * @param bg1Model the BG1 type.
 * @param disposeDiscoverBGBlock This block returns means blood glucose meter plugged in.
 * @param disposeBGIDPSBlock  This block returns the IDPS of the meter, this will be operated for the first time when the app talks to the meter.
 * @param disposeConnectBGBlock, This block returns the connection status, the connection of the BG meter is regular , the measurement could be processed.
 * @param disposeBGErrorBlock,This block returns error codes,please refer to error codes list in BGMacroFile.
 */
-(void)commandConnectBGwithDeviceModel:(NSNumber *)bg1Model DisposeDiscoverBlock:(DisposeDiscoverBGBlock)disposeDiscoverBGBlock DisposeBGIDPSBlock:(DisposeBGIDPSBlock)disposeBGIDPSBlock DisposeConnectBGBlock:(DisposeConnectBGBlock)disposeConnectBGBlock DisposeBGErrorBlock:(DisposeBGErrorBlock)disposeBGErrorBlock;


/**
 * Establish connection and start BG measurement.(New)
 * @param testType Set the measure test type,BGMeasureMode_Blood is Blood Test,BGMeasureMode_NoBlood is CTL Test.
 * @param codeType Set the code type,BGCodeMode_GOD is GOD,BGCodeMode_GDH is GDH.
 * @param codeStrips The code String gets by scanning the QR code.
 * @param disposeBGSendCodeBlock   If the QR code is accepted, yes means accepted, no means deny.
 * @param disposeBGStripInBlock  This block returns yes means the strips slide into the BG meter.
 * @param disposeBGBloodBlock  This block returns yes means the blood drop has beed sensed from the strip.
 * @param disposeBGResultBlock  Returns the measurement by the unit of mg/dL, range from 20-600.
 * @param disposeBGStripOutBlock  This block returns yes means the strip has been pulled out.
 * @param disposeBGErrorBlock  This block returns error codes,please refer to error codes list in BGMacroFile.
 */
-(void)commandCreateBGtestWithMeasureType:(BGMeasureMode)testType CodeType:(BGCodeMode)codeType CodeString:(NSString*)codeStrips DisposeBGSendCodeBlock:(DisposeBGSendCodeBlock)disposeBGSendCodeBlock DisposeBGStripInBlock:(DisposeBGStripInBlock)disposeBGStripInBlock DisposeBGBloodBlock:(DisposeBGBloodBlock)disposeBGBloodBlock DisposeBGResultBlock:(DisposeBGResultBlock)disposeBGResultBlock DisposeBGStripOutBlock:(DisposeBGStripOutBlock)disposeBGStripOutBlock DisposeBGErrorBlock:(DisposeBGErrorBlock)disposeBGErrorBlock;


/**
 * Analyze code include bottleID，DueDate and the number of strips.
 * @param encodeString  The code String gets by scanning the QR code.
 */
-(NSDictionary *)codeStripStrAnalysis:(NSString *)encodeString;


@end
