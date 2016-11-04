# iHealthLibrary_ReactNative

##Install  

```
 npm install  ihealthlibrary-react-native  
```


##Import module
```
import {
  iHealthDeviceManagerModel,
  BP5Model
} from 'ihealthlibrary-react-native'
```


##Demo Api
```
	Discovery: iHealthDeviceManagerModel.startDiscovery(BP5)  
```
```
	Connect: iHealthDeviceManagerModel.connectDevice(mac)  
```
```
	Start Measure: BP5Model.startMeasure(this.props.mac)  
```
```
	Stop Measure: BP5Model.stopMeasure(this.props.mac)  
```

