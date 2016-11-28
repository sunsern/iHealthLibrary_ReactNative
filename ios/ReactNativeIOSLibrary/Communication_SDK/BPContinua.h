//
//  BPContinua.h
//  testShareCommunication
//
//  Created by zhiwei jing on 13-10-22.
//  Copyright (c) 2013年 my. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "UIKit/UIKit.h"
#import "BPMacroFile.h"

typedef enum {
    BPContinuaNormalError = 1,//下位机传上来的错误信息
    BPContinuaOverTimeError,//底层发的超时
    BPContinuaNoRespondError,//一定时间内没收到响应的，一般是蓝牙堵塞
    BPContinuaDidDisconnect,//下位机断开
    BPContinuaAskToStopMeasure//下位机请求中断测量
    
}BPContinuaDeviceError;


typedef void (^BlockEnergyValue)(NSNumber *energyValue);
typedef void(^BlockPressure)(NSArray *pressureArr);
typedef void(^BlockXioaboWithHeart)(NSArray *xiaoboArr);
typedef void(^BlockXioaboNoHeart)(NSArray *xiaoboArr);
typedef void(^BlockZero)(BOOL isComplete);
typedef void(^BlockMesureResult)(NSDictionary *dic);
typedef void(^BlockStopResult)(BOOL result);
typedef void(^BlockDelPortResult)(BOOL result);

@interface BPContinua : NSObject<UIAlertViewDelegate>
{
    BlockEnergyValue _blockEnergyValue;
    BlockError _blockError;
    
    BlockXioaboWithHeart _blockXiaoboArr;
    BlockXioaboNoHeart _blockXiaoboArrNoHeart;
    BlockPressure _blockPressureArr;
    BlockMesureResult _blockMesureResult;
    
    BlockBachCount _blockBachCount;
    BlockBachProgress _blockBachProgress;
    BlockBachArray _blockBachArray;
    BlockStopSuccess _blockStopSuccess;
    
    BlockUserAuthentication _blockUserAnthen;
    
    BlockSetUserID _blockSetUserIDSuccess;
    
    BOOL isCompleteZero;
    BOOL isRecResult;
    BOOL isAlterShow;
    BOOL isMeasureState;
    
    NSString *thirdUserID;
}

@property (strong, nonatomic)UIAlertView * Erroralert;

@property (strong, nonatomic) NSString *currentUUID;
@property (strong, nonatomic) NSString *serialNumber;
@property (strong, nonatomic) NSString *firmwareVersion;
@property (strong, nonatomic) NSTimer *startMeasureTimer;


/**
 * Upload offline data.
 * @param  UploadDataArray:	offline data set, including bp_unit,bp_timestampflag,bp_dia,bp_sys,bp_pulserate,bp_pulserateflag,bp_irregular,bp_hsdflag,bp_hsd,bp_timestamp,bp_userid,bp_useridflag,bp_pulseraterange,bp_cufffit,bp_improperPositionFlg,bp_map,bp_body_movement,bp_measurestatusflag,dataID.
 * @param error   error codes.
 * Specification:
 *   1.  BPError0 = 0: Unable to take measurements due to arm/wrist movements.
 *   2.  BPError1:  Failed to detect systolic pressure.
 *   3.  BPError2:  Failed to detect diastolic pressure.
 *   4.  BPError3:  Pneumatic system blocked or cuff is too tight during inflation.
 *   5.  BPError4:  Pneumatic system leakage or cuff is too loose during inflation.
 *   6.  BPError5:  Cuff pressure reached over 300mmHg.
 *   7.  BPError6:  Cuff pressure reached over 15 mmHg for more than 160 seconds.
 *   8.  BPError7:  Data retrieving error.
 *   9.  BPError8:  Data retrieving error.
 *   10.  BPError9:  Data retrieving error.
 *   11.  BPError10:  Data retrieving error.
 *   12.  BPError11:  Communication Error.
 *   13.  BPError12:  Communication Error.
 *   14.  BPError13:  Low battery.
 *   15.  BPError14:  Device bluetooth set failed.
 *   16.  BPError15:  Systolic exceeds 260mmHg or diastolic exceeds 199mmHg.
 *   17.  BPError16:  Systolic below 60mmHg or diastolic below 40mmHg.
 *   18.  BPError17:  Arm/wrist movement beyond range.
 *   19.  BPNormalError=30:  device error, error message displayed automatically.
 *   20.  BPOverTimeError:  Abnormal communication.
 *   21.  BPNoRespondError:  Abnormal communication.
 *   22.  BPBeyondRangeError:  device is out of communication range.
 *   23.  BPDidDisconnect:  device is disconnected.
 *   24.  BPAskToStopMeasure:  measurement has been stopped.
 *   25.  BPInputParameterError=400:  Parameter input error.
 */
-(void)commandTransferMemoryDataWithDataArray:(BlockBachArray)uploadDataArray errorBlock:(BlockError)error;


/**
 * Set the userID of memery data that need to upload
 * @param userID  The userID of memery data that want to upload.The userID is either @1 or @2.
 * @param setResult  The result of setting userID,'YES'means success.
 * @param error   Error codes.
 */
-(void)commandSetUploadUserID:(NSNumber *)userID setUserIDBlock:(BlockSetUserID)setResult errorBlock:(BlockError)error;

@end
