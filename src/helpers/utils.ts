export const formatPrice = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export const sortByName = (data: GroupTypes[] | DataTypes[] | any) => {
  return data.sort((a: GroupTypes, b: GroupTypes) => a.name.localeCompare(b.name, undefined,
    { numeric: true, sensitivity: 'base' }))
}

export const groupData = (arr: DataTypes[], keys: string[]) => {
  let key = keys[0]
  if (!key) return arr
  let values = Object.values(
    arr.reduce((acc: any, cur: any) => {
      if (!acc[cur[key]])
        acc[cur[key]] = { name: cur[key], children: [], list: [] }
      acc[cur[key]].children.push(cur)
      acc[cur[key]].list.push(cur)
      return acc
    }, {}))

  if (keys.length) {
    values.forEach((item: any) => {
      item.children = groupData(item.children, keys.slice(1))
    })
  }
  return values
}

export type DataTypes = {
  BCAP1: string;
  BCAP2: string;
  BCAP3: string;
  id: string;
  name: string;
  spend: number
}

export type GroupTypes = {
  name: string;
  list: DataTypes[];
  children: string[]
}

export type GroupsTypes = {
  name: string;
  list: DataTypes[];
  children: GroupTypes[]
}