//
//  IHSDKCloudUser.h
//  iHealthDemoCode
//
//  Created by daiqingquan on 16/5/5.
//  Copyright © 2016年 zhiwei jing. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HealthUser.h"

typedef void(^DisposeSDKUserValidationSuccess)(UserAuthenResult result);

typedef void(^DisposeSDKUserValidationReturn)(NSString *userID);

typedef void (^DisposeSDKUserValidationErrorBlock)(UserAuthenResult errorID);

@interface IHSDKCloudUser : NSObject

@property(nonatomic,strong) NSString *APIDeviceTypeModel;

+(IHSDKCloudUser*)commandGetSDKUserInstance;
-(void)commandSDKUserLogin:(HealthUser *)tempUser UserValidationSuccess:(DisposeSDKUserValidationSuccess)userValidationSuccess UserValidationReturn:(DisposeSDKUserValidationReturn)userValidationReturn DisposeErrorBlock:(DisposeSDKUserValidationErrorBlock)disposeValidationErrorBlock;
-(void)commandSDKUserValidation:(HealthUser *)tempUser SDKAPIType:(NSString*)APIType UserValidationSuccess:(DisposeSDKUserValidationSuccess)userValidationSuccess UserValidationReturn:(DisposeSDKUserValidationReturn)userValidationReturn DisposeErrorBlock:(DisposeSDKUserValidationErrorBlock)disposeValidationErrorBlock;

@end
