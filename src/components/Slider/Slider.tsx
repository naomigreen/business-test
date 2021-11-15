import React, { FC } from 'react'
import { formatPrice } from '../../helpers/utils';

interface Props {
  min: number;
  max: number;
  selectedValue: number;
  handleFilter: (e: any) => void;
}

const Slider: FC<Props> = ({ min, max, selectedValue, handleFilter }) => (
  <div>
    <input className='price-range' aria-label='price-slider' onChange={handleFilter} type='range' min={`${min}`} max={`${max}`} step="5000" value={selectedValue || max} />
    <div className='data-values'>
      <div className='min-value'>{formatPrice.format(min)}</div>
      <div className='max-value'>{formatPrice.format(selectedValue)}</div>
    </div>
  </div>
)

export default Slider
