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

export default class PO3View extends Component {

    constructor(props) {
        super(props);

        var error_Listener = null;
        var connectionListener = null;
        var notifyListener = null;
    }

    componentWillMount() {
        log.info('PO3View', 'componentWillMount', null);
        this._addListener();

    }

    componentWillUnmount() {
        log.info('PO3View', 'componentWillUnmount', null);
        this._removeListener();
    }



    _addListener() {
        let self = this;

        this.error_Listener = DeviceEventEmitter.addListener(POProfileModule.ACTION_ERROR_PO, function (e: Error) {
            log.info('PO3View', 'addListener_ACTION_ERROR_PO', JSON.stringify(e));
            self.refs.TipView.setState({tip: JSON.stringify(e)});
        });
        this.connectionListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.DeviceDisconnect, function (e: Event) {
            // handle event.
            log.info('PO3View', 'addListener_DeviceDisconnect', JSON.stringify(e));
            self.props.navigator.pop();
        });
        this.notifyListener = DeviceEventEmitter.addListener(PO3Module.NOTIFY_EVENT_BP5, function (e: Event) {
            log.info('PO3View', e.action, JSON.stringify(e));
            self.refs.TipView.setState({tip: JSON.stringify(e)});
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
                        onPress={() => this._getBattery()}>
                        <Text style={styles.buttonText}>
                            获得电量
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
        PO3Module.startMeasure(this.props.mac)
    }

    _getBattery() {
        PO3Module.getBattery(this.props.mac)
    }
    _getOfflineData() {
        PO3Module.getHistoryData(this.props.mac)
    }
    _disconnect() {
        PO3Module._disconnect(this.props.mac)
    }
}
