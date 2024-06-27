import { View, Text ,Image,StyleSheet,Pressable, ActivityIndicator} from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Stack } from "expo-router";
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from 'react';
import Button from '@/src/components/Button';
import { useCart } from '@/src/provider/CartProvider';
import { PizzaSize } from '@/src/types';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useProduct } from '.';
import RemoteImage from '@/src/components/RemoteImage';
const sizes:PizzaSize[]=['S','M','L','XL'];
const ProductDetailsScreen = () => {
  //useLocalSearchParams is a hook that is used to get the id from the url
  const {id:idString}=useLocalSearchParams();
  const id=parseFloat(typeof idString==='string'?idString:'');
  const {data:product,error,isLoading}=useProduct(id);

  const [selectedSize,setSelectedSize]=useState<PizzaSize>('M');
const {addItem}=useCart();
  //const product=products.find((product)=>product.id.toString()===id);
  const router=useRouter();
  const addToCart=()=>{
    if(!product) return;
    addItem(product,selectedSize);
    router.push('/cart');
  }
  if(isLoading) return <ActivityIndicator/>
  if(error) return <Text>{error.message}</Text>
  return (
    <View style={styles.container}>
      <Stack.Screen 
            options={{
              title:'Menu',
                    headerRight: () => (
                <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="pencil"
                        size={25}
                        color={Colors.light.tint}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),}} />
      <Stack.Screen  options={{title:product?.name}} />        
      <RemoteImage
       path={product?.image}
       fallback={defaultPizzaImage}
       style={styles.image}/>
      <Text style={styles.title}>{product?.name}</Text>
      <Text style={styles.price}>${product?.price}</Text>
    
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
title:{
  fontSize:20,
  fontWeight:'bold',
  marginVertical:10,
},
price:{
  fontSize:18,
  fontWeight:'bold',
  
 
}
})
export default ProductDetailsScreen

