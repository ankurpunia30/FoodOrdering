import {Pressable,Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Order, OrderItem } from '../types'
import { useSegments } from 'expo-router';
import Colors from '../constants/Colors';
import { defaultPizzaImage } from '../components/ProductListItem';
import ProductListItem from './ProductListItem';
type OrderItemListItemProps = {
    item:OrderItem
}

const OrderItemListItem = ({item}:OrderItemListItemProps) => {
    const segment=useSegments();

  return (
    <View style={styles.container}>
    
    <Image source={{uri: item.products.image|| defaultPizzaImage}} style={styles.image}
        resizeMode='contain'
    />
    <View style={{flex:1}}>
    <Text style={styles.title}>
          {item.products.name}
       </Text>
    <View style={styles.subtitleConatiner}>
    <Text style={styles.price}>
          ${item.products.price.toFixed(2)}
       </Text>
       <Text>
        Size: {item.size}
       </Text>
    </View>   
    </View>
    <View style={styles.quantitySelector}>
        <Text style={styles.quantity}>{item.quantity}</Text>
    </View>
    
          
      
      
    </View>
    
  )
}

const styles = StyleSheet.create({
   container:{
    backgroundColor: 'white',
    borderRadius: 10,
    padding:5,
    flex:1,
    flexDirection:'row',
    alignItems:'center',

   },
   image:{
    width:75,
    aspectRatio:1,
    alignSelf:'center',
    marginRight:10,
   },
    title:{
    fontWeight:'500',
    fontSize:16,
    marginBottom:5,
    },
    subtitleConatiner:{
    flexDirection:'row',
    gap:5
    },
    price:{
    color:Colors.light.tint,
    fontWeight:'bold',
    },
    quantitySelector:{
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        
        marginVertical:'auto'
    },
    quantity:{
    fontWeight:'500',
    fontSize:18,
    }


});


export default OrderItemListItem
