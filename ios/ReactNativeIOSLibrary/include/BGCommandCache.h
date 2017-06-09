//
//  BGCommandCache.h
//  iHealthDemoCode
//
//  Created by Realank on 2017/1/9.
//  Copyright © 2017年 zhiwei jing. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef void(^DisposeSendBGDataBlock)();

typedef enum{
    
    BGCommandActionSetTime=0,
    BGCommandActionSetUnitState,
    BGCommandActionSetUnit,
    BGCommandActionGetBottleID,
    BGCommandActionReadMemory,
    BGCommandActionTransferMemory,
    BGCommandActionDeleteMemorry,
    BGCommandActionReadBGCode,
    BGCommandActionSendBGCode,
    BGCommandActionCreateBGtestStripIn,
    BGCommandActionCreateBGtestModel,
    BGCommandActionQueryBattery,
    BGCommandActionKeepConnect,
    BGCommandActionSendBottleID,
    BGCommandActionBGGetTime
    
}BGCommandAction;

@protocol BGCommandCacheDelegate <NSObject>

@required
- (BOOL)commandCacheShouldIgnoreAction:(BGCommandAction)action;

@end

@interface BGCommandCache : NSObject


@property (nonatomic,weak) id<BGCommandCacheDelegate> delegate;


- (void)removeFirstCommandCache;
- (BOOL)removeFirstCommandCacheIfActionIs:(BGCommandAction)action;
- (void)clearAllResource;
- (void)addCommandCacheWithAction:(BGCommandAction)action timeout:(NSInteger)timeout cacheBlock:(DisposeSendBGDataBlock)disposeCacheBlock;


@end
