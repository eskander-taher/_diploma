import useAxios from '../../hooks/useAxios';
import { useMutation, useQueryClient } from 'react-query';

const useUpdateEvent = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const updateEventRequest = ({ eventId, data }: any) => {
    return axios({
      url: `api/events/${eventId}`,
      method: 'PUT',
      data: data,
    });
  };

  const request = useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: any }) =>
      updateEventRequest({ eventId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return request;
};

export default useUpdateEvent;
