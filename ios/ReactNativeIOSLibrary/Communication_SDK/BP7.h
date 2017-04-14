//
//  BP7.h
//  testShareCommunication
//
//  Created by my on 8/10/13.
//  Copyright (c) 2013年 my. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BPMacroFile.h"
#import <UIKit/UIKit.h>


@interface BP7 : BPDevice<BPCommandCacheDelegate>{
    BOOL _isCompleteZero;
    BOOL _isReceived;
    BOOL _isBP5;
    NSInteger _totalBatchCount;
    NSInteger _uploadCountSum;
}

@property (nonatomic,copy) BlockEnergyValue blockEnergyValue;
@property (nonatomic,copy) BlockDeviceFunction blockFunction;
@property (nonatomic,copy) BlockError blockError;
@property (nonatomic,copy) BlockAngle blockAngle;
@property (nonatomic,copy) BlockBlueSet blockBlueSet;

@property (nonatomic,copy) BlockZero blockZeroState;
@property (nonatomic,copy) BlockWavelet blockWaveletWithHeartbeat;
@property (nonatomic,copy) BlockWavelet blockWaveletWithoutHeartbeat;
@property (nonatomic,copy) BlockPressure blockPressureArr;
@property (nonatomic,copy) BlockMeasureResult blockMesureResult;

@property (nonatomic,copy) BlockBachCount blockBachCount;
@property (nonatomic,copy) BlockBachProgress blockBachProgress;
@property (nonatomic,copy) BlockBachArray blockBachArray;
@property (nonatomic,copy) BlockSuccess blockStopSuccess;




@property (strong, nonatomic) BPCommandCache *commandCache;

- (void)startMeaureWatchdog;//for internal use only

/**
 * Synchronize time and judge if the device supports BT auto-connection, offline detection, and if the function on or off, corresponding KEY as haveBlue, haveOffline, blueOpen, offlineOpen. ‘True’ means yes or on, ‘False’ means no or off
 * @param Function  A block to return the function and states that the device supports.
 * @param error  A block to refer ‘error’ in ‘Establish measurement connection’ in BP.
 */
-(void)commandFunction:(BlockDeviceFunction)function errorBlock:(BlockError)error;

/**
 *set up BT auto-connection
 * @param open   True means on; False means off.
 * @param blockBuleSet The device current statues, True means on, False means off.
 * @param error  A block to refer ‘error’ in ‘Establish measurement connection’ in BP.
 */
-(void)commandSetBlueConnect:(BOOL)open respond:(BlockBlueSet)blockBuleSet errorBlock:(BlockError)error;

/**
 * set up offline detection
 * @param open  True means on; False means off.
 * @param blockOfflineSet  The device current statues, True means on, False means off.
 * @param error  A block to refer ‘error’ in ‘Establish measurement connection’ in BP.
 */
-(void)commandSetOffline:(BOOL)open errorBlock:(BlockError)error;


/**
 * Query battery remaining energy
 * @param energyValue  A block to return the device battery remaining energy percentage, ‘80’ stands for 80%.
 * @param error  A block to return the error in ‘Establish measurement connection’
 */
-(void)commandEnergy:(BlockEnergyValue)energyValue errorBlock:(BlockError)error;


/**
 * Get current angle(only for BP7，This function needs to be called before the call of the start measure function)
 * @param AngleInfo   Angle information, including angle、isLeftHand. ‘angle’ stands for the inclination angle of the device, from 0 to 90; ‘isLeftHand’ stands for the judgment if the device is on the left hand, ‘true’ means left hand, otherwise is right hand.
 * @param Error:  error codes.
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
-(void)commandStartGetAngle:(BlockAngle)angleInfo errorBlock:(BlockError)error;

/*
 * Measurement start(only for BP7). When ‘angle’ is between 10-30, measurement starts
 * @param blockZeroState Zeroing state
 * @param Pressure  Pressure value in the process of measurement, the unit is ‘mmHg’.
 * @param waveletWithHeartbeat   Wavelet data set including pulse rate.
 * @param waveletWithoutHeartbeat   Wavelet data set without pulse rate.
 * @param Result   result including systolic pressure, diastolic pressure, pulse rate and irregular judgment. Relevant key: time, sys, dia, heartRate, irregular.
 * @param error  error codes.
 * Specification:
 *   1.  BPNormalError:  device error, error message displayed automatically.
 *   2.  BPOverTimeError:   communication over time error.
 *   3.  BPNoRespondError:   abnormal communication.
 *   4.  BPBeyondRangeError:   device is out of communication range.
 *   5.  BPDidDisconnect:   device is disconnected.
 *   6.  BPAskToStopMeasure:   measurement has been stopped.
 */

-(void)commandStartMeasureWithZeroingState:(BlockZero)blockZeroState pressure:(BlockPressure)pressure waveletWithHeartbeat:(BlockWavelet)blockWaveletWithHeartbeat waveletWithoutHeartbeat:(BlockWavelet)blockWaveletWithoutHeartbeat result:(BlockMeasureResult)result errorBlock:(BlockError)error;

/**
 * upload offline data
 * @param totalCount  item quantity of total data.
 * @param progress  upload completion ratio , from 0.0 to 1.0 or 0%~100％, 100% means upload completed.
 * @param uploadDataArray 	offline data set, including measurement time, systolic pressure, diastolic pressure, pulse rate, irregular judgment. corresponding KEY as time, sys, dia, heartRate, irregular.
 * @param error   refer ‘error’ in ‘Establish measurement connection’ in BP.
 */
-(void)commandBatchUpload:(BlockBachCount)totalCount pregress:(BlockBachProgress)progress dataArray:(BlockBachArray)uploadDataArray errorBlock:(BlockError)error;

/**
 * Measurement termination and stop BP measurement
 * @param success  The block return means measurement has been terminated.
 * @param error  A block to return the error in ‘Establish measurement connection’ in BP.
 */
-(void)stopBPMeassureErrorBlock:(BlockSuccess)success errorBlock:(BlockError)error;

@end
