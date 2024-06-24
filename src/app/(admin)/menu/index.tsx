import React from 'react';
import { Text, View} from '@/src/components/Themed';
import { ActivityIndicator, FlatList } from 'react-native';
import ProductListItem from '@/src/components/ProductListItem';
import { useProductList } from '@/src/api';
import { supabase } from '@/src/lib/supabase';
import { useQuery } from '@tanstack/react-query';


export default function MenuScreen() {
  const {
    data:products,
    error,
    isLoading,
  }=useProductList();
  if(isLoading) return <ActivityIndicator/>
  if(error) return <Text>{error.message}</Text>
  
  return (
    <View >
      <FlatList
      data={products}
      renderItem={({item})=> <ProductListItem product={item}/>}
      numColumns={2}
      contentContainerStyle={{gap:10,padding:10}}
      columnWrapperStyle={{gap:10}}
      />
    </View>
  );
}

export const useProduct = (id:number) => {
  return useQuery({
    queryKey:['products',id],


    queryFn:async()=>{
      const {data,error}=await supabase.from('products').select('*').eq('id',id).single();
      if(error) 
        throw new Error(error.message);
      
      return data;},
  });
}

