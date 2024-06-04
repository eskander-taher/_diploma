import React from 'react';
import { Link } from 'react-router-dom';

export const NewsCard = ({ image, title ,_id}: any) => {
  return (
    <Link to={`/news/${_id}`}>
      <div className="flex flex-wrap gap-5 ">
        <div className="max-w-80 rounded overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow">
         
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-primary">{title}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
