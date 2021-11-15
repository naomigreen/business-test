import React, { FC, useState } from 'react';
import { DataTypes, GroupsTypes, groupData, sortByName } from '../../helpers/utils';
import './styles.css';

interface Props {
  data: DataTypes[]
  getCategory: (data: DataTypes[]) => void;
}

const Navigation: FC<Props> = ({ data, getCategory }) => {
  const [isOpen, setOpen] = useState({ child: '', grandchild: '' });
  const sortedData = sortByName(groupData(data, ["BCAP1", "BCAP2", "BCAP3"]))

  const handleParentClick = (e: any, name: string, array: DataTypes[]) => {
    e.stopPropagation()
    getCategory(array)
    if (name === isOpen.child) {
      setOpen({ child: '', grandchild: '' })
      return
    }
    setOpen({ ...isOpen, child: name })
  }

  const handleChildClick = (e: any, name: string, array: DataTypes[]) => {
    e.stopPropagation()
    getCategory(array)
    if (name === isOpen.grandchild) {
      setOpen({ ...isOpen, grandchild: '' })
      return
    }
    setOpen({ ...isOpen, grandchild: name })
  }
  return (
    <div className='navigation'>
      <ul>
        {sortedData.map((item: GroupsTypes) => (
          <>
            <li key={item.name} onClick={(e) => handleParentClick(e, item.name, item.list)}><span className={isOpen.child === item.name ? 'arrow down' : 'arrow'}>{item.name}</span> </li>
            <>
              <ul className={isOpen.child === item.name ? 'active' : 'nested'}>
                {sortByName(item.children).map((i: any) => (
                  <>
                    <li key={i.name} onClick={(e) => handleChildClick(e, i.name, i.list)}><span className={isOpen.grandchild === i.name ? 'arrow down' : 'arrow'}>{i.name}</span> </li>
                    <>
                      <ul className={isOpen.grandchild === i.name ? 'active' : 'nested'}>
                        {sortByName(i.children).map((c: any) => (
                          <li key={c.name} onClick={() => getCategory(c.list)}>{c.name}</li>
                        ))}
                      </ul>
                    </>
                  </>
                ))}
              </ul>
            </>
          </>
        ))}
      </ul>
    </div>
  )
}

export default Navigation
