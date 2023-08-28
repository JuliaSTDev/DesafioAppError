import React, { useEffect, useRef, useState} from 'react';
import MapboxGL  from "@rnmapbox/maps";
import * as Location from 'expo-location';


export function App() {
    const [userLocation, setUserLocation] = useState(null);

    //função responsavel por obter a localização do usuário,
    //retornando as coordenadas de latitude e longitude
    async  function getUserLocation() {
        
            
            const { granted } = await Location.requestForegroundPermissionsAsync();
            if( !granted ) {
                setErrorMsg('Permission to access location was denied');
            
            } else {
                return {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longititude,
                }
              }
    
  
          useEffect(() => {
            getUserLocation();
          },[]);
  
    }
    
    

    //responsável por buscar a localização do usuário.
    useEffect(() => {
        async function fetchUserLocation() {
            const location = await getUserLocation();
            setUserLocation(location);
        }
        fetchUserLocation();
    },[]);


    //função responsavel por centralizar o usário no mapa
    //usando o cameraRef para acessar o elemento 'camera' do MapboxGL
    function centerUser(cameraRef, userLocation) {
        cameraRef.current.setCamera({
        centerCoordinate: [userLocation.longitude, userLocation.latitude],
    });
    }


    //responsavel por renderizar o componente no mapa    
    function MapComponent(){      
        const camera = useRef(null);
        
        useEffect(() => {
            if (userLocation) {
                centerUser(camera, userLocation);
            }
        }, [userLocation]);


        //a referência camera é passada para o componente usando a props ref
        return (
        <MapboxGL.MapView>
            <MapboxGL.Camera ref={camera} />
        </MapboxGL.MapView>
    
        );
    }
}