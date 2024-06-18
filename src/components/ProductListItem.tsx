import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';
import MenuScreen from '../app/(tabs)';
import products from '../../assets/data/products';

const ProductListItem = ({product}) => {
    return (
      <View style={styles.container}>
    <Image source={{uri: product.image}} style={styles.image}/>
       <Text style={styles.title}>
          {product.name }
       </Text>
       <Text style={styles.price}>
          ${product.price}
       </Text>
          
       
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
   
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        //overflow is used to hide the overflow of the image
        overflow: 'hidden',
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
