import { useAuth } from "@/src/provider/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InsertTables } from "@/src/types";
import { supabase } from "@/src/lib/supabase";
export const useInsertOrderItems = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      async mutationFn( items : InsertTables<'order_item'>) {
        const { error, data:newProduct } = await supabase
          .from('order_item')
          .insert(items) // Convert userId to string
          .select();
    
        if (error) {
          throw error;
        }
        return newProduct;
      },
    });
  };