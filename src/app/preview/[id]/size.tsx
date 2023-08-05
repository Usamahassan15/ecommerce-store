"use client";

import React, { useState } from 'react';

function Size() {
  const [selectedSize, setSelectedSize] = useState('');

  const handleSizeChange = (event:any) => {
    setSelectedSize(event.target.id);
  };

  const getSizeButtonClass = (size:any) => {
    return `group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium ${
      selectedSize === size ? 'bg-blue-700 text-white' : ''
    }`;
  };

  return (
    <div className="flex flex-wrap gap-1">
      <div className="cursor-pointer">
        <input
          type="radio"
          name="size"
          id="size_xs"
          className="peer sr-only"
          onChange={handleSizeChange}
        />
        <label htmlFor="size_xs">
          <span className={getSizeButtonClass('size_xs')}>XS</span>
        </label>
      </div>

      <div className="cursor-pointer">
        <input
          type="radio"
          name="size"
          id="size_s"
          className="peer sr-only"
          onChange={handleSizeChange}
        />
        <label htmlFor="size_s">
          <span className={getSizeButtonClass('size_s')}>S</span>
        </label>
      </div>

      <div className="cursor-pointer">
        <input
          type="radio"
          name="size"
          id="size_m"
          className="peer sr-only"
          onChange={handleSizeChange}
        />
        <label htmlFor="size_m">
          <span className={getSizeButtonClass('size_m')}>M</span>
        </label>
      </div>

      <div className="cursor-pointer">
        <input
          type="radio"
          name="size"
          id="size_l"
          className="peer sr-only"
          onChange={handleSizeChange}
        />
        <label htmlFor="size_l">
          <span className={getSizeButtonClass('size_l')}>L</span>
        </label>
      </div>

      <div className="cursor-pointer">
        <input
          type="radio"
          name="size"
          id="size_xl"
          className="peer sr-only"
          onChange={handleSizeChange}
        />
        <label htmlFor="size_xl">
          <span className={getSizeButtonClass('size_xl')}>XL</span>
        </label>
      </div>
    </div>
  );
}

export default Size;
