//
//  PO3.h
//  testShareCommunication
//
//  Created by daiqingquan on 13-11-29.
//  Copyright (c) 2013年 my. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "POMacroFile.h"



@interface PO3 : NSObject

@property (retain, nonatomic) NSString *currentUUID;
@property (retain, nonatomic) NSString *serialNumber;
@property (retain, nonatomic) NSString *firmwareVersion;



/**
 * Restore Sync time
 * @param syncTimeBlock Sync completed. Yes = Success, No = Fail.
 * @param errorBlock Communication error codes
 */
-(void)commandPO3SyncTime:(DisposePO3SyncTimeBlock)syncTimeBlock withErrorBlock:(DisposePO3ErrorBlock)errorBlock;




/**
 * Restore Real-time measurements
 * @param startMeasure  Start measurement, Return no for fail, return yes for success.
 * @param measureData  SpO2 values, including SpO2, pulse rate, pulse intensity. Corresponding keys are spo2, bpm, wave, and pi.
 * @param finishMeasure  Finish measurement. No for fail, yes for success.
 * @param errorBlock Communication error codes
 */

-(void)commandPO3StartMeasure:(DisposePO3StartMeasure)startMeasure withMeasureData:(DisposePO3MeasureData)measureData  withFinishMeasure:(DisposePO3FinishMeasure)finishMeasure  withErrorBlock:(DisposePO3ErrorBlock)errorBlock;




/**
 * Restore Historical data
 * @param offlineDataCount Number of historical offline data measurements.
 * @param startUpload  data transmission. Yes for success, no for fail.
 * @param measureData date, spo2, bpm, and wave.
 * @param offlineWaveData Pulse intensity, corresponding key: wave
 * @param finishUpload End transmission of data, yes for success, no for fail.
 * @param errorBlock Communication error codes
 */
-(void)commandPO3OfflineDataCount:(DisposePO3OfflineDataCount)offlineDataCount withStartUpload:(DisposePO3StartUpload)startUpload withOfflineData:(DisposePO3OfflineData)measureData withOfflineWaveData:(DisposePO3OfflineWaveData)offlineWaveData withFinishMeasure:(DisposePO3FinishUpload)finishUpload  withErrorBlock:(DisposePO3ErrorBlock)errorBlock;


/**
 * Restore factory settings
 * @param resetDeviceBlock  yes = success, no = fail.
 * @param errorBlock Communication error codes
 * @Notice  Notice: Firmware version 2.0.0 and above does not support this function
 */
-(void)commandPO3ResetDevice:(DisposePO3ResetDeviceBlock)resetDeviceBlock withErrorBlock:(DisposePO3ErrorBlock)errorBlock;



/**
 * Query power status
 * @param batteryBlock Battery，from 0～100
 * @param errorBlock Communication error codes
 */
-(void)commandPO3GetDeviceBattery:(DisposePO3BatteryBlock)batteryBlock withErrorBlock:(DisposePO3ErrorBlock)errorBlock;



/**
 * Disconnect connection
 * @param disconnectBlock  yes = success, no = fail.
 * @param errorBlock Communication error codes
 */
-(void)commandPO3Disconnect:(DisposePO3DisconnectBlock)disconnectBlock withErrorBlock:(DisposePO3ErrorBlock)errorBlock;
@end


