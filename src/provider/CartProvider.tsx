import { PropsWithChildren, createContext,useContext, useState } from "react";
import { CartItem, } from "../types";
import {randomUUID} from 'expo-crypto';
import { Tables } from "../database.types";
type CartType={
    items:CartItem[];
    addItem:(product:Tables<'products'>,size:CartItem['size'])=>void;
    updateQuantity:(itemId:string,quantity:-1|1)=>void;
    total:number;
}
type Product=Tables<'products'>;
//cart context is used to manage the cart state in the app
export const CartContext = createContext<CartType>({
    items:[],
    addItem:()=>{},
    updateQuantity:()=>{},
    total:0,
});
//two properties are used in the cart context
//consumer and provider
//provider is used to provide the state to the components
//consumer is used to consume the state in the components


const CartProvider = ({children}:PropsWithChildren) => {
    const [items,setItems]=useState<CartItem[]>([]);
    const addItem=(product:Product,size:CartItem['size'])=>{
        //  TODO'S
        //if the item is already in the cart then increase the quantity 
        //if the item is not in the cart then add the item to the cart
        const item=items.find(item=>item.product_id===product.id&&item.size===size);
        if(item){
            updateQuantity(item.id,1);
            return;
        }
        const newCartItem:CartItem={
                id:randomUUID(),
                product,
                product_id:product.id,
                size,
                quantity:1,

            };

    setItems([newCartItem,...items]);
    };
    //updateQuantity
    const updateQuantity=(itemId:string,quantity:-1|1)=>{
        setItems(items.map(item=>
            item.id!==itemId
            ?item
            :{...item,quantity:item.quantity+quantity}
        ).filter(item=>item.quantity>0));  
    }
    const total=items.reduce((sum,item)=>sum+item.product.price*item.quantity,0);
    return (
        <CartContext.Provider value={{items,addItem,updateQuantity,total}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
export const useCart=()=>useContext(CartContext)
//shorthand created
//useCart is a custom hook that is used to consume the cart context in the components