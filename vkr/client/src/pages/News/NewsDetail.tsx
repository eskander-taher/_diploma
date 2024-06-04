import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useParams } from 'react-router-dom';
import useGetNew from '../../api/news/useGetNew';

const NewsDetail = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetNew(id);

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <></>
        ) : (
          <>
            <div className=" bg-white rounded-md shadow-md p-4">
              <h1 className="text-3xl  text-primary font-semibold text-center">
                {data.data.title}
              </h1>
              <div className="ql-editor">
                <div dangerouslySetInnerHTML={{ __html: data.data.content }} />
              </div>
            </div>
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default NewsDetail;
