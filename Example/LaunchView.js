import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ListView,
  DeviceEventEmitter,

} from 'react-native';

import BP5View from './BP5View';

import {
  iHealthDeviceManagerModel,
  BP5Model
} from 'ihealthlibrary-react-native'


var appNavigator;
class MainView extends Component {
  constructor(props) {
    super(props);
    var scanListener = null
    var scanFinishListener = null
    var connectionListener = null
  }

  startDiscovery() {
    this.removeListener()
    this.addListener()
    discoverDeviceArray = new Array()
    discoveryListViewInstance.updateListView()
    iHealthDeviceManagerModel.startDiscovery(iHealthDeviceManagerModel.BP5)// | iHealthDeviceManagerModel.AM4
  }


  componentDidMount() {

  }

  componentWillUnmount() {
    console.log('~~~~~~~componentWillUnmount')
    this.removeListener()
  }

  addListener() {
    let self = this
    this.scanListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModel.ScanDevice, function(e: Event) {
         // handle event.
         console.log('~~~' + JSON.stringify(e))
         self.updateDiscoveryList(e.mac, e.type)
       });
    this.scanFinishListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModel.ScanFinish, function(e: Event) {
         // handle event.
         console.log('~~~ScanFinish')
       });

    this.connectionListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModel.DeviceConnected, function(e: Event) {
         // handle event.
         console.log('~~~' + JSON.stringify(e))
         self.updateConnectedList(e.mac, 1)
       });
    this.connectionListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModel.DeviceConnectFailed, function(e: Event) {
          // handle event.
         console.log('~~~' + JSON.stringify(e))
         self.updateConnectedList(e.mac, 3)
      });
    this.connectionListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModel.DeviceDisconnect, function(e: Event) {
          // handle event.
          console.log('~~~' + JSON.stringify(e))
          self.updateConnectedList(e.mac, 2)
      });
  }

  removeListener() {
    //Unregister  event
    if (this.scanListener) {
      this.scanListener.remove()
    }
    if(this.scanFinishListener) {
      this.scanFinishListener.remove()
    }
    if (this.connectionListener) {
      this.connectionListener.remove()
    }
  }

  //Update discovery device list
  updateDiscoveryList(mac, type) {
    var existFlag = 0
    for (var i = discoverDeviceArray.length - 1; i >= 0; i--) {
      if (discoverDeviceArray[i].mac == mac) {
          existFlag = 1
          break
      }
    }
    if(existFlag == 0) {
      var deviceInfo = {"mac":mac, "type":type}
      discoverDeviceArray.push(deviceInfo)
      discoveryListViewInstance.updateListView()
    }
  }

  //Update discovery device list
  updateConnectedList(mac, status) {
    //Connect success
    if (status == 1) {
      var existFlag = 0;
      for (var i = connectedDeviceArray.length - 1; i >= 0; i--) {
        if (connectedDeviceArray[i] == mac) {
          existFlag = 1
          break
        }
      }
      if(existFlag == 0) {
        connectedDeviceArray.push(mac)
        connectedListViewInstance.updateListView()
      }
      //Update discovery device list
      for (var i = discoverDeviceArray.length - 1; i >= 0; i--) {
         if (mac == discoverDeviceArray[i].mac) {
            discoverDeviceArray.splice(discoverDeviceArray.length - i -1, 1)
            discoveryListViewInstance.updateListView()
            break
         }
      }

    } else if(status == 2) {
      //Disconnect
      // var tempArray = new Array()
      // for (var i = connectedDeviceArray.length - 1; i >= 0; i--) {
      //   if (connectedDeviceArray[i] != mac) {
      //      tempArray.push(connectedDeviceArray[i])
      //   }
      // }
      // connectedDeviceArray = tempArray.slice(0)

      for (var i = connectedDeviceArray.length - 1; i >= 0; i--) {
        if (connectedDeviceArray[i] == mac) {
           connectedDeviceArray.splice(connectedDeviceArray.length - i -1, 1)
        }
      }
      connectedListViewInstance.updateListView()
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
          onPress={()=>this.startDiscovery()}>
            <Text style={styles.buttonText}>
              扫描设备
            </Text>
        </TouchableOpacity>

        <Text style={styles.headText}> 扫描列表 </Text>
        <DiscoverListView />

        <Text style={styles.headText}> 连接列表 </Text>
        <ConnectedListView />
      </View>
    )
  }
}


var discoverDeviceArray = new Array();
var discoveryListViewInstance;
class DiscoverListView extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(discoverDeviceArray)
    };
  }

  componentDidMount() {
    discoveryListViewInstance = this
  }

  updateListView() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({dataSource: ds.cloneWithRows(discoverDeviceArray)})
  }

  // componentWillUpdate() {
  //   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  //   this.state.dataSource = ds.cloneWithRows(discoverDeviceArray);
  // }


  _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress = {() =>this._pressRow(rowID)} underlayColor = "transparent" >
              <View>
                <View style={styles.cell}>
                  <Text style={styles.buttonText}> {rowData.mac} </Text>
               </View>
            </View>
            </TouchableOpacity>
        )
  }

  _pressRow(row) {
    console.log('_pressRow:' + row)
    var deviceInfo = discoverDeviceArray[row]
    iHealthDeviceManagerModel.connectDevice(deviceInfo.mac, deviceInfo.type)
  }

  render() {
    return(
        <ListView
          enableEmptySections = {true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
        />

    )
  }
}


var connectedDeviceArray = new Array();
var connectedListViewInstance;
class ConnectedListView extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(connectedDeviceArray)
    };
  }

  componentDidMount() {
    connectedListViewInstance = this
  }

  updateListView() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({dataSource: ds.cloneWithRows(connectedDeviceArray)})
  }

  // componentWillUpdate() {
  //   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  //   this.state.dataSource = ds.cloneWithRows(connectedDeviceArray);
  // }


  _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress = {() =>this._pressRow(rowID)} underlayColor = "transparent" >
            <View>
              <View style={styles.cell}>
                <Text style={styles.buttonText}> {rowData} </Text>
               </View>
            </View>
            </TouchableOpacity>
        )
  }

  _pressRow(row) {
    console.log('_pressRow:' + row)
    var mac = connectedDeviceArray[row]
    appNavigator.push({name:'BP5View', mac:mac})
  }

  render() {
    return(
        <ListView
          enableEmptySections = {true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
        />

    )
  }
}



var currentViewName = ''

export default class LaunchView extends Component {

  getInstance() {
    console.log()
  }

  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.PushFromRight
  }

  renderScene(route, navigator) {
    appNavigator = navigator;
    if (currentViewName != route.name){
       currentViewName = route.name
       if(route.name == 'MainView') {
            return <MainView navigator={navigator} />
        } else if(route.name == 'BP5View') {
            return <BP5View navigator={navigator} mac={route.mac}/>
        }
    } else {
      console.log('奇怪。。。。')
    }
  }

  render() {
    return (
      <Navigator
        style={{flex:1}}
        initialRoute={{name: 'MainView'}}
        configureScene={this.configureScene}
        renderScene={this.renderScene}

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
  cell: {
    marginTop: 10,
    height: 25,
    alignItems: 'flex-start',
    justifyContent: 'center', // 内容居中显示
    marginBottom: 5
  },
});
