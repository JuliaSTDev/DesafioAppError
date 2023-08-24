import React, { useEffect, useState, useRef  } from 'react';
import { styles } from './style';
import { Alert, View } from 'react-native';
import MapboxGL,  { UserLocation } from "@rnmapbox/maps";
import  {  getCurrentPositionAsync,
          requestForegroundPermissionsAsync,
          watchPositionAsync,
          hasServicesEnabledAsync,
          LocationAccuracy,
          enableNetworkProviderAsync }   from 'expo-location';
import  ButtomCustomer from '../../components/ButtomCustomer';
import MapLocation from '../../components/MapLocation';


MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken("pk.eyJ1IjoiZGFuaWxvbWlndWVsMTQ4NSIsImEiOiJjbGZwYzg2ZzQwdW0yM3FwdG91Z3BoZXVtIn0.FOkbq1V7d5cjKTXgyTQVuQ");


export default function Home() {

    // armazenar a localização
      const [location, setLocation] = useState(null);
      const [errorMsg, setErrorMsg] = useState(null);
      
      // verificar se os serviços de geolocalização está ativadas
      const [locationServicesEnabled, setLocationServiceEnabled] = useState(null);
      const [modalView, setModalView] = useState(false);
      const [expanded, setExpanded] = useState(false);  // expanded  é uma variável que controla o estado de expansão ou contração de alguma parte da interface do usuário
     
      const [zoomLevel, setZoomLevel] = useState(5);
    
      const [showMap, setShowMap] = useState(false); 
     
                             
      // verifica a plataforma 
      const enableGPS = async () => {
        if (Platform.OS === 'android') {
          await enableNetworkProviderAsync();
        } else {
          await enableForegroundServicePermissionsAsync();
        }
      };
      

    /** Este método verifica se a permissão de localização foi concedida,
   * se não ela solicita a permissão e exibe um alert caso seja negada,
   * podendo direcionar o usuário para as configurações do dispositivo.*/
  async function modalPermission(locationPermission) {
    if (!locationPermission) {
      return MapboxGL.requestAndroidLocationPermissions()
        .then((value) => {
          setLocation(value);
          if (value === false) {
            Alert.alert(
              "Permissão de Localização",
              "A permissão de localização é necessária para continuar. Por favor, habilite a permissão nas configurações do dispositivo.",
              [
                { text: "Cancelar", style: "cancel" },
                { text: "Abrir Configurações", onPress: () => openSettings() },
              ]
            );
          }
        })
        .catch((error) => {
          console.log(
            "Ocorreu um erro ao solicitar a permissão de localização:",
            error
          );
        });
    }
  }

    // obter a permissão para usar a localizaçãor
        async function requestLocationPermissions() {
            
          const { granted } = await requestForegroundPermissionsAsync({});
          if( granted ) {
              const currentPosition = await getCurrentPositionAsync();
              setLocation(currentPosition);
              console.log(currentPosition);
          } else {
              setErrorMsg('Permission to access location was denied');
            }
        }
          

        useEffect(() => {
          requestLocationPermissions();
        },[]);


        useEffect(() => {
          watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1
          }, (response) => {
            setLocation(response);
          });
        },[]);

        
  useEffect(() => {
    const checkLocationServices = async () => {
      const res = await hasServicesEnabledAsync();
      if (res === true) {
        // console.log('Permission enabled');
      } else {
        enableGPS()
      // showEnableLocationAlert();
      }
      // console.log('Location services enabled:', res);
    };

    const locationCheckInterval = setInterval(() => {
        checkLocationServices();
    }, 5000); // Check every 5 seconds (adjust the interval as needed)

    return () => {
      clearInterval(locationCheckInterval);
    };
  }, []);

 

  return(
    <View style={styles.container}>

          <MapboxGL.MapView
            styleURL={MapboxGL.StyleURL.Satellite} 
            style={{ flex: 1 }}
            zoomEnabled={!expanded}
            scrollEnabled={!expanded}
            pitchEnabled={expanded}
            rotateEnabled={!expanded}
                
          ></MapboxGL.MapView>

          < MapLocation />

          <MapboxGL.Camera
              zoomLevel={11}
              animationMode={"flyTo"}
              animationDuration={0}
            />


        <View
          style={{
            alignItems: "center",
            position: "absolute",
            marginTop: 130,
            right: 50,
            width: 60,
            height: 70,
            justifyContent: "space-between",
            }}
        >
            
        <ButtonCustomer
            iconName="layers"
            iconPackage="Feather"
            onPress={() => {
              setModalView(true);

              // goToBounds();
            }}
        />

        <ButtonCustomer
            iconName="gps-fixed"
            iconPackage="MaterialIcons"
            onPress={async () => {
              await modalPermission(location);
            }}  
        />
        </View>
    </View>
  )
}
