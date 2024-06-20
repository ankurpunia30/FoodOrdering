import { StyleSheet, Text, View ,TextInput,Image,Alert} from 'react-native'
import React, { useState } from 'react'
import Button from '@/src/components/Button'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router'

 const createProductScreen = () => {
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [error,setError]=useState('')
    const [image, setImage] = useState<string | null>(null);
    
    const {id}=useLocalSearchParams();
    const isUpdating=!!id;
    
    const onSubmit=()=>{
      if(isUpdating){
        // call update
        onUpadateCreate();
      }
      else{
        onCreate();
      
      }
    }
    const resetField=()=>{
        setName('');
        setPrice('');
    }
const validateInput=()=>{
        setError('');
        if(!name){
            setError('Please enter a name')
            return false;
        
        }
        if(!price){
            setError('Please enter a price')
            return false;
        }
        if(isNaN(parseFloat(price))|| parseFloat(price)<=0){
            setError('Please enter a valid price')
            return false;
        }
        return true;

}

    const onCreate=()=>{
    if(validateInput()===false){
    return;
    }

        console.log('Create Product',name,price)

        //save in database

        resetField();
    };
    const onUpadateCreate=()=>{
      if(validateInput()===false){
      return;
      }
  
          console.log('Updating Product Product')
  
          //save in data base
  
          resetField();
      };
  
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const onDelete=()=>{
    console.log('Delete Product');
  }
  const  confirmDelete=()=>{
      Alert.alert('Confirm','Are you sure you want to delete this product?',[
        {
            text:'Cancel',
        },{
            text:'Delete',
            onPress:onDelete,
            style:'destructive',
        }
      ])
  }

  return (
    <View style={styles.container}>
    <Stack.Screen  options={{title:isUpdating?'Update Product':'Create Product'}} />
    <Image
    source={{uri:image||defaultPizzaImage}}
    style={styles.image}
    />
    <Text onPress={pickImage} style={styles.imageTxt}>
        Select Image
    </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput placeholder='Name'
      value={name}
        onChangeText={setName}
      style={styles.input}
      />
      <Text style={styles.label}>Price($)</Text>
      <TextInput placeholder='9.99'
        keyboardType='numeric'
        value={price}
        onChangeText={setPrice}
      style={styles.input}
      />
      <Text style={{color:'red',marginBottom:10}}>{error}</Text>
      <Button onPress={onSubmit} text={isUpdating?'Update':'Create Product'}/>
      {isUpdating&& <Text
      onPress={confirmDelete}
      style={styles.imageTxt}>
        Delete
        </Text>}
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        
        padding:10,
    },
    image:{
        width:'50%',
        aspectRatio:1,
        alignSelf:'center',
    },
    imageTxt:{
        alignSelf:'center',
        fontWeight:'bold',
        marginVertical:10,
        color:Colors.light.tint,
    },
    label:{
        color:'gray',
        fontSize:16,
        fontWeight:'bold',
    },
    input:{
            backgroundColor:'white',
            padding:10,
            borderRadius:5,
            marginTop:5,
            marginBottom:20,
    }

});
export default createProductScreen;