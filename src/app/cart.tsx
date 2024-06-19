import { View, Text, Platform } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { CartContext,useCart } from '../provider/CartProvider'
import { FlatList } from 'react-native'
import CartListItem from '../components/CartListItem'

//why to use context not the states
//because the context is a global state that can be used in any component
//and it is a better way to manage the state in the app
//states are used to manage the state in the component
//major difference is that context is a global state and states are local state
//prop drilling is passing the props from the parent to the child component
//context is used to avoid prop drilling
const CartScreen = () => {
  const {items}=useCart();

  return (
    <View>
      <FlatList
      data={items}
      renderItem={({item})=><CartListItem cartItem={item}/>} 
      contentContainerStyle={{padding:10,gap:10}}     
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
  
    </View>
  )
}

export default CartScreen