import React from 'react';
import ProductCopm from './saveproduct';
import { FaCircleArrowRight } from 'react-icons/fa6';

function HorDiv(props) {
  return (
    <div className="w-full overflow-x-auto scroll-smooth scrollbar-hide">
    <div className="flex gap-4 px-4 w-max">
      {props.data?.map((product, index) =>
        product.status ? (
          <div
            key={index}
            className="min-w-[250px] max-w-[250px] flex-shrink-0 bg-white rounded shadow"
          >
            <ProductCopm atcbtn={props.btn} data={product} />
          </div>
        ) : null
      )}
    </div>
  </div>
  
  );
}

export default HorDiv;
