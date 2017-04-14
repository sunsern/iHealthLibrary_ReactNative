//
//  BP5S.h
//  testShareCommunication
//
//  Created by my on 14/10/13.
//  Copyright (c) 2013年 my. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BPMacroFile.h"
#import <UIKit/UIKit.h>


@interface BP5S : BPDevice



/**
 * Upload offline data.
 *  @Notice   By the first time of new user register via SDK, ‘iHealth disclaimer’ will pop up automatically, and require the user agrees to continue. SDK application requires Internet connection; there is 10-day tryout if SDK cannot connect Internet, SDK is fully functional during tryout period, but will be terminated without verification through Internet after 10 days.
 * @param  TotalCount: item quantity of total data
 * @param  Progress: upload completion ratio , from 0.0 to 1.0 or 0%~100％, 100% means upload completed.
 * @param  UploadDataArray:	offline data set, including measurement time, systolic pressure, diastolic pressure, pulse rate, irregular judgment,scheme ID,body movement flag. corresponding KEY as time, sys, dia, heartRate, irregular,schemeID,bodyMovementFlg.
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
 *   19.  BPError21:  Blood pressure meter is in progress, unable to respond to command.
 *   20.  BPNormalError=30:  device error, error message displayed automatically.
 *   21.  BPOverTimeError:  Abnormal communication.
 *   22.  BPNoRespondError:  Abnormal communication.
 *   23.  BPBeyondRangeError:  device is out of communication range.
 *   24.  BPDidDisconnect:  device is disconnected.
 *   25.  BPAskToStopMeasure:  measurement has been stopped.
 *   26.  BPInputParameterError=400:  Parameter input error.
 */
-(void)commandTransferMemoryDataWithTotalCount:(BlockBachCount)totalCount progress:(BlockBachProgress)progress dataArray:(BlockBachArray)uploadDataArray errorBlock:(BlockError)error;


/**
 * Upload offline data total Count.
 * @param  TotalCount: item quantity of total data.
 * @param error  A block to return the error.
 */
-(void)commandTransferMemoryTotalCount:(BlockBachCount)totalCount errorBlock:(BlockError)error;


/**
 * * Synchronize time and return the function and states that the device supports
 * @param Function  A block to return the function and states that the device supports,judge if the device supports the function of up Air Measurement, arm Measurement,the last operation status,the max memory capacity, HSD, Offline Memory, mutable Groups Upload, Self Upgrade. ‘True’ means yes or on, ‘False’ means no or off.
 * @param error  A block to refer ‘error’ in ‘Establish measurement connection’ in BP5S.
 */
-(void)commandFunction:(BlockDeviceFunction)function errorBlock:(BlockError)error;

/**
 * Query battery remaining energy
 * @param energyValue  A block to return the device battery remaining energy percentage, ‘80’ stands for 80%.
 * @param error  A block to return the error in ‘Establish measurement connection’.
 */
-(void)commandEnergy:(BlockEnergyValue)energyValue errorBlock:(BlockError)error;


/**
 * Get measure status
 * @param measureStatus  A block to return the device measure status,include the information and keys as schemeID,repeatedlyMeasureStatus,totalMeasureTime,remainingMeasureTimes.
 * @param error  A block to return the error in ‘Establish measurement connection’.
 */
-(void)commandGetMeasureStatus:(BlockMeasureStatus)measureStatus errorBlock:(BlockError)error;

/**
 * Set repeate measurement parameters
 * @param SetDic  A dictionary to set the scheme ID, the timer mode,the measure reapet mode,the hour of start measure time,the minitue of start measure time,the reapet measure times,the reapet measure time interval,the corresponding KEY as @"schemeID",@"timerMode",@"repeatMode",@"startHour",@"startMinitue",@"measureTimes",@"measureInterval".
 * @param error  A block to return the error in ‘Establish measurement connection’.
 */
-(void)commandSetRepeatedlyMeasureParameter:(NSDictionary *)measureParameterSetDic disposeSetReslut:(BlockSuccess)setResult errorBlock:(BlockError)error;

/**
 * Delete repeat measurement setting
 * @param schemeID  The measure scheme ID.
 * @param setResult  Block return means that the deletion succeeded.
 * @param error  A block to return the error in ‘Establish measurement connection’.
 */
-(void)commandDeleteRepeatedlyMeasureSetWithSchemeID:(NSInteger)schemeID disposeSetResult:(BlockSuccess)setResult errorBlock:(BlockError)error;

/**
 * Disconnect current device
 */
-(void)commandDisconnectDevice;

@end
