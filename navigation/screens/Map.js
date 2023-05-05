import React,{useState} from 'react';
import MapView,{Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';


export default function Map() {
    const[mapRegion, setMapRegion] = useState({
    latitude: -36.852603912353516,// measure distance north or south of the equator
    longitude: 174.76699829101562,//measure east or west of the meridian (AUT LOCATION WELLESELY STREET)
    latitudeDelta: 0.04,//The amount of north-to-south distance
    longitudeDelta: 0.05,//The amount of east-to-west distance     ///need to find how I will have the different user coordinates 
    });

    const userlocation = async () => {
        let {status} = await Location.requestForegroundPermissionAsyc();///asks the user to give permission for location while the app is in the background of the phone
        if (status !== access)
        {
            setErrorMsg('no access to location');
        }
        let location= await Location.getCurrentPositionAsyc({enableHighAccuracy:true})// if we get the user to give the access
        setMapRegion({  /// we get their coordinates with high accuracy 
             latitude: Location.coords.latitude,
             longitude: Location.coords.latitude,
             latitudeDelta: 0.04,
             longitudeDelta: 0.05,
        });

        console.log(location.coords.latitude,location.coords.longitude);//logs 

    }


  return (
    <View style={styles.container}>    
      <MapView style={styles.map} 
        region={mapRegion}
       />
      <Marker coordinate={mapRegion} title='Marker'/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

/// still got to incorprate it with login
/// get user location button
