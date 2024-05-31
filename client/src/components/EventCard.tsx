import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = () => {
  return (
    <Link to={`/events/${1}`}className="flex gap-3  bg-white rounded-md shadow-md hover:shadow-xl transition-shadow cursor-pointer">
      <img src="./cards-01.png" alt="" className="max-h-50" />
      <div className="flex gap-2 flex-col p-2">
        <div className="flex space-x-3 align-middle">
          <h2 className="text-2xl  text-primary font-medium">Hello world</h2>
          <div>|</div>
          <div>Going</div>
        </div>
        <div>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
            debitis accusamus exercitationem quae mollitia animi illo,
            perferendis adipisci sapiente vel repellendus ex optio nesciunt
            quibusdam dolor consequatur tempore consectetur ipsum!
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
