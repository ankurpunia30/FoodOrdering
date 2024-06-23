import { Text,FlatList, ActivityIndicator } from "react-native"

import OrderListItem from "@/src/components/OrderListItem"
import { useMyOrdersList } from "@/src/api/orders";
export default function OrdersScreen() {
    const { data: orders
        , isLoading, 
        error } = useMyOrdersList();
    if (isLoading) {
      return <ActivityIndicator />;
    }
    if (error) {
      return <Text>Failed to fetch</Text>;
    }
    return(
        
        <FlatList
        data={orders}
        renderItem={({item}) => <OrderListItem order={item}/>}
        contentContainerStyle={{padding:10,gap:10}}
        
        />
    )
}
