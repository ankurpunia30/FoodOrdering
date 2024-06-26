import { View, Text,StyleSheet,Image ,Pressable} from 'react-native'
import React, { PropsWithChildren } from 'react'
import Colors from '../constants/Colors';
//import { Product } from '../types';
import { Link, useSegments } from 'expo-router';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import { Tables } from '../database.types';

export const defaultPizzaImage='https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png'
type ProductListItemProps = {
    product: Tables<'products'>;
  };
const ProductListItem = ({product}:ProductListItemProps) => {
    const segment =useSegments();
    console.log(segment)
    
    { /* 1.linked the different parts with admin and user using segment */};
  return (
        <Link href=
    { `/${segment[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
    <Image source={{uri: product.image|| defaultPizzaImage}} style={styles.image}
        resizeMode='contain'
    />
       <Text style={styles.title}>
          {product.name }
       </Text>
       <Text style={styles.price}>
          ${product.price}
       </Text>
          
      
      </Pressable>
        </Link>
    );
  }

const styles = StyleSheet.create({
    container: {
        
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        //overflow is used to hide the overflow of the image
        overflow: 'hidden',
        flex: 1,
        maxWidth: '50%',
      },
      
      image: {
        width: '100%',
        //aspect ratio means that the image will be a square
        aspectRatio: 1,
        alignSelf: 'center',
      },
      title:{
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,  
      },
      price:{
          color:Colors.light.tint,
          fontWeight: 'bold',
          marginTop:'auto',
      }
    
    

});
export default ProductListItem
