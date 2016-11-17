import React, {Component} from 'react';
import {
    AppRegistry,
    Navigator,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ListView,
    DeviceEventEmitter,
    TouchableHighlight

} from 'react-native';

import BP5View from './BP5View';

import {
    SimpleListView
} from './SimpleListView';

import AMView from './AMView';

import {
    iHealthDeviceManagerModule
} from 'ihealthlibrary-react-native'


class MainView extends Component {
    constructor(props) {
        super(props);
        var scanListener = null
        var scanFinishListener = null
        var connectSuccessListener = null
        var disconnectListener = null
        var connectFailedListener = null
    }

    startDiscovery() {
        this.removeListener()
        this.addListener()
        discoverDeviceArray = new Array()
        this.refs.discoverListView.notifyDataSetChanged()
        iHealthDeviceManagerModule.startDiscovery(iHealthDeviceManagerModule.BP5)// | iHealthDeviceManagerModule.AM4
    }


    componentDidMount() {
        this.refs.connectedListView.notifyDataSetChanged()
        this.refs.discoverListView.notifyDataSetChanged()
    }

    componentWillUnmount() {
        console.log('~~~~~~~componentWillUnmount')
        //this.removeListener()
    }

    addListener() {
        let self = this
        this.scanListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.ScanDevice, function (e: Event) {
            // handle event.
            console.log('~~~' + JSON.stringify(e))
            self.updateDiscoveryList(e.mac, e.type)
        });
        this.scanFinishListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.ScanFinish, function (e: Event) {
            // handle event.
            console.log('~~~ScanFinish')
        });

        this.connectSuccessListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.DeviceConnected, function (e: Event) {
            // handle event.
            console.log('~~~' + JSON.stringify(e))
            self.updateConnectedList(e.mac, e.type, 1)
        });
        this.connectFailedListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.DeviceConnectFailed, function (e: Event) {
            // handle event.
            console.log('~~~' + JSON.stringify(e))
            self.updateConnectedList(e.mac, e.type, 3)
        });
        this.disconnectListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.DeviceDisconnect, function (e: Event) {
            // handle event.
            console.log('~~~' + JSON.stringify(e))
            self.updateConnectedList(e.mac, e.type, 2)
        });
    }

    removeListener() {
        //Unregister  event
        if (this.scanListener) {
            this.scanListener.remove()
        }
        if (this.scanFinishListener) {
            this.scanFinishListener.remove()
        }
        if (this.connectSuccessListener) {
            this.connectSuccessListener.remove()
        }
        if (this.connectFailedListener) {
            this.connectFailedListener.remove()
        }
        if (this.disconnectListener) {
            this.disconnectListener.remove()
        }
    }

    //Update discovery device list
    updateDiscoveryList(mac, type) {
        var existFlag = 0
        for (var i = 0; i < discoverDeviceArray.length; i++) {
            if (discoverDeviceArray[i].mac == mac) {
                existFlag = 1
                break
            }
        }
        if (existFlag == 0) {
            var deviceInfo = {"mac": mac, "type": type}
            discoverDeviceArray.push(deviceInfo)
        }
        if (this.refs.discoverListView) {
            this.refs.discoverListView.notifyDataSetChanged()
            this.refs.connectedListView.notifyDataSetChanged()
        }
    }

    //Update discovery device list
    updateConnectedList(mac, type, status) {
        //Connect success
        if (status == 1) {
            var existFlag = 0;
            for (var i = 0; i < connectedDeviceArray.length; i++) {
                if (connectedDeviceArray[i].mac == mac) {
                    existFlag = 1
                    break
                }
            }
            if (existFlag == 0) {
                var deviceInfo = {"mac": mac, "type": type}
                connectedDeviceArray.push(deviceInfo)
            }
            //Update discovery device list
            for (var i = 0; i < discoverDeviceArray.length; i++) {
                if (mac == discoverDeviceArray[i].mac) {
                    discoverDeviceArray.splice(i, 1)
                }
            }

        } else if (status == 2) {
            //Disconnect
            for (var i = 0; i < connectedDeviceArray.length; i++) {
                if (connectedDeviceArray[i].mac == mac) {
                    connectedDeviceArray.splice(i, 1)
                }
            }
        }
        if (this.refs.discoverListView) {
            this.refs.discoverListView.notifyDataSetChanged()
            this.refs.connectedListView.notifyDataSetChanged()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.heading}>
                    <Text style={styles.headText}> iHealth Demo </Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.startDiscovery()}>
                    <Text style={styles.buttonText}>
                        扫描设备
                    </Text>
                </TouchableOpacity>

                <Text style={styles.headText}> 扫描列表 </Text>
                <SimpleListView
                    ref='discoverListView'
                    navigator={this.props.navigator}
                    getData={() => {
                        return discoverDeviceArray
                    }}
                    compareData={(oldData, newData) => {
                        return oldData.type == newData.type && oldData.mac == newData.mac
                    }}
                    getView={(rowData, sectionID, rowID) => {
                        return (
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log('_pressRow:' + rowID)
                                        iHealthDeviceManagerModule.connectDevice(rowData.mac, rowData.type)
                                    }}
                                    underlayColor="transparent">
                                    <View>
                                        <View style={styles.listItem}>
                                            <Text style={styles.listItemTitle}>{rowData.type}</Text>
                                            <Text style={styles.listItemDesc}>{rowData.mac}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.listItemBorder}/>
                            </View>
                        )
                    }}
                />

                <Text style={styles.headText}> 连接列表 </Text>

                <SimpleListView
                    ref='connectedListView'
                    navigator={this.props.navigator}
                    getData={() => {
                        return connectedDeviceArray
                    }}
                    compareData={(oldData, newData) => {
                        return oldData.type == newData.type && oldData.mac == newData.mac
                    }}
                    getView={(rowData, sectionID, rowID) => {
                        return (
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log('_pressRow:' + rowID)
                                        this.props.navigator.push({
                                            name: "DeviceView",
                                            type: rowData.type,
                                            mac: rowData.mac
                                        })
                                    }}
                                    underlayColor="transparent">
                                    <View>
                                        <View style={styles.listItem}>
                                            <Text style={styles.listItemTitle}>{rowData.type}</Text>
                                            <Text style={styles.listItemDesc}>{rowData.mac}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.listItemBorder}/>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
}


var discoverDeviceArray = [];
var connectedDeviceArray = [];

export default class LaunchView extends Component {

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.FadeAndroid
    }

    renderScene(route, navigator) {
        if (navigator.tag != route.name) {
            navigator.tag = route.name
            if (route.name == 'MainView') {
                return <MainView navigator={navigator}/>
            } else if (route.name == 'DeviceView') {
                switch (route.type) {
                    case "BP5":
                        return <BP5View navigator={navigator} mac={route.mac}/>
                        break;
                    case "AM4":
                    case "AM3S":
                        return <AMView navigator={navigator} mac={route.mac} type={route.type}/>
                        break;
                    default:
                        console.warn('Not implemented yet, type = ' + route.type)
                        break;
                }
            }
        } else {
            console.log('奇怪。。。。')
        }
    }

    render() {
        return (
            <Navigator
                style={{flex: 1}}
                initialRoute={{name: 'MainView'}}
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                            LeftButton: (route, navigator, index, navState) => {
                                if (route.name == "MainView") {
                                    return null
                                } else {
                                    return (
                                        <TouchableHighlight onPress={() => navigator.pop()}>
                                            <Text>Back</Text>
                                        </TouchableHighlight>
                                    );
                                }
                            }, RightButton: (route, navigator, index, navState) => {
                                return null
                            }, Title: (route, navigator, index, navState) => {
                                if (route.name == "MainView") {
                                    return (<Text>iHealthReactNative</Text>);
                                } else {
                                    return (<Text>{route.type}</Text>)
                                }
                            }
                        }}
                        style={{backgroundColor: 'gray'}}
                    />
                }
            />
        )
    }

}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
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
    listItem: {
        justifyContent: 'center', // 内容居中显示
        paddingTop: 3,
        paddingRight: 15,
        paddingLeft: 15,
    }, listItemBorder: {
        marginTop: 1,
        height: 1,
        backgroundColor: "#D9D9D9",
    }, listItemTitle: {
        fontSize: 22,
    }, listItemDesc: {
        fontSize: 13,
    }
});
