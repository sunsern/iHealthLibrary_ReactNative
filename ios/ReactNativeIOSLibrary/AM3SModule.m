//
//  AM3SModule.m
//  ReactNativeIOSLibrary
//
//  Created by daiqingquan on 2016/11/23.
//  Copyright © 2016年 daiqingquan. All rights reserved.
//

#import "AM3SModule.h"
#import "AMProfileModule.h"
#import "AMMacroFile.h"
#import "AM3SController_V2.h"
#import "AM3S_V2.h"
@implementation AM3SModule

RCT_EXPORT_MODULE()
- (NSDictionary *)constantsToExport
{
    return @{
             @"EVENT_NOTIFY": EVENT_NOTIFY
             
             };
    
    
}

#pragma mark
#pragma mark - Init
-(id)init
{
    if (self=[super init])
    {
        
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(DeviceConnectForAM3S:) name:AM3SConnectNoti object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(DeviceDisConnectForAM3S:) name:AM3SDisConnectNoti object:nil];
        
        [AM3SController_V2 shareIHAM3SController];
        
    }
    return self;
}

-(AM3S_V2*)getAM3SWithMac:(NSString*)mac{
    
    AM3SController_V2 *controller = [AM3SController_V2 shareIHAM3SController];
    NSArray *amDeviceArray = [controller getAllCurrentAM3SInstace];
    
    for(AM3S_V2 *tempAM3S in amDeviceArray){
        if([mac isEqualToString:tempAM3S.currentUUID]){
            
            return tempAM3S;
            break;
        }
    }
    
    return nil;
}

#pragma mark
#pragma mark - Notification
#pragma mark - AM3S

-(void)DeviceConnectForAM3S:(NSNotification *)tempNoti{
    AM3SController_V2 *controller = [AM3SController_V2 shareIHAM3SController];
    NSArray *amDeviceArray = [controller getAllCurrentAM3SInstace];
    
    AM3S_V2 *AMInstance = [amDeviceArray objectAtIndex:0];
}


#pragma mark
#pragma mark - Method
RCT_EXPORT_METHOD(reset:(nonnull NSString *)mac){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SResetDevice:^(BOOL resetSuc) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"reset_am",@"reset":[NSNumber numberWithInteger:resetSuc]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM3SErrorID errorID) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(getUserId:(nonnull NSString *)mac){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SGetDeviceUserID:^(unsigned int userID) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"userid_am",@"userid":[NSNumber numberWithInteger:userID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM3SErrorID errorID) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
        
    }
}

RCT_EXPORT_METHOD(setUserId:(nonnull NSString *)mac :(nonnull NSNumber *)uesrID){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SSetUserID:uesrID withFinishResult:^(BOOL resetSuc) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"set_userid_success_am"};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM3SErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(syncRealTime:(nonnull NSString *)mac){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SSyncTime:^(BOOL resetSuc) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"set_sync_time_success_am"};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        } withErrorBlock:^(AM3SErrorID errorID) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(setUserInfo:(nonnull NSString *)mac :(nonnull NSNumber *)age :(nonnull NSNumber *)height :(nonnull NSNumber *)weight :(nonnull NSNumber *)gender :(nonnull NSNumber *)unit :(nonnull NSNumber *)target :(nonnull NSNumber *)activityLevel){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        HealthUser *myUser = [[HealthUser alloc]init];
        myUser.age = age;
        myUser.sex = UserSex_Male;
        myUser.height = height;
        myUser.weight = weight;
        myUser.activityLevel = activityLevel;
        
        NSDictionary *dic = [[NSMutableDictionary alloc]init];
        [[self getAM3SWithMac:mac] commandAM3SSetUserInfo:myUser withUnit:unit withActiveGoal:target withSetUserInfoFinishResult:^(BOOL resetSuc) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"set_userinfo_success_am"};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withSetBMR:^(BOOL resetSuc) {
            
            
        } withErrorBlock:^(AM3SErrorID errorID) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(getUserInfo:(nonnull NSString *)mac){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SGetUserInfo:^(NSDictionary *userInfo) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"get_userinfo_am",@"age":[userInfo valueForKey:@"Age"],@"step":[userInfo valueForKey:@"Step"],@"height":[userInfo valueForKey:@"Height"],@"gender":[userInfo valueForKey:@"Gender"],@"weight":[userInfo valueForKey:@"Weight"],@"unit":[userInfo valueForKey:@"Unit"],@"target1":[userInfo valueForKey:@"TotalStep1"],@"target2":[userInfo valueForKey:@"TotalStep2"],@"target3":[userInfo valueForKey:@"TotalStep3"],@"swim_target":[userInfo valueForKey:@"SwimmingGoal"]};
            
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM3SErrorID errorID) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(getAlarmClockNum:(nonnull NSString *)mac){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SGetTotoalAlarmInfo:^(NSMutableArray *totoalAlarmArray) {
            
            NSMutableArray * IDArray = [[NSMutableArray alloc]init];
            
            if (totoalAlarmArray.count > 0){
                
                for (NSDictionary *dic in totoalAlarmArray) {
                    [IDArray addObject:[dic valueForKey:@"AlarmId"]];
                }
            }
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"get_alarmnum_am",@"alarmclocknumber":[NSNumber numberWithInt:IDArray.count],@"alarmclocknumberid":IDArray};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM3SErrorID errorID) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(getAlarmClockDetail:(nonnull NSString *)mac){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SGetTotoalAlarmInfo:^(NSMutableArray *totoalAlarmArray) {
            
            NSMutableArray * alarmInfoArray = [[NSMutableArray alloc]init];
            
            if (totoalAlarmArray.count > 0){
                
                for (NSDictionary *dic in totoalAlarmArray) {
                    
                    NSMutableDictionary *alartDic = [[NSMutableDictionary alloc]init];
                    [alartDic setValue:[dic valueForKey:@"AlarmId"] forKey:@"alarmid"];
                    [alartDic setValue:[dic valueForKey:@"Time"] forKey:@"time"];
                    [alartDic setValue:[dic valueForKey:@"IsRepeat"] forKey:@"repeat"];
                    
                    NSMutableDictionary * weekDic = [[NSMutableDictionary alloc]init];
                    [weekDic setValue:[[dic valueForKey:@"Week"] objectAtIndex:0] forKey:@"sun"];
                    [weekDic setValue:[[dic valueForKey:@"Week"] objectAtIndex:1] forKey:@"mon"];
                    [weekDic setValue:[[dic valueForKey:@"Week"] objectAtIndex:2] forKey:@"tue"];
                    [weekDic setValue:[[dic valueForKey:@"Week"] objectAtIndex:3] forKey:@"wed"];
                    [weekDic setValue:[[dic valueForKey:@"Week"] objectAtIndex:4] forKey:@"thu"];
                    [weekDic setValue:[[dic valueForKey:@"Week"] objectAtIndex:5] forKey:@"fri"];
                    [weekDic setValue:[[dic valueForKey:@"Week"] objectAtIndex:6] forKey:@"sat"];
                    
                    [alartDic setValue:weekDic forKey:@"get_alarm_week"];
                    [alartDic setValue:[dic valueForKey:@"Switch"] forKey:@"switch"];
                    
                    [alarmInfoArray addObject:alartDic];
                }
            }
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"get_alarminfo_am",@"alarmclockdetail":alarmInfoArray};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM3SErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(setAlarmClock:(nonnull NSString *)mac :(nonnull NSNumber *)alarmID :(nonnull NSNumber *)hour :(nonnull NSNumber *)min :(nonnull  BOOL*)isRepeat :(nonnull NSArray *)weekArray :(nonnull BOOL *)isOn){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        NSDateFormatter *formater=[[NSDateFormatter alloc]init];
        [formater setTimeZone:[NSTimeZone defaultTimeZone]];
        [formater setLocale:[[NSLocale alloc] initWithLocaleIdentifier:@"en_US"]];
        [formater setDateFormat:@"HH-mm"];
        NSString * timeStr = [NSString stringWithFormat:@"%@-%@",hour,min];
        NSDate *date = [formater dateFromString:timeStr];
        
        NSMutableArray *weeksArray = [[NSMutableArray alloc]init];
        NSNumber *SUNDAY = [weekArray valueForKey:@"sun"];
        NSNumber *MONDAY = [weekArray valueForKey:@"mon"];
        NSNumber *TUESDAY = [weekArray valueForKey:@"tue"];
        NSNumber *WEDNESDAY = [weekArray valueForKey:@"wed"];
        NSNumber *THURSDAY = [weekArray valueForKey:@"thu"];
        NSNumber *FRIDAY = [weekArray valueForKey:@"fri"];
        NSNumber *SATURDAY = [weekArray valueForKey:@"sat"];
        
        [weeksArray addObject:SUNDAY];
        [weeksArray addObject:MONDAY];
        [weeksArray addObject:TUESDAY];
        [weeksArray addObject:WEDNESDAY];
        [weeksArray addObject:THURSDAY];
        [weeksArray addObject:FRIDAY];
        [weeksArray addObject:SATURDAY];
        
        NSDictionary *dic = [[NSDictionary alloc]initWithObjectsAndKeys:alarmID,@"AlarmId",date,@"Time",isRepeat,@"IsRepeat",weeksArray,@"Week",isOn,@"Switch", nil];
        
        [[self getAM3SWithMac:mac] commandAM3SSetAlarmDictionary:dic withFinishResult:^(BOOL resetSuc) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"set_alarminfo_success_am"};
            
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM3SErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(deleteAlarmClock:(nonnull NSString *)mac :(nonnull NSNumber *)alarmID){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SDeleteAlarmID:alarmID withFinishResult:^(BOOL resetSuc) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"delete_alarm_success_am"};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM3SErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(getActivityRemind:(nonnull NSString *)mac){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SGetReminderInfo:^(NSArray *remindInfo) {
            
            NSDictionary *dic = [remindInfo objectAtIndex:0];
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"get_activity_remind_am",@"time":[dic valueForKey:@"Time"],@"switch":[dic valueForKey:@"Switch"]};
            
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM3SErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(setActivityRemind:(nonnull NSString *)mac :(nonnull NSNumber *)hour :(nonnull NSNumber *)min :(nonnull BOOL *)isOn){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        NSDateFormatter *formater=[[NSDateFormatter alloc]init];
        [formater setTimeZone:[NSTimeZone defaultTimeZone]];
        [formater setLocale:[[NSLocale alloc] initWithLocaleIdentifier:@"en_US"]];
        [formater setDateFormat:@"HH-mm"];
        NSString * timeStr = [NSString stringWithFormat:@"%@-%@",hour,min];
        NSDate *date = [formater dateFromString:timeStr];
        
        
        NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:date,@"Time",isOn,@"Switch", nil];
        
        [[self getAM3SWithMac:mac] commandAM3SSetReminderDictionary:dic withFinishResult:^(BOOL resetSuc) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"set_activityremind_success_am"};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        } withErrorBlock:^(AM3SErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(syncActivityData:(nonnull NSString *)mac){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SStartSyncActiveData:^(NSDictionary *startDataDictionary) {
            
            
            
        } withActiveHistoryData:^(NSArray *historyDataArray) {
            
            NSMutableArray *lastArray = [[NSMutableArray alloc]init];
            for (NSDictionary *dic in historyDataArray) {
                
                NSMutableDictionary * lastDic = [[NSMutableDictionary alloc]init];
                
                [lastDic setValue:[dic valueForKey:AMDate] forKey:@"time"];
                [lastDic setValue:[dic valueForKey:AMStepSize] forKey:@"stepsize"];
                [lastDic setValue:[dic valueForKey:AMCalorie] forKey:@"calorie"];
                [lastDic setValue:[dic valueForKey:AMStepNum] forKey:@"step"];
                [lastDic setValue:[dic valueForKey:@"dataID"] forKey:@"dataID"];
                [lastArray addObject:lastDic];
            }
            
            NSDictionary *dictionary = [NSDictionary dictionaryWithObject:lastArray forKey:@"activity_each_data"];
            NSArray *array = [NSArray arrayWithObjects:dictionary, nil];
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"sync_activity_data_am",@"activity":array};
            
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withActiveFinishTransmission:^{
            
            
        } withErrorBlock:^(AM3SErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(syncSleepData:(nonnull NSString *)mac){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SStartSyncSleepData:^(NSDictionary *startDataDictionary) {
            
            
        } withSleepHistoryData:^(NSArray *historyDataArray) {
            
            NSMutableArray *lastArray = [[NSMutableArray alloc]init];
            
            
            for (NSArray *array in historyDataArray) {
                
                for (NSDictionary *dic in array) {
                    
                    NSMutableDictionary * lastDic = [[NSMutableDictionary alloc]init];
                    [lastDic setValue:[dic valueForKey:AMDate] forKey:@"time"];
                    [lastDic setValue:[dic valueForKey:@"SleepData"] forKey:@"level"];
                    [lastDic setValue:[dic valueForKey:@"dataID"] forKey:@"dataID"];
                    [lastArray addObject:lastDic];
                    
                }
            }
            
            NSDictionary *dictionary = [NSDictionary dictionaryWithObject:lastArray forKey:@"sleep_each_data"];
            NSArray *array = [NSArray arrayWithObjects:dictionary, nil];
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"sync_sleep_data_am",@"sleep":array};
            
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
            
        } withSleepFinishTransmission:^{
            
        } withErrorBlock:^(AM3SErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(syncStageReprotData:(nonnull NSString *)mac){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SStartSyncStageData:^(NSArray *measureDataArray) {
            
            NSMutableArray *lastArray = [[NSMutableArray alloc]init];
            
            
            NSPredicate *pre = [NSPredicate predicateWithFormat:@"ReportState == 1"];
            NSArray *workoutArray = [measureDataArray filteredArrayUsingPredicate:pre];
            if (workoutArray.count != 0)
            {
                for (NSDictionary *dic in workoutArray) {
                    
                    NSMutableDictionary *dictionary = [[NSMutableDictionary alloc]init];
                    [dictionary setValue:@"stage_data_type_workout" forKey:@"type"];
                    [dictionary setValue:[dic valueForKey:Work_outMeasureDate] forKey:@"stoptime"];
                    [dictionary setValue:[dic valueForKey:Work_outTimeNumber] forKey:@"usedtime"];
                    [dictionary setValue:[dic valueForKey:Work_outStepNumber] forKey:@"stage_data_workout_step"];
                    [dictionary setValue:[dic valueForKey:Work_outLengthNumber] forKey:@"stage_data_distance"];
                    [dictionary setValue:[dic valueForKey:Work_outCalories] forKey:@"calorie"];
                    [dictionary setValue:[dic valueForKey:@"dataID"] forKey:@"dataID"];
                    [lastArray addObject:dictionary];
                }
            }
            
            NSPredicate *predicateSleep = [NSPredicate predicateWithFormat:@"ReportState == 2"];
            NSArray *sleepArray = [measureDataArray filteredArrayUsingPredicate:predicateSleep];
            if (sleepArray.count != 0)
            {
                for (NSDictionary *dic in workoutArray) {
                    
                    NSMutableDictionary *dictionary = [[NSMutableDictionary alloc]init];
                    [dictionary setValue:@"sleep" forKey:@"type"];
                    [dictionary setValue:[dic valueForKey:Sleep_summaryMeasureDate] forKey:@"stoptime"];
                    [dictionary setValue:[dic valueForKey:Sleep_summarySleepTime] forKey:@"usedtime"];
                    [dictionary setValue:[dic valueForKey:Sleep_summarysleepEfficiency] forKey:@"sleepefficiency"];
                    [dictionary setValue:[dic valueForKey:Sleep_summarysleepAddMinute] forKey:@"is50min"];
                    [lastArray addObject:dictionary];
                }
                
            }
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"sync_stage_data_am",@"stage_data":lastArray};
            
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
            
        } withStageDataFinishTransmission:^(BOOL resetSuc) {
            
            
            
            
        } withErrorBlock:^(AM3SErrorID errorID) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(syncRealData:(nonnull NSString *)mac){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SStartSyncCurrentActiveData:^(NSDictionary *activeDictionary) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"sync_real_data_am",@"step":[activeDictionary valueForKey:@"Step"],@"calorie":[activeDictionary valueForKey:@"Calories"],@"totalcalories":[activeDictionary valueForKey:@"TotalCalories"]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM3SErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(queryAMState:(nonnull NSString *)mac){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        __block NSInteger index;
        
        [[self getAM3SWithMac:mac] commandAM3SGetDeviceStateInfo:^(AM3SQueryState queryState) {
            
            index = queryState;
            
        } withBattery:^(NSNumber *battery) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"query_state_am",@"query_state":[NSNumber numberWithInteger:index],@"battery":battery};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM3SErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(setUserBmr:(nonnull NSString *)mac :(nonnull NSNumber *)bmr){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SSetBMR:bmr withFinishResult:^(BOOL resetSuc) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"set_bmr_success_am"};
            
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM3SErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(sendRandom:(nonnull NSString *)mac){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SSetRandomNumber:^(NSString *randomNumString) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"get_random_am",@"random":randomNumString};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        } withErrorBlock:^(AM3SErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(disconnect:(nonnull NSString *)mac){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SDisconnect:^(BOOL resetSuc) {
            
            NSDictionary* deviceInfo = @{@"mac":mac};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        } withErrorBlock:^(AM3SErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(setHourMode:(nonnull NSString *)mac){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SSetTimeFormatAndNation:^(BOOL resetSuc) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"set_hour_mode_success_am"};
            
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        } withErrorBlock:^(AM3SErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(getHourMode:(nonnull NSString *)mac){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SGetTimeFormatAndNation:^(AM3STimeFormatAndNation timeFormatAndNation) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"get_hour_mode_am"};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        } withErrorBlock:^(AM3SErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}




RCT_EXPORT_METHOD(setPicture:(nonnull NSString *)mac :(nonnull NSNumber *)index){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SSetPicture:index withFinishResult:^(BOOL resetSuc) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"set_picture_success_am"};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        } withErrorBlock:^(AM3SErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(getPicture:(nonnull NSString *)mac){
    
    if ([self getAM3SWithMac:mac]!=nil) {
        
        [[self getAM3SWithMac:mac] commandAM3SGetPicture:^(AM3SPicture picture) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"get_picture_am",@"get_picture_am":[NSNumber numberWithInt:picture]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        } withErrorBlock:^(AM3SErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}





@end
