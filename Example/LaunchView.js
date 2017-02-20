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
    TouchableHighlight,
    Picker,
    AsyncStorage

} from 'react-native';

import BP5View from './BP5View';

import {
    SimpleListView
} from './SimpleListView';

import {
    AlertDialog
} from './AlertDialog';

import AMView from './AMView';
import BP3LView from './BP3LView';
import BP550BTView from './BP550BTView';
import BP7SView from './BP7SView';
import PO3View from './PO3View';
import HS4SView from './HS4SView';
import BG1View from './BG1View';
import HS6View from './HS6View';
import BG5View from './BG5View';
import BG5LView from './BG5LView';

import {
    iHealthDeviceManagerModule
} from 'ihealthlibrary-react-native'

var STORAGE_KEY_DISCOVERY_TYPE = '@iHealthReactNative:keyDiscoveryType';
class MainView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: iHealthDeviceManagerModule.BP5,
            pickerEnabled: true,
            scanStatus: false
        };
        AsyncStorage.getItem(STORAGE_KEY_DISCOVERY_TYPE, (err, type)=> {
            if (err == null && type != null) {
                let typNum = parseInt(type)
                this.setState({
                    type: isNaN(typNum) ? type : typNum
                })
            }
        })
    }


    authenConfigureInfo() {
        this.removeListener()
        this.addListener()
        iHealthDeviceManagerModule.authenConfigureInfo('jing@q.aaa', '', '')
    }


    startDiscovery() {
        console.info('scan device ------' + this.state.type)

        if (this.state.scanStatus) {
            console.info('Scanning devices...')
        } else if (this.state.type == iHealthDeviceManagerModule.HS6) {
            this.props.navigator.push({
                name: "DeviceView",
                type: "HS6"
            })
        } else {
            this.setState({pickerEnabled: false, scanStatus: true});
            this.removeListener()
            this.addListener()
            discoverDeviceArray = new Array()
            this.refs.discoverListView.notifyDataSetChanged()
            iHealthDeviceManagerModule.startDiscovery(this.state.type)
        }

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
        this.authenListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Authenticate_Result, function (e: Event) {
            // handle event.
            console.log('~~~' + JSON.stringify(e))
        });
        this.scanListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Scan_Device, function (e: Event) {
            // handle event.
            console.log('~~~' + JSON.stringify(e))
            self.updateDiscoveryList(e.mac, e.type)
        });
        this.scanFinishListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Scan_Finish, function (e: Event) {
            // handle event.
            console.log('~~~ScanFinish')
            self.setState({pickerEnabled: true, scanStatus: false})
        });

        this.connectSuccessListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Connected, function (e: Event) {
            // handle event.
            console.log('~~~' + JSON.stringify(e))
            self.updateConnectedList(e.mac, e.type, 1)
        });
        this.connectFailedListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Connect_Failed, function (e: Event) {
            // handle event.
            console.log('~~~' + JSON.stringify(e))
            self.updateConnectedList(e.mac, e.type, 3)
        });
        this.disconnectListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Disconnect, function (e: Event) {
            // handle event.
            console.log('~~~' + JSON.stringify(e))
            self.updateConnectedList(e.mac, e.type, 2)
        });
    }

    removeListener() {
        //Unregister  event
        if (this.authenListener) {
            this.authenListener.remove()
        }
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
                <AlertDialog
                    ref="dialog"
                    title="Select Type"
                    leftButtonText="Cancel"
                    rightButtonText="Start"
                    getView={() => {
                        return (
                            <Picker
                                style={{flex: 1}}
                                selectedValue={this.state.type}
                                onValueChange={(value) => {
                                    this.setState({type: value})
                                }}
                                enabled={this.state.pickerEnabled}
                                mode="dropdown"
                                //when mode is dialog will work
                                prompt="choese device to discovery">

                                <Picker.Item label='BP5' value={iHealthDeviceManagerModule.BP5}/>
                                <Picker.Item label='BP3L' value={iHealthDeviceManagerModule.BP3L}/>
                                <Picker.Item label='KN-550BT' value={iHealthDeviceManagerModule.KN550}/>
                                <Picker.Item label='BP7S' value={iHealthDeviceManagerModule.BP7S}/>
                                <Picker.Item label='AM3S' value={iHealthDeviceManagerModule.AM3S}/>
                                <Picker.Item label='AM4' value={iHealthDeviceManagerModule.AM4}/>
                                <Picker.Item label='PO3' value={iHealthDeviceManagerModule.PO3}/>
                                <Picker.Item label='HS4S' value={iHealthDeviceManagerModule.HS4S}/>
                                <Picker.Item label='HS6' value={iHealthDeviceManagerModule.HS6}/>
                                <Picker.Item label='BG1' value={iHealthDeviceManagerModule.BG1}/>
                                <Picker.Item label='BG5' value={iHealthDeviceManagerModule.BG5}/>
                                <Picker.Item label='BG5L' value={iHealthDeviceManagerModule.BG5L}/>


                            </Picker>
                        )
                    }}
                    onClick={(index) => {
                        if (index == 1) {
                            this.startDiscovery()
                            try{
                                AsyncStorage.setItem(STORAGE_KEY_DISCOVERY_TYPE, this.state.type.toString());
                            } catch(error) {
                                console.warn('AsyncStorage error : ' + error.message)
                            }
                        }
                    }}
                />
                <TouchableOpacity
                    style={{
                        height: 60,
                        justifyContent: 'center',
                        backgroundColor: '#eedddd',
                        alignItems: 'center',
                    }}
                    onPress={() => this.authenConfigureInfo()}>
                    <Text style={styles.buttonText}>
                        Authenticate SDK
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity

                    style={{
                        height: 60,
                        marginTop: 5,
                        justifyContent: 'center',
                        backgroundColor: '#eedddd',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        this.refs.dialog.setModalVisible(true)
                    }}>
                    <Text style={styles.buttonText}>
                        Scan
                    </Text>
                </TouchableOpacity>


                <Text style={styles.headText}> Scan list </Text>
                <SimpleListView
                    ref='discoverListView'
                    style={{backgroundColor: '#fafafa'}}
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

                <Text style={styles.headText}> Connected list </Text>

                <SimpleListView
                    ref='connectedListView'
                    style={{backgroundColor: '#fafafa'}}
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
        return Navigator.SceneConfigs.HorizontalSwipeJump
    }

    renderScene(route, navigator) {
        if (route.name == 'MainView') {
            return <MainView navigator={navigator}/>
        } else if (route.name == 'DeviceView') {
            switch (route.type) {
                case "BP5":
                    return <BP5View navigator={navigator} mac={route.mac} type={route.type}/>
                    break;
                case "AM4":
                case "AM3S":
                    return <AMView navigator={navigator} mac={route.mac} type={route.type}/>
                    break;
                case "BP3L":
                    return <BP3LView navigator={navigator} mac={route.mac} type={route.type}/>
                case "KN-550BT":
                    return <BP550BTView navigator={navigator} mac={route.mac} type={route.type}/>
                case "BP7S":
                    return <BP7SView navigator={navigator} mac={route.mac} type={route.type}/>
                case "PO3":
                    return <PO3View navigator={navigator} mac={route.mac} type={route.type}/>
                case "HS4S":
                    return <HS4SView navigator={navigator} mac={route.mac} type={route.type}/>
                case "BG1":
                    return <BG1View navigator={navigator} mac={route.mac} type={route.type}/>
                case "HS6":
                    return <HS6View navigator={navigator} mac={route.mac} type={route.type}/>
                case "BG5":
                    return <BG5View navigator={navigator} mac={route.mac} type={route.type}/>
                case "BG5L":
                    return <BG5LView navigator={navigator} mac={route.mac} type={route.type}/>
                default:
                    console.warn('Not implemented yet, type = ' + route.type)
                    break;
            }
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
                                    return (
                                        <View
                                            style={{flex: 1, justifyContent: 'center', marginLeft: 10}}>
                                            <Text style={styles.navigationBarTitle}>iHealthReactNative</Text>
                                        </View>
                                    );
                                } else {
                                    return (
                                        <View
                                            style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
                                            <TouchableHighlight
                                                style={{flex: 1, width: 40}}
                                                onPress={() => navigator.jumpBack()}
                                                underlayColor='#312F31'>
                                                <Text style={styles.navigationBarBack}>⇦</Text>
                                            </TouchableHighlight>
                                            <View style={{
                                                width: 1,
                                                backgroundColor: '#2E2E32',
                                                marginTop: 10,
                                                marginBottom: 10,
                                                marginRight: 10
                                            }}/>
                                            <Text style={styles.navigationBarTitle}>{route.type}</Text>
                                        </View>

                                    );
                                }
                            }, RightButton: (route, navigator, index, navState) => {
                                return null
                            }, Title: (route, navigator, index, navState) => {
                                return null
                            }
                        }}
                        style={{backgroundColor: '#393A3F'}}
                    />
                }
            />
        )
    }

}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        paddingTop: 75,
    },
    // Navigation bar
    heading: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    // Navigation bar text
    headText: {
        color: '#ff5555',
        fontSize: 22,
        backgroundColor: '#fafafa',
    },
    // Button
    button: {
        height: 60,
        marginTop: 10,
        justifyContent: 'center',
        backgroundColor: '#eedddd',
        alignItems: 'center'
    },
    // Button text
    buttonText: {
        fontSize: 18
    },
    listItem: {
        justifyContent: 'center',
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
    }, navigationBarTitle: {
        textAlignVertical: 'center',
        fontSize: 20,
        color: 'white',
    }, navigationBarBack: {
        flex: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
});
