import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../utils/hooks";
import { useNavigation, useRoute } from "@react-navigation/native";

const Preview = () => {
  const formstoreData = useAppSelector((state) => state.form);
  const routeData = useRoute();
  const navigate = useNavigation()
  const singleDataId = routeData.params.id;
  const [singleData, setSingleData] = useState({
    id: Date.now(),
    firstName: { data: "", isValid: false },
    lastName: { data: "", isValid: false },
    email: { data: "", isValid: false },
    mobileNumber: { data: null, isValid: false },
    alternateMobileNumber: { data: null, isValid: true },
    alteranteEmail: { data: "", isValid: true },
    department: { data: "", isValid: true },
    companyName: { data: "", isValid: true },
  });

  useEffect(() => {
    formstoreData.formDetails.forEach((item) => {
      if (item.id === singleDataId) {
        setSingleData(item)
      }
    });
  }, []);
  
  const handleEdit =()=>{
    navigate.goBack()
    
  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text>First Name: {singleData.firstName.data}</Text>
        <Text>Last Name: {singleData.lastName.data}</Text>
        <Text>Email: {singleData.email.data}</Text>
        <Text>Mobile: {singleData.mobileNumber.data}</Text>
        {singleData.alteranteEmail.data && <Text>Alternate Email: {singleData.alteranteEmail.data}</Text>}
        {singleData.alternateMobileNumber.data && <Text>Mobile: {singleData.alternateMobileNumber.data}</Text>}
        {singleData.department.data && <Text>Deparment: {singleData.department.data}</Text>}
        {singleData.companyName.data && <Text>Company Name: {singleData.companyName.data}</Text>}
        <View style={{ width: '100%',marginTop:20, display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
        {/* <Button color={'red'} title="Delete" /> */}
        <Button title="   Edit   " onPress={handleEdit} />
      </View>
      </View>
      
    </View>
  );
};

export default Preview;

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    },
    container:{
        height:"80%",
        width:'80%',
        backgroundColor:'#d1d1d1',
        justifyContent:'center',
        alignItems:"center",
        padding:10,
    }
});
