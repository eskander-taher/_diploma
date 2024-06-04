import DefaultLayout from '../../layout/DefaultLayout';
import EventCard from './EventCard';
import useEventList from '../../api/events/useEventList';

const Events = () => {
  const { data, isLoading, error } = useEventList();
  console.log(data);
  return (
    <DefaultLayout>
      <h1 className="text-3xl mb-5 text-primary font-semibold">ُEvents</h1>
      <div className="flex flex-wrap gap-5 flex-col">
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          data?.data?.map((event) => {
            return <EventCard {...event} key={event} />;
          })
        )}
        {
          !data && <h1>There are no events to view</h1>
        }
      </div>
    </DefaultLayout>
  );
};

export default Events;
