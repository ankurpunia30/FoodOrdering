import { StyleSheet, Text, View ,TextInput,Image,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '@/src/components/Button'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useDeleteProduct, useInsertProduct, useUpdateProduct } from '@/src/api/products'
import { useProduct } from '.'
import { supabase } from '@/src/lib/supabase'
import { decode } from 'base64-arraybuffer'
import { randomUUID } from 'expo-crypto'
import *as FileSystem from 'expo-file-system'
 const createProductScreen = () => {
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [error,setError]=useState('')
    const [image, setImage] = useState<string | null>(null);
    
    const {id:idString}=useLocalSearchParams();
    const id = parseFloat(
      typeof idString === 'string' ? idString : idString?.[0]
    );

    
    const isUpdating=!!idString;
    
    const {mutate:insertProduct}=useInsertProduct();
    const {mutate:updateProduct}=useUpdateProduct();
    const {data:updatingProduct}=useProduct(id);
    const {mutate:deleteProduct}=useDeleteProduct();
    const router=useRouter();

    useEffect(()=>{
      if(updatingProduct){
        setName(updatingProduct.name);
        setPrice(updatingProduct.price.toString());
        setImage(updatingProduct.image);
      }

    },[updatingProduct])
    const onSubmit=()=>{
      if(isUpdating){
        // call update
        onUpdate();
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
const onCreate = async () => {
  if (!validateInput()) {
    return;
  }

  const imagePath = await uploadImage();

  // Save in the database
  insertProduct(
    { name, price: parseFloat(price), image:imagePath },
    {
      onSuccess: () => {
        resetField();
        router.back();
      },
    }
  );
};
         const onUpdate = async () => {
          if (!validateInput()) {
            return;
          }
          const imagePath = await uploadImage();
          
          updateProduct(
            { id, name, price: parseFloat(price), image:imagePath },
            {
              onSuccess: () => {
                resetField();
                router.back();
              },
            }
          );
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
    deleteProduct(id,{
      onSuccess:()=>{
        resetField();
        router.replace('/(admin)/menu');
      }
    })
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

  const uploadImage = async () => {
    if (!image?.startsWith('file://')) {
      return;
    }
  
    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: 'base64',
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = 'image/png';
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, decode(base64), { contentType });
  
    if (data) {
      return data.path;
    }
  };

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