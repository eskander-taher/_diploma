import useListNews from '../../api/news/useListNews';
import { NewsCard } from '../../components/NewsCard';
import DefaultLayout from '../../layout/DefaultLayout';

const index = () => {
  const { data, isLoading, error, isSuccess } = useListNews();

  return (
    <DefaultLayout>
      <h1 className="text-3xl mb-5 text-primary font-semibold">News</h1>
      <div className="flex flex-wrap gap-5">
        {isSuccess ? data?.data.map((item: any) => <NewsCard {...item} />) : <></>}
      </div>
    </DefaultLayout>
  );
};

export default index;
