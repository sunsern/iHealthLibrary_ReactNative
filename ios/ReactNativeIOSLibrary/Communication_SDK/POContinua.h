//
//  POContinua.h
//  iHealthDemoCode
//
//  Created by user on 16/8/22.
//  Copyright © 2016年 zhiwei jing. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "POMacroFile.h"

@interface POContinua : NSObject
@property (strong, nonatomic) NSString *currentUUID;
@property (strong, nonatomic) NSString *serialNumber;
@property (strong, nonatomic) NSString *firmwareVersion;


-(void)commandContinuaPOCreateUserManageConnectWithUser:(HealthUser *)tempUser withAuthenticationResult:(BlockUserAuthentication)authenticationResultBlock withCurrentUserID:(CurrentSerialNub)currentUserIDBlock withErrorBlock:(DisposeContinuaPOErrorBlock)errorBlock;


-(void)commandContinuaPOGetDeviceBattery:(DisposeContinuaPOBatteryBlock)batteryBlock withErrorBlock:(DisposeContinuaPOErrorBlock)errorBlock;



@end
