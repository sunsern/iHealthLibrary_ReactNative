/**
 * Created by zhangxu on 16/11/11.
 */
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
    BP5Module,
    BPProfileModule
} from 'ihealthlibrary-react-native'

import Log from './Log'

let log = new Log;

var styles = StyleSheet.create({
    container: {
        margin: 20,
        marginTop: 50
    },
    contentContainer: {
        height: 400,
    },
    // 按钮
    button: {
        height: 60,
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


class TipView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tip: ''
        };
    }

    render() {
        log.info('TipView', 'render()', null);
        return (
            <View>
                <Text> Tip: {this.state.tip} </Text>
            </View>
        )
    }

}

export default class BP5View extends Component {

    constructor(props) {
        super(props);

        var error_Listener = null;
        var connectionListener = null;
        var battery_Listerner = null;
        var enableOffline_Listener = null;
        var disEnableOffline_Listener = null;
        var is_enable_offline_Listener = null;

        var getOffLineNum_Listerner = null;
        var getOffLineData_Listerner = null;

        var interrupted_Listener = null;
        var Zeroing_Listerner = null;
        var ZeroOver_Listerner = null;
        var Pressure_Listerner = null;
        var PulseWave_Listerner = null;
        var Result_Listerner = null;


    }

    componentWillMount() {
        log.info('BP5View', 'componentWillMount', null);
        this._addListener();

    }

    componentDidMount() {
        log.info('BP5View', 'componentDidMount', null);
    }


    componentWillReceiveProps() {
        log.info('BP5View', 'componentWillReceiveProps', null);
    }

    shouldComponentUpdate() {
        log.info('BP5View', 'shouldComponentUpdate', null);
    }

    componentWillUpdate() {
        log.info('BP5View', 'componentWillUpdate', null);
    }

    componentDidUpdate() {
        log.info('BP5View', 'componentDidUpdate', null);
    }

    componentWillUnmount() {
        log.info('BP5View', 'componentWillUnmount', null);
        this._removeListener();
    }



    _addListener() {
        let self = this;

        this.error_Listener = DeviceEventEmitter.addListener(BPProfileModule.Action_Error, function (e: Error) {
            log.info('BP5View', 'addListener_Action_Error', JSON.stringify(e));
            self.refs.TipView.setState({tip: JSON.stringify(e)});
        });
        this.connectionListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.DeviceDisconnect, function (e: Event) {
            // handle event.
            log.info('BP5View', 'addListener_DeviceDisconnect', JSON.stringify(e));
            self.props.navigator.pop();
        });

        this.battery_Listerner = DeviceEventEmitter.addListener(BPProfileModule.Action_Battery, function (e: Event) {
            // handle event.
            log.info('BP5View', 'addListener_Action_Battery', JSON.stringify(e));
            self.refs.TipView.setState({tip: JSON.stringify(e)});
        });
        this.Zeroing_Listerner = DeviceEventEmitter.addListener(BPProfileModule.Action_Zeroing, function (e: Event) {
            // handle event.
            log.info('BP5View', 'addListener_Action_Zeroing', JSON.stringify(e));
            self.refs.TipView.setState({tip: JSON.stringify(e)})
        });
        this.ZeroOver_Listerner = DeviceEventEmitter.addListener(BPProfileModule.Action_ZeroOver, function (e: Event) {
            // handle event.
            log.info('BP5View', 'addListener_Action_ZeroOver', JSON.stringify(e));
            self.refs.TipView.setState({tip: JSON.stringify(e)})
        });
        this.Pressure_Listerner = DeviceEventEmitter.addListener(BPProfileModule.Action_Pressure, function (e: Event) {
            // handle event.
            log.info('BP5View', 'addListener_Action_Pressure', JSON.stringify(e));
            self.refs.TipView.setState({tip: JSON.stringify(e)})
        });
        this.PulseWave_Listerner = DeviceEventEmitter.addListener(BPProfileModule.Action_PulseWave, function (e: Event) {
            // handle event.
            log.info('BP5View', 'addListener_Action_PulseWave', JSON.stringify(e));
            self.refs.TipView.setState({tip: JSON.stringify(e)})
        });
        this.Result_Listerner = DeviceEventEmitter.addListener(BPProfileModule.Action_Result, function (e: Event) {
            // handle event.
            log.info('BP5View', 'addListener_Action_Result', JSON.stringify(e));
            self.refs.TipView.setState({tip: JSON.stringify(e)})
        });

        this.interrupted_Listener = DeviceEventEmitter.addListener(BPProfileModule.Action_interrupted, function (e: Event) {
            // handle event.
            log.info('BP5View', 'addListener_Action_interrupted', JSON.stringify(e));
            self.refs.TipView.setState({tip: JSON.stringify(e)})
        });

        this.enableOffline_Listener = DeviceEventEmitter.addListener(BPProfileModule.Action_enableOffline, function (e: Event) {
            // handle event.
            log.info('BP5View', 'addListener_Action_enableOffline', JSON.stringify(e));
            self.refs.TipView.setState({tip: JSON.stringify(e)})
        });
        this.disEnableOffline_Listener = DeviceEventEmitter.addListener(BPProfileModule.Action_disEnableOffline, function (e: Event) {
            // handle event.
            log.info('BP5View', 'addListener_Action_disEnableOffline', JSON.stringify(e));
            self.refs.TipView.setState({tip: JSON.stringify(e)})
        });
        this.is_enable_offline_Listener = DeviceEventEmitter.addListener(BPProfileModule.Action_is_enable_offline, function (e: Event) {
            // handle event.
            log.info('BP5View', 'addListener_Action_is_enable_offline', JSON.stringify(e));
            self.refs.TipView.setState({tip: JSON.stringify(e)})
        });
        this.getOffLineNum_Listerner = DeviceEventEmitter.addListener(BPProfileModule.Action_getOffLineDataNum, function (e: Event) {
            // handle event.
            log.info('BP5View', 'addListener_Action_getOffLineDataNum', JSON.stringify(e));
            self.refs.TipView.setState({tip: JSON.stringify(e)})
        });
        this.getOffLineData_Listerner = DeviceEventEmitter.addListener(BPProfileModule.Action_getOffLineData, function (e: Event) {
            // handle event.
            log.info('BP5View', 'addListener_Action_getOffLineData', JSON.stringify(e));
            self.refs.TipView.setState({tip: JSON.stringify(e)})
        });
    }

    _removeListener() {
        //Unregister  event
        if (this.connectionListener) {
            this.connectionListener.remove()
        }
        if (this.battery_Listerner) {
            this.battery_Listerner.remove()
        }
        if (this.Zeroing_Listerner) {
            this.Zeroing_Listerner.remove()
        }
        if (this.ZeroOver_Listerner) {
            this.ZeroOver_Listerner.remove()
        }
        if (this.Pressure_Listerner) {
            this.Pressure_Listerner.remove()
        }
        if (this.PulseWave_Listerner) {
            this.PulseWave_Listerner.remove()
        }
        if (this.Result_Listerner) {
            this.Result_Listerner.remove()
        }
        if (this.interrupted_Listener) {
            this.interrupted_Listener.remove()
        }
        if (this.error_Listener) {
            this.error_Listener.remove()
        }
        if (this.enableOffline_Listener) {
            this.enableOffline_Listener.remove()
        }
        if (this.disEnableOffline_Listener) {
            this.disEnableOffline_Listener.remove()
        }
        if (this.is_enable_offline_Listener) {
            this.is_enable_offline_Listener.remove()
        }
        if (this.getOffLineNum_Listerner) {
            this.getOffLineNum_Listerner.remove()
        }
        if (this.getOffLineData_Listerner) {
            this.getOffLineData_Listerner.remove()
        }
    }

    render() {

        return (
            <View style={styles.container}>

                <ScrollView style={styles.contentContainer}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._getDeviceIDPS()}>
                        <Text style={styles.buttonText}>
                            获得IDPS
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._startMeasure()}>
                        <Text style={styles.buttonText}>
                            开始测量
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._stopMeasure()}>
                        <Text style={styles.buttonText}>
                            终止测量
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._getBattery()}>
                        <Text style={styles.buttonText}>
                            获得电量
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._enbleOffline()}>
                        <Text style={styles.buttonText}>
                            使能离线测量
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._disableOffline()}>
                        <Text style={styles.buttonText}>
                            使不能离线测量
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._isEnableOffline()}>
                        <Text style={styles.buttonText}>
                            是否能离线测量
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._getOfflineNum()}>
                        <Text style={styles.buttonText}>
                            获得离线数据数量
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._getOfflineData()}>
                        <Text style={styles.buttonText}>
                            获得离线数据
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._disconnect()}>
                        <Text style={styles.buttonText}>
                            断开连接
                        </Text>
                    </TouchableOpacity>
                </ScrollView>


                <TipView ref="TipView"/>
            </View>
        )
    }
    _getDeviceIDPS() {
        iHealthDeviceManagerModule.getDevicesIDPS(this.props.mac, (e) => {
            console.log('deviceInfo:' + JSON.stringify(e));
            this.refs.TipView.setState({tip: JSON.stringify(e)})
        })
    }
    _startMeasure() {
        BP5Module.startMeasure(this.props.mac)
    }
    _stopMeasure() {
        BP5Module.stopMeasure(this.props.mac)
    }

    _getBattery() {
        BP5Module.getBattery(this.props.mac)
    }
    _enbleOffline() {
        BP5Module.enbleOffline(this.props.mac)
    }
    _disableOffline() {
        BP5Module.disableOffline(this.props.mac)
    }
    _isEnableOffline() {
        BP5Module.isEnableOffline(this.props.mac)
    }
    _getOfflineNum() {
        BP5Module.getOfflineNum(this.props.mac)
    }
    _getOfflineData() {
        BP5Module.getOfflineData(this.props.mac)
    }
    _disconnect() {
        BP5Module.disconnect(this.props.mac)
    }
}
