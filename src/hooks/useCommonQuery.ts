import { MessageInstance } from 'antd/es/message/interface';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/slices/userSlice';
import { useQuery } from '@tanstack/react-query';

export const useGetCampaignsList = (t: any, message: MessageInstance) => {
  return useQuery({
    queryKey: ['getCampaignsList', t, message],
    queryFn: async () => {
      try {
        const storedData = localStorage.getItem('campaigns');
        const response = storedData ? JSON.parse(storedData) : null;
  
        if (response) {
          return response;
        } else {
          // Handle the case where 'campaigns' is not found in localStorage
          // You can decide whether to return an empty array, null, or any other default value
          return [];
        }
      } catch (err : any) {
        message.error(err.message || 'An error occurred while fetching campaigns');
        // You might want to throw the error again if you want to propagate it to the component
        throw err;
      }
    },
  });
};