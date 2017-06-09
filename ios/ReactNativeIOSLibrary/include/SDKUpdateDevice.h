//
//  SDKUpdateDevice.h
//  iHealthDemoCode
//
//  Created by daiqingquan on 16/7/27.
//  Copyright © 2016年 zhiwei jing. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef enum{
    UpdateNetworkError=200,             //UpdateNetworkError
    UpdateOrderError=201,               //Before starting the upgrade must go to query version first
    UpdateDeviceEnd = 301,              //UpdateDeviceEnd
    UpdateDeviceDisconnect = 300,       //UpdateDeviceDisconnect
    UpdateInputError=302,               //UpdateInputError
    NOUpdateUpgrade=400,                //NOUpdateUpgrade
}UpdateDeviceError;

typedef enum{
    UpdateModelStatusFree = 1,
    UpdateModelStatusBusy
}UpdateModelStatus;

typedef enum{
    UpdateDeviceType_AM3 = 1,
    UpdateDeviceType_AM3S,
    UpdateDeviceType_AM4,
    UpdateDeviceType_PO3,
    UpdateDeviceType_HS4,
    UpdateDeviceType_BP5S,
    UpdateDeviceType_ECG,
    UpdateDeviceType_ABPM
}UpdateDeviceType;


typedef void (^DisposeUpdateVersionResult)(NSDictionary * updateVersionDic);

typedef void (^DisposeUpdateErrorBlock)(UpdateDeviceError errorID);

typedef void (^UpdateModuleState)(NSNumber*updateModuleState);

typedef void (^DisposeEndUpdateResult)(NSNumber* endUpdate);

typedef void (^DisposeDownloadFirmwareStart)();

typedef void (^DisposeDownloadFirmwareFinish)();

typedef void (^DisposeUpdateProgress)(NSNumber *progress);

typedef void (^DisposeUpdateResult)(NSNumber*updateResult);

typedef void (^TransferSuccess)(NSNumber*transferSuccess);

typedef void (^DisposeDownloadProgress)(NSNumber *progress);


@interface SDKUpdateDevice : NSObject{
    
    DisposeUpdateVersionResult _disposeUpdateVersionResult;
    
    DisposeUpdateErrorBlock _disposeUpdateErrorBlock;
    
    UpdateModuleState _updateModuleState;
    
    DisposeEndUpdateResult _disposeEndUpdateResult;
    
    DisposeDownloadFirmwareStart _disposeDownloadFirmwareStart;
    
    DisposeUpdateProgress _disposeUpdateProgress;
    
    DisposeDownloadFirmwareFinish _disposeDownloadFirmwareFinish;
    
    DisposeUpdateResult _disposeUpdateResult;
    
    TransferSuccess _transferSuccess;
    
    NSMutableDictionary*updateDeviceInfoDic;
    
    DisposeDownloadProgress _disposeDownloadProgress;
    
}
@property Boolean isInUpdateModel;

@property(nonatomic,strong)NSMutableArray *beforeUpdateImageArray;

@property(nonatomic,strong)NSMutableArray *afterUpdateImageArray;

@property(nonatomic,strong)NSString *protocolString;

@property(nonatomic,strong)NSString *currentDeviceUUID;

@property Boolean testMode;

@property Boolean isTransferFlag;


/**
 * Initialize SDKUpdateDevice controller class
 */
+(SDKUpdateDevice*)shareSDKUpdateDeviceInstance;


/**
 * Get device Version and cloudDeviceVersion.
 * Import Parameters: UUIDString:device UUID.
 * @param updateVersionDic  include:DeviceType、DeviceVersion、DeviceStatus(1：YES，0：NO)、CloudDeviceVersion、KeepUpdateFlag（flag，0：firstUpdate，1：go on update）、CloudUpdateServer（1:enforce update 0: optional update）、UpdateProtocolVersion(100:Equipment upgrades returned directly after the success or failure 101:Upgrade is complete only on behalf of the firmware successfully transferred, reconnect the device after the upgrade success or failure).
 * @param disposeErrorBlock Update error codes, see UpdateDeviceError error descriptions.
 */

-(void)commandGetUpdateVersionWithDeviceUUID:(NSString*)uuidString DisposeUpdateVersionResult:(DisposeUpdateVersionResult)updateVersionDic  DisposeErrorBlock:(DisposeUpdateErrorBlock)disposeErrorBlock;
/**
 * Get Update Module State.
 * @param updateModuleState  (0:free,1:uploading)
 * @param disposeErrorBlock Update error codes, see UpdateDeviceError error descriptions.
 */
-(void)commandGetUpdateModuleState:(UpdateModuleState)updateModuleState DisposeErrorBlock:(DisposeUpdateErrorBlock)disposeErrorBlock;
/**
 * Stop Update.
 * @param endUpdateResult （bool 1：sucess，0：fail）
 * @param disposeErrorBlock Update error codes, see UpdateDeviceError error descriptions.
 */
-(void)commandEndUpdateWithDeviceUUID:(NSString*)uuidString DisposeEndUpdateResult:(DisposeEndUpdateResult)endUpdateResult  DisposeErrorBlock:(DisposeUpdateErrorBlock)disposeErrorBlock;

/**
 *  Update Device.
 * Import Parameters: UUIDString:device UUID.
 * @param disposeDownloadFirmwareStart  start update firmware from cloud.
 * @param disposeDownloadFirmwareFinish finish update firmware from cloud.
 * @param disposeUpdateProgress   Update Device progress（0-100）.
 * @param disposeUpdateResult  Update Device result（bool 1：sucess，0：fail）Applicable to the protocol of 100.
 * @param transferSuccess  TransferSuccess Applicable to the protocol of 101.
 * @param disposeErrorBlock Update error codes, see UpdateDeviceError error descriptions.
 */

-(void)commandStartUpdateWithDeviceUUID:(NSString*)uuidString DownloadFirmwareStart:(DisposeDownloadFirmwareStart)disposeDownloadFirmwareStart DisposeDownloadFirmwareFinish:(DisposeDownloadFirmwareFinish)disposeDownloadFirmwareFinish DisposeUpdateProgress:(DisposeUpdateProgress)disposeUpdateProgress DisposeUpdateResult:(DisposeUpdateResult)disposeUpdateResult TransferSuccess:(TransferSuccess)transferSuccess  DisposeErrorBlock:(DisposeUpdateErrorBlock)disposeErrorBlock;

/**
 *  Update Device.
 * Import Parameters: 
    uuidString:device UUID.
    deviceType: UpdateDeviceType
    infoFilePath: infoFilePath
    upadteFilePath: upadteFilePath
    fileCRC: file CRC
    appSecret: appSecret
 * @param disposeUpdateProgress   Update Device progress（0-100）.
 * @param disposeUpdateResult  Update Device result（bool 1：sucess，0：fail）Applicable to the protocol of 100.
 * @param transferSuccess  TransferSuccess Applicable to the protocol of 101.
 * @param disposeErrorBlock Update error codes, see UpdateDeviceError error descriptions.
 */

-(void)commandStartUpdateWithDeviceUUID:(NSString*)uuidString DeviceType:(UpdateDeviceType)deviceType InfoFilePath:(NSString*)infoFilePath UpadteFilePath:(NSString*)upadteFilePath FileCRC:(NSNumber*)fileCRC AppSecret:(NSString*)appSecret DisposeUpdateProgress:(DisposeUpdateProgress)disposeUpdateProgress DisposeUpdateResult:(DisposeUpdateResult)disposeUpdateResult TransferSuccess:(TransferSuccess)transferSuccess  DisposeErrorBlock:(DisposeUpdateErrorBlock)disposeErrorBlock;


/**
 *  Update Device.
 * Import Parameters: UUIDString:device UUID.
 * @param disposeDownloadFirmwareStart  start update firmware from cloud.
 * @param disposeDownloadFirmwareFinish finish update firmware from cloud.
 * @param disposeUpdateProgress   Update Device progress（0-100）.
 * @param disposeDownloadProgress Download file progress（0-100）.
 * @param disposeUpdateResult  Update Device result（bool 1：sucess，0：fail）Applicable to the protocol of 100.
 * @param transferSuccess  TransferSuccess Applicable to the protocol of 101.
 * @param disposeErrorBlock Update error codes, see UpdateDeviceError error descriptions.
 */

-(void)commandStartUpdateWithDeviceUUID:(NSString*)uuidString DownloadFirmwareStart:(DisposeDownloadFirmwareStart)disposeDownloadFirmwareStart DisposeDownloadFirmwareFinish:(DisposeDownloadFirmwareFinish)disposeDownloadFirmwareFinish DisposeDownloadProgress:(DisposeDownloadProgress)disposeDownloadProgress DisposeUpdateProgress:(DisposeUpdateProgress)disposeUpdateProgress DisposeUpdateResult:(DisposeUpdateResult)disposeUpdateResult TransferSuccess:(TransferSuccess)transferSuccess  DisposeErrorBlock:(DisposeUpdateErrorBlock)disposeErrorBlock;



-(void)commandsetCloudModel:(NSNumber*)cloudModel;

@end
