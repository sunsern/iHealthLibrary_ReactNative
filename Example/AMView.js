import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    DeviceEventEmitter,
    ScrollView
} from 'react-native';

import {
    iHealthDeviceManagerModule,
    AM4Module,
    AM3SModule
} from 'ihealthlibrary-react-native'
/**
 * Created by Jeepend on 16/11/2016.
 */
var styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        marginTop: 60
    },
    // 导航栏
    heading: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center', // 内容居中显示
        marginBottom: 10
    },
    // 导航栏文字
    headText: {
        color: '#ff5555',
        fontSize: 22
    },
    // 按钮
    button: {
        height: 45,
        marginTop: 10,
        justifyContent: 'center', // 内容居中显示
        backgroundColor: '#eedddd',
        alignItems: 'center'
    },
    // 按钮文字
    buttonText: {
        fontSize: 18
    },
    cell: {
        marginTop: 10,
        height: 25,
        alignItems: 'flex-start',
        justifyContent: 'center', // 内容居中显示
        marginBottom: 5
    },
});

export default class AMView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resultText: ""
        }
    }

    render() {
        console.log("AMView render() type = " + this.props.type)
        if (this.props.type == 'AM4') {
            return (
                <View
                    style={styles.container}>
                    <Text
                        style={{height: 100}}>{this.state.resultText}</Text>
                    <ScrollView>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.disconnect(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                Disconnect
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.getIdps(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                GetIdps
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.reset(this.props.mac, 0)
                            }}>
                            <Text style={styles.buttonText}>
                                reset
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.getUserId(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                getUserId
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.getAlarmClockNum(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                getAlarmClockNum
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.getAlarmClockDetail(this.props.mac, [1, 3, 2])
                            }}>
                            <Text style={styles.buttonText}>
                                getAlarmClockDetail
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.setAlarmClock(this.props.mac, 1, 12, 0, true, [1, 1, 1, 1, 1, 0, 0], false)
                            }}>
                            <Text style={styles.buttonText}>
                                setAlarmClock
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.deleteAlarmClock(this.props.mac, 1)
                            }}>
                            <Text style={styles.buttonText}>
                                deleteAlarmClock
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.getActivityRemind(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                getActivityRemind
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.setActivityRemind(this.props.mac, 0, 30, false)
                            }}>
                            <Text style={styles.buttonText}>
                                setActivityRemind
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.queryAMState(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                queryAMState
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.setUserId(this.props.mac, 8)
                            }}>
                            <Text style={styles.buttonText}>
                                setUserId
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.getUserInfo(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                getUserInfo
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.setUserBmr(this.props.mac, 2000)
                            }}>
                            <Text style={styles.buttonText}>
                                setUserBmr
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.syncActivityData(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                syncActivityData
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.syncSleepData(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                syncSleepData
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.syncRealData(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                syncRealData
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.syncRealTime(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                syncRealTime
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.setHourMode(this.props.mac, 0)
                            }}>
                            <Text style={styles.buttonText}>
                                setHourMode
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.getHourMode(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                getHourMode
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.setUserInfo(this.props.mac, 25, 183, 80, 0, 0, 1000, 1, 30)
                            }}>
                            <Text style={styles.buttonText}>
                                setUserInfo
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.syncStageReportData(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                syncStageReportData
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.sendRandom(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                sendRandom
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.checkSwimPara(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                checkSwimPara
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM4Module.setSwimPara(this.props.mac, true, 25, 0, 10, 0)
                            }}>
                            <Text style={styles.buttonText}>
                                setSwimPara
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            )
        } else {
            // AM3S
            return (
                <View
                    style={styles.container}>
                    <Text
                        style={{height: 100}}>{this.state.resultText}</Text>
                    <ScrollView>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.disconnect(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                Disconnect
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.getIdps(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                GetIdps
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.reset(this.props.mac, 0)
                            }}>
                            <Text style={styles.buttonText}>
                                reset
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.getUserId(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                getUserId
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.getAlarmClockNum(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                getAlarmClockNum
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.getAlarmClockDetail(this.props.mac, [1, 3, 2])
                            }}>
                            <Text style={styles.buttonText}>
                                getAlarmClockDetail
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.setAlarmClock(this.props.mac, 1, 12, 0, true, [1, 1, 1, 1, 1, 0, 0], false)
                            }}>
                            <Text style={styles.buttonText}>
                                setAlarmClock
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.deleteAlarmClock(this.props.mac, 1)
                            }}>
                            <Text style={styles.buttonText}>
                                deleteAlarmClock
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.getActivityRemind(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                getActivityRemind
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.setActivityRemind(this.props.mac, 0, 30, false)
                            }}>
                            <Text style={styles.buttonText}>
                                setActivityRemind
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.queryAMState(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                queryAMState
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.setUserId(this.props.mac, 8)
                            }}>
                            <Text style={styles.buttonText}>
                                setUserId
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.getUserInfo(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                getUserInfo
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.setUserBmr(this.props.mac, 2000)
                            }}>
                            <Text style={styles.buttonText}>
                                setUserBmr
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.syncActivityData(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                syncActivityData
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.syncSleepData(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                syncSleepData
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.syncRealData(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                syncRealData
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.syncRealTime(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                syncRealTime
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.setHourMode(this.props.mac, 0)
                            }}>
                            <Text style={styles.buttonText}>
                                setHourMode
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.getHourMode(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                getHourMode
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.setUserInfo(this.props.mac, 25, 183, 80, 0, 0, 1000, 1)
                            }}>
                            <Text style={styles.buttonText}>
                                setUserInfo
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.syncStageReportData(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                syncStageReportData
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.sendRandom(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                sendRandom
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.getPicture(this.props.mac)
                            }}>
                            <Text style={styles.buttonText}>
                                getPicture
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                AM3SModule.setPicture(this.props.mac, 1)
                            }}>
                            <Text style={styles.buttonText}>
                                setPicture
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            )
        }

    }

    componentDidMount() {
        let self = this
        this.disconnectListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Connected, function (e: Event) {
            // handle event.
            if (e.mac == self.props.mac) {
                self.props.navigator.pop()
            }
        });
        let eventName = this.props.type == 'AM4' ? AM4Module.Event_Notify : AM3SModule.Event_Notify
        this.notifyListener = DeviceEventEmitter.addListener(eventName, function (e: Event) {
            self.setState({resultText: "event: " + JSON.stringify(e)})
        });
    }

    componentWillUnmount() {
        this.disconnectListener.remove()
        this.notifyListener.remove()
    }
}