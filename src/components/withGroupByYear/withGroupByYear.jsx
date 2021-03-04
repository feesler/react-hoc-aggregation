import React from 'react'
import PropTypes from 'prop-types'

const getYearsList = (list) => {
  const years = list.reduce((prev, item) => {
    const result = { ...prev };

    const timestamp = Date.parse(item.date);
    if (Number.isNaN(timestamp)) {
      throw new Error('Invalid date string');
    }

    const date = new Date(timestamp);
    const year = date.getFullYear();
    if (!(year in result)) {
      result[year] = {
        year,
        amount: 0,
      };
    }

    result[year].amount += item.amount;

    return result;
  }, {});

  const keys = Object.keys(years).sort();
  return keys.map((year) => ({ ...years[year] }));
};

function withGroupByYear(Component) {
  return function (props) {
    const { list, ...remain } = props;
    const yearsList = getYearsList(list);

    return (
      <Component list={yearsList} {...remain} />
    );
  }
}

export default withGroupByYear;
