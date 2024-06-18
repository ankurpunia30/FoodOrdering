import { View, Text,StyleSheet,Image ,Pressable} from 'react-native'
import React, { PropsWithChildren } from 'react'
import Colors from '../constants/Colors';
import { Product } from '../types';
import { Link } from 'expo-router';

export const defaultPizzaImage='https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png'
type ProductListItemProps = {
    product: Product;
  };
const ProductListItem = ({product}:ProductListItemProps) => {
    return (
        <Link href=
    { `/menu/${product.id}`} asChild>
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
