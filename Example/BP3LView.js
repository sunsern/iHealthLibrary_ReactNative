/**
 * Created by zhangxu on 16/11/11.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableNativeFeedback,
    DeviceEventEmitter,
    ScrollView
} from 'react-native';


import {
    iHealthDeviceManagerModule,
    BP3LModule,
    BPProfileModule
} from 'ihealthlibrary-react-native'

import Log from './Log';


var styles = StyleSheet.create({
    container: {
        margin: 20,
        marginTop: 60
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
        }

    }

    render() {
        return (
            <View>
                <Text>
                    Tip: {this.state.tip}
                </Text>
            </View>
        )
    }


}


let log = new Log;

export default class BP3LView extends Component {

    constructor(props) {
        super(props);

        var error_Listener = null;
        var connectionListener = null;
        var battery_Listerner = null;
        var Zeroing_Listerner = null;
        var ZeroOver_Listerner = null;
        var Pressure_Listerner = null;
        var PulseWave_Listerner = null;
        var Result_Listerner = null;
        var interrupted_Listener = null;

    }

    componentWillMount() {
        log.info('BP3LView', 'componentWillMount()', null);
        this._addListener();
    }

    componentDidMount() {
        log.info('BP3LView', 'componentDidMount()', null);
    }


    componentWillReceiveProps() {
        log.info('BP3LView', 'componentWillReceiveProps()', null);
    }

    shouldComponentUpdate() {
        log.info('BP3LView', 'shouldComponentUpdate()', null);
    }

    componentWillUpdate() {
        log.info('BP3LView', 'componentWillUpdate()', null);
    }

    componentDidUpdate() {
        log.info('BP3LView', 'componentDidUpdate()', null);
    }

    componentWillUnmount() {
        log.info('BP3LView', 'componentWillUnmount()', null);

        this._removeListener();

    }

    render() {

        log.info('BP3LView', 'render()', null);

        return (
            <View style={styles.container}>

                <ScrollView style={styles.contentContainer}>
                    <TouchableNativeFeedback

                        onPress={() => this._getDeviceIDPS()}>

                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                获得IDPS
                            </Text>
                        </View>


                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback

                        onPress={() => this._getBattery()}>

                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                获得电量
                            </Text>
                        </View>


                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback
                        onPress={() => this._startMeasure()}>

                        <View style={styles.button}>

                            <Text style={styles.buttonText}>
                                开始测量
                            </Text>
                        </View>


                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback

                        onPress={() => this._stopMeasure()}>

                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                停止测量
                            </Text>
                        </View>


                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback

                        onPress={() => this._disConnect()}>

                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                断开连接
                            </Text>
                        </View>


                    </TouchableNativeFeedback>

                </ScrollView>
                <TipView ref='tipView'/>

            </View>


        );


    }


    _addListener() {


        let self = this;
        this.error_Listener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Action_Error, function (e: Event) {
            log.info('BP3LView', '_addListener()_Action_Error', JSON.stringify(e));
            self.refs.TipView.setState({tip: JSON.stringify(e)});
        });
        this.connectionListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.DeviceDisconnect, function (e: Event) {
            log.info('BP3LView', '_addListener()_DeviceDisconnect', JSON.stringify(e));
            self.props.navigator.pop();
        });

        this.battery_Listerner = DeviceEventEmitter.addListener(BPProfileModule.Action_Battery, function (e: Event) {
            log.info('BP3LView', '_addListener()_Action_Battery', JSON.stringify(e));
            self.refs.tipView.setState({tip: JSON.stringify(e)})

        });

        this.Zeroing_Listerner = DeviceEventEmitter.addListener(BPProfileModule.Action_Zeroing, function (e: Event) {
            log.info('BP3LView', '_addListener()_Action_Zeroing', JSON.stringify(e));
            self.refs.tipView.setState({tip: JSON.stringify(e)})

        });

        this.ZeroOver_Listerner = DeviceEventEmitter.addListener(BPProfileModule.Action_ZeroOver, function (e: Event) {
            log.info('BP3LView', '_addListener()_Action_ZeroOver', JSON.stringify(e));
            self.refs.tipView.setState({tip: JSON.stringify(e)})
        });


        this.Pressure_Listerner = DeviceEventEmitter.addListener(BPProfileModule.Action_Pressure, function (e: Event) {
            log.info('BP3LView', '_addListener()_Action_Pressure', JSON.stringify(e));
            self.refs.tipView.setState({tip: JSON.stringify(e)})
        });

        this.PulseWave_Listerner = DeviceEventEmitter.addListener(BPProfileModule.Action_PulseWave, function (e: Event) {
            log.info('BP3LView', '_addListener()_Action_PulseWave', JSON.stringify(e));
            self.refs.tipView.setState({tip: JSON.stringify(e)})
        });

        this.Result_Listerner = DeviceEventEmitter.addListener(BPProfileModule.Action_Result, function (e: Event) {
            log.info('BP3LView', '_addListener()_Action_Result', JSON.stringify(e));
            self.refs.tipView.setState({tip: JSON.stringify(e)})
        });
        this.interrupted_Listener = DeviceEventEmitter.addListener(BPProfileModule.Action_interrupted, function (e: Event) {
            // handle event.
            log.info('BP3LView', 'addListener_Action_interrupted', JSON.stringify(e));
            self.refs.tipView.setState({tip: JSON.stringify(e)})
        });

    }

    _removeListener() {
        //Unregister  event
        if (this.error_Listener) {
            this.error_Listener.remove()
        }
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
    }


    _getDeviceIDPS() {
        iHealthDeviceManagerModule.getDevicesIDPS(this.props.mac, (e) => {
            console.log('deviceInfo:' + JSON.stringify(e));
            this.refs.tipView.setState({tip: JSON.stringify(e)})
        })
    }

    _startMeasure() {

        BP3LModule.startMeasure(this.props.mac);
    }

    _stopMeasure() {
        BP3LModule.stopMeasure(this.props.mac);
    }

    _getBattery() {
        BP3LModule.getBattery(this.props.mac);
    }

    _disConnect() {
        BP3LModule.disconnect(this.props.mac);
    }
}