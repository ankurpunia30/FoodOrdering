import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import  orders  from '../../../../assets/data/orders'
import OrderListItem from '../../../components/OrderListItem'
import OrderItemListItem from '../../../components/OrderItemListItem'
import Colors from '../../../constants/Colors'
import { Pressable } from 'react-native'
import { OrderStatusList}  from '../../../types'
const OrderDetailsScreen = () => {
  const {id}=useLocalSearchParams();
  const order=orders.find((order)=>order.id.toString()===id);
  if(!order) return <Text>Order not found</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title:`Order#${order.id}`}} />
      <OrderListItem order={order}/>
      <FlatList
      data={order.order_items}
      renderItem={({item})=><OrderItemListItem item={item}/>
      }
      contentContainerStyle={{gap:10}}
      ListFooterComponent={()=>(
        <>
  <Text style={{ fontWeight: 'bold' }}>Status</Text>
  <View style={{ flexDirection: 'row', gap: 5 }}>
    {OrderStatusList.map((status) => (
      <Pressable
        key={status}
        onPress={() => console.warn('Update status')}
        style={{
          borderColor: Colors.light.tint,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
          backgroundColor:
            order.status === status
              ? Colors.light.tint
              : 'transparent',
        }}
      >
        <Text
          style={{
            color:
              order.status === status ? 'white' : Colors.light.tint,
          }}
        >
          {status}
        </Text>
      </Pressable>
    ))}
  </View>
</>

      )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        
        flex:1,
        padding:10,
        gap:10
    }
})
export default OrderDetailsScreen

