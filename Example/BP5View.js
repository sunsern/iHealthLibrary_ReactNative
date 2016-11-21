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
        console.info('TipView', 'render()', null);
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

    }

    componentWillMount() {
        console.info('BP5View', 'componentWillMount', null);
        this._addListener();

    }

    componentDidMount() {
        console.info('BP5View', 'componentDidMount', null);
    }


    componentWillReceiveProps() {
        console.info('BP5View', 'componentWillReceiveProps', null);
    }

    shouldComponentUpdate() {
        console.info('BP5View', 'shouldComponentUpdate', null);
    }

    componentWillUpdate() {
        console.info('BP5View', 'componentWillUpdate', null);
    }

    componentDidUpdate() {
        console.info('BP5View', 'componentDidUpdate', null);
    }

    componentWillUnmount() {
        console.info('BP5View', 'componentWillUnmount', null);
        this._removeListener();
    }



    _addListener() {
        let self = this;

        this.connectionListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.DeviceDisconnect, function (e: Event) {
            // handle event.
            console.info('BP5View', 'addListener_DeviceDisconnect', JSON.stringify(e));
            self.props.navigator.pop();
        });
        this.notifyListener = DeviceEventEmitter.addListener(BP5Module.NOTIFY_EVENT_BP5, function (e: Event) {

            console.info('BP5View', 'addListener_DeviceDisconnect',"Action = " +  e.action + '\n' + "Message = " +  JSON.stringify(e));
            if (e.action === BPProfileModule.Action_Battery) {
                self.refs.TipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.Action_Zeroing) {
                self.refs.TipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.Action_ZeroOver) {
                self.refs.TipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.Action_Pressure) {
                self.refs.TipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.Action_PulseWave) {
                self.refs.TipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.Action_Result) {
                self.refs.TipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.Action_getOffLineDataNum) {
                self.refs.TipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.Action_getOffLineData) {
                self.refs.TipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.Action_enableOffline) {
                self.refs.TipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.Action_disEnableOffline) {
                self.refs.TipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.Action_is_enable_offline) {
                self.refs.TipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.Action_interrupted) {
                self.refs.TipView.setState({tip: JSON.stringify(e)});
            }



        });
    }

    _removeListener() {
        //Unregister  event
        if (this.connectionListener) {
            this.connectionListener.remove()
        }
        if (this.notifyListener) {
            this.notifyListener.remove()
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
            console.info('deviceInfo:' + JSON.stringify(e));
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
