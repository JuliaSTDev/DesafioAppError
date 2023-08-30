import  Home from "./src/screens/Home/index";
import { View } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import { styles } from "./src/screens/Home/style";

MapboxGL.setAccessToken(
  "pk.eyJ1IjoiZGFuaWxvbWlndWVsMTQ4NSIsImEiOiJjbGZwYzg2ZzQwdW0yM3FwdG91Z3BoZXVtIn0.FOkbq1V7d5cjKTXgyTQVuQ"
);

export default function App() {
 
    

  return (
  
       
            < Home />
  
  )
}



