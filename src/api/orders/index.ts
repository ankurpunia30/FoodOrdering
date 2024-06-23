
import { supabase } from '@/src/lib/supabase';
import { useAuth } from '../../provider/AuthProvider';
import { InsertTables, Tables } from '../../types';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
export const useAdminOrderList = ({archived=false}) => {
    
    const statuses=archived?['Delivered']:['New','Cooking','Delivering'];
    return useQuery({
    queryKey: ['orders',{archived}],
    queryFn: async () => {
      const {data,error} = await supabase
      .from('orders')
      .select('*')
      .in('status',statuses)
      .order('created_at',{ascending:false});
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};


export const useMyOrdersList = () => {

    const {session}=useAuth();
    const id=session?.user.id;
    if(!id) return null;
    return useQuery({
      queryKey: ['orders',{user_id:id}],
      queryFn: async () => {
        const {data,error} = await supabase
        .from('orders')
        .select('*')
        .eq('user_id',id)
        .order('created_at',{ascending:false});
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  };
  

  export const useOrderDetails = (id: number) => {
    return useQuery({
      queryKey: ['order', id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*, products(*))')
          .eq('id', id)
          .single();
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  };
  

  export const useInsertOrder = () => {
    const queryClient = useQueryClient();
    const {session} = useAuth();
    const userId = session?.user;
    return useMutation({
      async mutationFn( data : InsertTables<'orders'>) {
        const { error, data:newProduct } = await supabase
          .from('orders')
          .insert({...data, user_id: userId?.toString()}) // Convert userId to string
          .select()
          .single();
    
        if (error) {
          throw error;
        }
        return newProduct;
      },
      async onSuccess() {
        queryClient.invalidateQueries(['orders']);
      }
    });
  };