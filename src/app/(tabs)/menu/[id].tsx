import { View, Text ,Image,StyleSheet,Pressable} from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Stack } from "expo-router";
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from 'react';
import Button from '@/src/components/Button';
const sizes=['S','M','L','XL'];
const ProductDetailsScreen = () => {
  //useLocalSearchParams is a hook that is used to get the id from the url
  const {id}=useLocalSearchParams();
  const [selectedSize,setSelectedSize]=useState('M');

  const product=products.find((product)=>product.id.toString()===id);
  
  const addToCart=()=>{
    console.warn('Add to cart,size:',selectedSize)
  }
  
  if(!product) 
    return <Text>Product not found</Text>
  return (
    <View style={styles.container}>
      <Stack.Screen  options={{title:product.name}} />        
      <Image source={{uri:product.image|| defaultPizzaImage}} style={styles.image}/>
      <Text>Select size</Text>
      <View style={styles.sizes}>
      {sizes.map((size)=>(
        <Pressable onPress={()=>{
          setSelectedSize(size);
        }}
         key={size} 
         style={[styles.size,{backgroundColor:selectedSize===size?'gainsboro':'white'}]}>
            <Text style={[styles.sizeTxt,{color:selectedSize===size?'black':'gray'}]}>{size}</Text>
        </Pressable>
        
      ))}
      
      </View>
      
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text='Add to cart'/>
    </View>
  )
}
const styles=StyleSheet.create({
  container:{
      backgroundColor:'white',
      flex:1,
      padding:10,

  },
image:{
  width:'100%',
  aspectRatio:1,
},
sizes:{
  flexDirection:'row',
  justifyContent:'space-around',
  paddingVertical:10,
  marginVertical:10,
},
size:{
  backgroundColor:'gainsboro',
  width:50,
  aspectRatio:1,
  borderRadius:25,
  justifyContent:'center',
  alignItems:'center',
},
sizeTxt:{
  fontSize:20,
  fontWeight:'500',

},
price:{
  fontSize:18,
  fontWeight:'bold',
  marginTop:'auto',
 
}
})
export default ProductDetailsScreen

