import { Text, View} from '@/src/components/Themed';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';
const product = products;

export default function MenuScreen() {

  return (
    <View >
      <ProductListItem
      product={product[0]}
      />
       <ProductListItem
      product={product[1]}
      />
      
    </View>
  );
}


