import React, { useState, useEffect } from 'react';
import { useFetch } from '../../helpers/hooks';
import { DataTypes, sortByName } from '../../helpers/utils';
import Slider from '../../components/Slider/Slider';
import Card from '../../components/Card/Card';
import Navigation from '../../components/Navigation/Navigation';
import spinner from '../../assets/loadingIcon.svg';
import './styles.css';

const Main = () => {
  const [data, loading] = useFetch('/data', []);
  const [selectedValue, setSelectedValue] = useState(0);
  const [displayData, setDisplayData] = useState([{ name: '' }] as DataTypes[])
  const [range, setRange] = useState([{ spend: 0 } as DataTypes]);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);

  useEffect(() => {
    const dataCopy = [...data];

    if (data.length) {
      setDisplayData(data)
      setRange(data?.sort((a: DataTypes, b: DataTypes) => a.spend - b.spend))
      setDisplayData(sortByName(dataCopy));
    }
  }, [data]);

  if (loading) {
    return <img className='loading-icon' src={spinner} alt='' />
  }

  const filterCardsByPrice = (value: number) => {
    const data = range.filter((data: DataTypes) => data.spend <= value);
    setDisplayData(sortByName(data));
  }

  const handleFilter = (e: any) => {
    setSelectedValue(e.target.value)
    filterCardsByPrice(e.target.value)
  }

  // Doing two types of sorting here, one for the range and one for the display, dataCopy stops them overriding each other. 
  const getCategory = (data: DataTypes[]) => {
    const dataCopy = [...data];
    setDisplayData(sortByName(dataCopy));
    setRange(data?.sort((a: DataTypes, b: DataTypes) => a.spend - b.spend))

    setMin(data[0]?.spend)
    setMax(data[data.length - 1]?.spend)
    setSelectedValue(data[data.length - 1]?.spend)
  }
  const defaultMin = range[0]?.spend;
  const defaultMax = range[range.length - 1]?.spend;

  return (
    <div className='main-section'>
      <div className='menu'>
        <div className='nav'>
          <h3>Navigation</h3>
          <Navigation getCategory={getCategory} data={data} />
        </div>
        <div className='filter'>
          <h3>Filter</h3>
          <p>Spending</p>
          <Slider
            min={min || defaultMin}
            max={max || defaultMax}
            selectedValue={selectedValue || defaultMax}
            handleFilter={(e: any) => handleFilter(e)}
          />
        </div>
      </div>
      <div className='card-section'>
        {displayData.map((data) => (
          <Card key={data.id} title={data.name} price={data.spend} />
        ))}
      </div>
    </div>
  )
}

export default Main
