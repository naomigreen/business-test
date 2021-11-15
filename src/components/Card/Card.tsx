import React from 'react'
import { formatPrice } from '../../helpers/utils';
import './Card.css';

interface Props {
  title: string;
  price: number;
}

const Card: React.FC<Props> = ({ title, price }) => (
  <div className='card'>
    <h3 className='card-title'>{title}</h3>
    <p className='card-price'>{`Total spend: ${formatPrice.format(price)}`}</p>
  </div>
)


export default Card
