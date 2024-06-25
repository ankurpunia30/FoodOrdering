import { useAuth } from '@/src/provider/AuthProvider';
import { supabase } from '../../lib/supabase'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { InsertTables,UpdateTables } from '../../types';
//order  list on the admin side
export const useAdminOrderList = ({archieved=false}) => {
  const statuses=archieved?['Delivered']:['New','Cooking','Delivering'];
  
  return useQuery({
    queryKey: ['orders',{archieved}],
    queryFn: async () => {
      const { data, error } = await supabase
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

//user orders list
export const useMyOrderList = () => {
  const {session}=useAuth();
  const id=session?.user.id;
  return useQuery({
    queryKey: ['orders',{userId:id}],
    queryFn: async () => {
      if(!id){
        return null;
      }
      const { data, error } = await supabase
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


//read order by id
export const useOrderDetails=(id:number)=>{
  return useQuery({
    queryKey: ['order',id],
    queryFn: async () => {
      const { data, error } = await supabase
      .from('orders')
      .select('*,order_item(*,products(*))')
      .eq('id',id)
      .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
  
};

//inserting order
export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const {session}=useAuth();
  const userId=session?.user.id;

  return useMutation({
    async mutationFn(data:InsertTables<'orders'>) {
      const { error, data: newProduct } = await supabase
        .from('orders')
        .insert({...data,user_id:userId})
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      await queryClient.invalidateQueries(['orders']);
    },
  });
};

//update order status
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({id,updatedFields,}:{
      id:number;
      updatedFields:UpdateTables<'orders'>
    })  {
      const { error, data: UpdatedOrder } = await supabase
        .from('orders')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return UpdatedOrder;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries(['orders']);
      await queryClient.invalidateQueries(['orders', id]);
    },
  });
};
