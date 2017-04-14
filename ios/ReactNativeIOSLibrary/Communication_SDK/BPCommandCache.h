//
//  BPCommandCache.h
//  iHealthDemoCode
//
//  Created by Realank on 2017/1/9.
//  Copyright © 2017年 zhiwei jing. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef void(^DisposeSendBPDataBlock)();

typedef enum{
    BPCommandActionStartMeasure = 0,
    BPCommandActionStopBPMeassure,
    BPCommandActionFunction,
    BPCommandActionEnergy,
    BPCommandActionSetBlueConnect,
    BPCommandActionSetOffline,
    BPCommandActionGetAngle,
    BPCommandActionUpload,
    BPCommandActionMemoryTotalCount,
    BPCommandActionMemoryData,
    BPCommandActionSetUnit,
}BPCommandAction;

@protocol BPCommandCacheDelegate <NSObject>

@required
- (BOOL)commandCacheShouldIgnoreAction:(BPCommandAction)action;

@end

@interface BPCommandCache : NSObject


@property (nonatomic,weak) id<BPCommandCacheDelegate> delegate;


- (void)removeFirstCommandCache;
- (BOOL)removeFirstCommandCacheIfActionIs:(BPCommandAction)action;
- (void)clearAllResource;
- (void)addCommandCacheWithAction:(BPCommandAction)action timeout:(NSInteger)timeout cacheBlock:(DisposeSendBPDataBlock)disposeCacheBlock;

@end
