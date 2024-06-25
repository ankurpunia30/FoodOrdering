import { useAuth } from "@/src/provider/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { InsertTables } from "../../types";
//inserting order
export const useInsertOrderItems = () => {
    
    const {session}=useAuth();
    const userId=session?.user.id;
  
    return useMutation({
      async mutationFn(items:InsertTables<'order_item'>[]) {
        const { error, data: newProduct } = await supabase
          .from('order_item')
          .insert(items)
          .select();
  
        if (error) {
          throw new Error(error.message);
        }
        return newProduct;
      },
     
    });
  };
  