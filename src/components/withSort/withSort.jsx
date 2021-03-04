import React from 'react';
import { nanoid } from 'nanoid';

const sortList = (list) => {
  const result = list.map((item) => ({
    id: nanoid(),
    ...item,
  }));
  result.sort((a, b) => b.amount - a.amount);

  return result;
};

function withSort(Component) {
  return function (props) {
    const { list, ...remain } = props;
    const sortedList = sortList(list);

    return (
      <Component list={sortedList} {...remain} />
    );
  }
}

export default withSort;
