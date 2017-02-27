//
//  BP5Module.m
//  ReactNativeIOSLibrary
//
//  Created by daiqingquan on 2016/11/23.
//  Copyright © 2016年 daiqingquan. All rights reserved.
//

#import "BP5Module.h"
#import "BPProfileModule.h"
#import "BP5Module.h"
#import "BPMacroFile.h"
#import "BP5Controller.h"
#import "BP5.h"
#import "iHealthDeviceManagerModule.h"

@interface BP5Module()
@property (nonatomic, strong) NSNumber* previousPressure;
@property (nonatomic, assign) BOOL startSendWavelet;
@end
@implementation BP5Module
#define EVENT_NOTIFY @"BP5.MODULE.NOTIFY"
@synthesize bridge = _bridge;
RCT_EXPORT_MODULE()

- (NSDictionary *)constantsToExport
{
    return @{
             @"Event_Notify":EVENT_NOTIFY,
             
             };
}


#pragma mark
#pragma mark - Init

-(BP5*)getBP5WithMac:(NSString*)mac{

    BP5Controller *controller = [BP5Controller shareBP5Controller];
    NSArray *bpDeviceArray = [controller getAllCurrentBP5Instace];
    
    for(BP5 *tempBP5 in bpDeviceArray){
        if([mac isEqualToString:tempBP5.serialNumber]){
           
            return tempBP5;
            break;
        }
    }

    return nil;
}

#pragma mark
#pragma mark - Notification
#pragma mark - BP5
//-(void)DeviceConnectForBP5:(NSNotification *)tempNoti{
//    BP5Controller *controller = [BP5Controller shareBP5Controller];
//    NSArray *bpDeviceArray = [controller getAllCurrentBP5Instace];
//   
//    BP5 *bpInstance = [bpDeviceArray objectAtIndex:0];
//      
//}
//
//- (void)DeviceDisConnectForBP5:(NSNotification*)tempNoti{
//    
//}




#pragma mark
#pragma mark - Method

RCT_EXPORT_METHOD(startMeasure:(nonnull NSString *)mac){
    
    _previousPressure = @(0);
    self.startSendWavelet = NO;
    if ([self getBP5WithMac:mac]!=nil) {
        __weak typeof(self) weakSelf = self;
        [[self getBP5WithMac:mac] commandStartMeasureWithUser:[iHealthDeviceManagerModule autherizedUserID] clientID:[iHealthDeviceManagerModule autherizedClientID] clientSecret:[iHealthDeviceManagerModule autherizedClientSecret] Authentication:^(UserAuthenResult result) {
            if (result != UserAuthen_LoginSuccess) {
                [weakSelf sendErrorWithCode:result];
            }
        } pressure:^(NSArray *pressureArr) {
            NSLog(@"pressure %@",pressureArr);
            [self sendPresssre:pressureArr.firstObject wavelet:nil isHeartPulse:NO];
        } xiaoboWithHeart:^(NSArray *xiaoboArr) {
            NSLog(@"xiaoboWithHeart %@",xiaoboArr);
            [self sendPresssre:nil wavelet:xiaoboArr isHeartPulse:YES];
            
        } xiaoboNoHeart:^(NSArray *xiaoboArr) {
            NSLog(@"xiaoboNoHeart %@",xiaoboArr);
            [self sendPresssre:nil wavelet:xiaoboArr isHeartPulse:NO];
            
        } result:^(NSDictionary *dic) {
            NSLog(@"result %@",dic);
            weakSelf.startSendWavelet = NO;
            NSDictionary* response = @{
                                       kACTION:kACTION_ONLINE_RESULT_BP,
                                       kHIGH_BLOOD_PRESSURE_BP:dic[@"sys"],
                                       kLOW_BLOOD_PRESSURE_BP:dic[@"dia"],
                                       kPULSE_BP:dic[@"heartRate"],
                                       kMEASUREMENT_AHR_BP:dic[@"irregular"],
                                       kDATAID:dic[@"dataID"],
                                       };
            [weakSelf sendEventWithDict:response];
        } errorBlock:^(BPDeviceError error) {
            NSLog(@"error %d",error);
            weakSelf.startSendWavelet = NO;
            [weakSelf sendErrorWithCode:error];
            
        }];
    }else{
    
        NSLog(@"error %d",BPDidDisconnect);
        [self sendErrorWithCode:BPDidDisconnect];
    
    }
    
    
}

- (void)sendPresssre:(NSNumber*)pressure wavelet:(NSArray*)waveletArray isHeartPulse:(BOOL)heartPulse{

    if (pressure) {
        self.previousPressure = pressure;
    }
    if (waveletArray.count > 0) {
        self.startSendWavelet = YES;
    }
    if (pressure && !self.startSendWavelet) {
        NSDictionary* response = @{
                                   kACTION:kACTION_ONLINE_PRESSURE_BP,
                                   kBLOOD_PRESSURE_BP:pressure,
                                   };
        [self sendEventWithDict:response];
    }else if (waveletArray.count > 0 && self.startSendWavelet){
        NSDictionary* response = @{
                                   kACTION:kACTION_ONLINE_PULSEWAVE_BP,
                                   kBLOOD_PRESSURE_BP:self.previousPressure,
                                   kFLAG_HEARTBEAT_BP:@(heartPulse),
                                   kPULSEWAVE_BP:waveletArray
                                   };
        [self sendEventWithDict:response];
    }
}


RCT_EXPORT_METHOD(stopMeasure:(nonnull NSString *)mac){
    
    
    if ([self getBP5WithMac:mac]!=nil) {
        [[self getBP5WithMac:mac] stopBPMeassureErrorBlock:^{
            //不知道为啥不往里走。。
        } errorBlock:^(BPDeviceError error) {
            NSLog(@"error %d",error);
            [self sendErrorWithCode:error];
        }];
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            NSDictionary* response = @{
                                       kACTION:kACTION_INTERRUPTED_BP,
                                       };
            [self sendEventWithDict:response];
        });
    }else{
        
        NSLog(@"error %d",BPDidDisconnect);
        [self sendErrorWithCode:BPDidDisconnect];
        
    }

}

RCT_EXPORT_METHOD(getBattery:(nonnull NSString *)mac){
    
    
    if ([self getBP5WithMac:mac]!=nil) {
        
        [[self getBP5WithMac:mac] commandEnergy:^(NSNumber *energyValue) {
            NSDictionary* response = @{
                                       kACTION:kACTION_BATTERY_BP,
                                       kBATTERY_BP:energyValue
                                       };
            [self sendEventWithDict:response];
        } errorBlock:^(BPDeviceError error) {
            NSLog(@"error %d",error);
            [self sendErrorWithCode:error];
        }];
        
    }else{
        
        NSLog(@"error %d",BPDidDisconnect);
        [self sendErrorWithCode:BPDidDisconnect];
        
    }

    
    
    
}


RCT_EXPORT_METHOD(enbleOffline:(nonnull NSString *)mac){
    
    
    if ([self getBP5WithMac:mac]!=nil) {
        __block BOOL success = YES;
        [[self getBP5WithMac:mac] commandSetOffline:YES errorBlock:^(BPDeviceError error) {
            success = NO;
            [self sendErrorWithCode:error];
        }];
        
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            if (success) {
                NSDictionary* response = @{
                                           kACTION:kACTION_ENABLE_OFFLINE_BP,
                                           };
                [self sendEventWithDict:response];
            }
        });
        
    }else{
        [self sendErrorWithCode:BPDidDisconnect];
    }
    
}


RCT_EXPORT_METHOD(disableOffline:(nonnull NSString *)mac){
    
    
    if ([self getBP5WithMac:mac]!=nil) {
        __block BOOL success = YES;
        [[self getBP5WithMac:mac] commandSetOffline:NO errorBlock:^(BPDeviceError error) {
            success = NO;
            [self sendErrorWithCode:error];
        }];
        
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            if (success) {
                NSDictionary* response = @{
                                           kACTION:kACTION_DISENABLE_OFFLINE_BP,
                                           };
                [self sendEventWithDict:response];
            }
        });
        
    }else{
        [self sendErrorWithCode:BPDidDisconnect];
    }


}


RCT_EXPORT_METHOD(isEnableOffline:(nonnull NSString *)mac){
    
    
    if ([self getBP5WithMac:mac]!=nil) {
        
        [[self getBP5WithMac:mac] commandFounction:^(NSDictionary *dic) {
            NSDictionary* response = @{
                                       kACTION:kACTION_IS_ENABLE_OFFLINE,
                                       kIS_ENABLE_OFFLINE:dic[@"offlineOpen"]
                                       };
            [self sendEventWithDict:response];
        } errorBlock:^(BPDeviceError error) {
            [self sendErrorWithCode:error];
        }];
    }else{
        [self sendErrorWithCode:BPDidDisconnect];
    }

}



RCT_EXPORT_METHOD(getOfflineNum:(nonnull NSString *)mac){
    
    
//    if ([self getBP5WithMac:mac]!=nil) {
//        
//        [[self getBP5WithMac:mac] commandBatchUpload:^(NSNumber *num) {
//            NSDictionary* response = @{
//                                       kACTION:kACTION_HISTORICAL_NUM_BP,
//                                       kHISTORICAL_NUM_BP:num
//                                       };
//            [self sendEventWithDict:response];
//        } pregress:^(NSNumber *pregress) {
//            
//        } dataArray:^(NSArray *array) {
//            
//        } errorBlock:^(BPDeviceError error) {
//            [self sendErrorWithCode:error];
//        }];
//    }else{
//        [self sendErrorWithCode:BPDidDisconnect];
//    }
    if ([self getBP5WithMac:mac]!=nil) {
        
        [[self getBP5WithMac:mac] commandBatchUpload:^(NSNumber *num) {
            NSDictionary* response = @{
                                       kACTION:kACTION_HISTORICAL_NUM_BP,
                                       kHISTORICAL_NUM_BP:num
                                       };
            [self sendEventWithDict:response];
        } pregress:^(NSNumber *pregress) {
            
        } dataArray:^(NSArray *array) {
            NSMutableArray * historyDataArray = [NSMutableArray array];
            
            for(NSDictionary *dataDict in array)
            {
                
                NSDate *date = [dataDict objectForKey:@"time"];
                
                //将时间格式转化成字符串，适配plugin和react native
                NSDateFormatter *mydateFormatter = [[NSDateFormatter alloc] init];
                [mydateFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
                NSString *dateStr = [mydateFormatter stringFromDate:date];
                NSDictionary* historyDataDict = @{
                                                  kMEASUREMENT_DATE_BP:dateStr,
                                                  kHIGH_BLOOD_PRESSURE_BP:dataDict[@"sys"],
                                                  kLOW_BLOOD_PRESSURE_BP:dataDict[@"dia"],
                                                  kPULSE_BP:dataDict[@"heartRate"],
                                                  kMEASUREMENT_AHR_BP:dataDict[@"irregular"],
                                                  //                                                  kMEASUREMENT_HSD_BP:dataDict[@"hsdValue"],
                                                  kDATAID:dataDict[@"dataID"]
                                                  };
                [historyDataArray addObject:historyDataDict];
                
                
            }
            
            if (historyDataArray.count > 0) {
                NSDictionary* deviceInfo = @{kACTION:kACTION_HISTORICAL_DATA_BP,kHISTORICAL_DATA_BP:[historyDataArray copy] };
                [self sendEventWithDict:deviceInfo];
            }
            
        } errorBlock:^(BPDeviceError error) {
            [self sendErrorWithCode:error];
        }];
    }else{
        [self sendErrorWithCode:BPDidDisconnect];
    }
}



RCT_EXPORT_METHOD(getOfflineData:(nonnull NSString *)mac){
    
    
    if ([self getBP5WithMac:mac]!=nil) {
        
        [[self getBP5WithMac:mac] commandBatchUpload:^(NSNumber *num) {
            if (num.integerValue == 0) {
                NSDictionary* response = @{
                                           kACTION:kACTION_HISTORICAL_DATA_BP,
                                           };
                [self sendEventWithDict:response];
            }
        } pregress:^(NSNumber *pregress) {
            
        } dataArray:^(NSArray *array) {
            NSMutableArray * historyDataArray = [NSMutableArray array];
            
            for(NSDictionary *dataDict in array)
            {

                NSDate *date = [dataDict objectForKey:@"time"];
                
                //将时间格式转化成字符串，适配plugin和react native
                NSDateFormatter *mydateFormatter = [[NSDateFormatter alloc] init];
                [mydateFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
                NSString *dateStr = [mydateFormatter stringFromDate:date];
                NSDictionary* historyDataDict = @{
                                                  kMEASUREMENT_DATE_BP:dateStr,
                                                  kHIGH_BLOOD_PRESSURE_BP:dataDict[@"sys"],
                                                  kLOW_BLOOD_PRESSURE_BP:dataDict[@"dia"],
                                                  kPULSE_BP:dataDict[@"heartRate"],
                                                  kMEASUREMENT_AHR_BP:dataDict[@"irregular"],
//                                                  kMEASUREMENT_HSD_BP:dataDict[@"hsdValue"],
                                                  kDATAID:dataDict[@"dataID"]
                                                  };
                [historyDataArray addObject:historyDataDict];
                
                
            }
            
            if (historyDataArray.count > 0) {
                NSDictionary* deviceInfo = @{kACTION:kACTION_HISTORICAL_DATA_BP,kHISTORICAL_DATA_BP:[historyDataArray copy] };
                [self sendEventWithDict:deviceInfo];
            }

        } errorBlock:^(BPDeviceError error) {
            [self sendErrorWithCode:error];
        }];
    }else{
        [self sendErrorWithCode:BPDidDisconnect];
    }

}



RCT_EXPORT_METHOD(disconnect:(nonnull NSString *)mac){
    NSLog(@"iOS doesn't support disconnect normal BT devices");
    [self sendErrorWithCode:BPError14];
    
}

- (void)sendErrorWithCode:(NSInteger)errorCode{
    [self sendEventWithDict:@{kACTION:kACTION_ERROR_BP,kERROR_NUM_BP:@(errorCode)}];
}

- (void)sendEventWithDict:(NSDictionary*)dict{
    [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:dict];
}



@end
