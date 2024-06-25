import { Text,FlatList, ActivityIndicator } from "react-native"
import orders from "@/assets/data/orders"
import OrderListItem from "@/src/components/OrderListItem"
import { useMyOrderList } from "@/src/api/orders";
export default function OrdersScreen() {
    const {data:orders,isLoading,error}=useMyOrderList();
    if(isLoading){
        return <ActivityIndicator/>
    }
    if(error){
        return <Text>{error.message}</Text>
    }
    return(

        <FlatList
        data={orders}
        renderItem={({item}) => <OrderListItem order={item}/>}
        contentContainerStyle={{padding:10,gap:10}}
        
        />
    )
}
