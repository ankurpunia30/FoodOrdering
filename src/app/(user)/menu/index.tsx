import React from 'react';
import { Text, View} from '@/src/components/Themed';

import { ActivityIndicator, FlatList } from 'react-native';
import ProductListItem from '@/src/components/ProductListItem';

import { useProductList } from '@/src/api';


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


