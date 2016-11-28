//
//  BGContinua.h
//  testShareCommunication
//
//  Created by zhiwei jing on 13-10-22.
//  Copyright (c) 2013年 my. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "UIKit/UIKit.h"
#import "BGMacroFile.h"

typedef enum {
    BGContinuaNormalError = 1,//下位机传上来的错误信息
    BGContinuaOverTimeError,//底层发的超时
    BGContinuaNoRespondError,//一定时间内没收到响应的，一般是蓝牙堵塞
    BGContinuaDidDisconnect,//下位机断开
    BGContinuaAskToStopMeasure//下位机请求中断测量
    
}BGContinuaDeviceError;


typedef void (^BlockEnergyValue)(NSNumber *energyValue);
typedef void(^BlockPressure)(NSArray *pressureArr);
typedef void(^BlockXioaboWithHeart)(NSArray *xiaoboArr);
typedef void(^BlockXioaboNoHeart)(NSArray *xiaoboArr);
typedef void(^BlockZero)(BOOL isComplete);
typedef void(^BlockMesureResult)(NSDictionary *dic);
typedef void(^BlockStopResult)(BOOL result);
typedef void(^BlockDelPortResult)(BOOL result);

@interface BGContinua : NSObject<UIAlertViewDelegate>
{
    BlockEnergyValue _blockEnergyValue;
    DisposeBGErrorBlock _blockError;
    
    BlockXioaboWithHeart _blockXiaoboArr;
    BlockXioaboNoHeart _blockXiaoboArrNoHeart;
    BlockPressure _blockPressureArr;
    BlockMesureResult _blockMesureResult;
    
    DisposeBGDataCount _disposeBGDataCount;
    DisposeBGHistoryData _disposeBGHistoryData;
    DisposeBGDeleteData _disposeBGDeleteData;
    
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
 * @param  UploadDataArray:	offline data set, including bg_unit,bg_timestampflag,bg_dia,bg_sys,bg_pulserate,bg_pulserateflag,bg_irregular,bg_hsdflag,bg_hsd,bg_timestamp,bg_userid,bg_useridflag,bg_pulseraterange,bg_cufffit,bg_improperPositionFlg,bg_map,bg_body_movement,bg_measurestatusflag,dataID.
 * @param error   error codes.
 */
-(void)commandTransferMemoryDataWithDataArray:(DisposeBGHistoryData)uploadDataArray errorBlock:(DisposeBGErrorBlock)error;


/**
 * Set the userID of memery data that need to upload
 * @param userID  The userID of memery data that want to upload.The userID is either @1 or @2.
 * @param setResult  The result of setting userID,'YES'means success.
 * @param error   Error codes.
 */
-(void)commandSetUploadUserID:(NSNumber *)userID setUserIDBlock:(BlockSetUserID)setResult errorBlock:(DisposeBGErrorBlock)error;

@end
