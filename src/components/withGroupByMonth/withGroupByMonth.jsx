import React from 'react';

// Data from server is not updated, so let's assume current year is the latest year in set
const CURRENT_YEAR = 2018;

const getMonthsList = (list) => {
  const currentYear = (CURRENT_YEAR)
    ? CURRENT_YEAR
    : (new Date()).getFullYear();

  const months = list.reduce((prev, item) => {
    const result = { ...prev };

    const timestamp = Date.parse(item.date);
    if (Number.isNaN(timestamp)) {
      throw new Error('Invalid date string');
    }

    const date = new Date(timestamp);
    const year = date.getFullYear();
    if (year !== currentYear) {
      return result;
    }

    const month = date.getMonth();
    if (!(month in result)) {
      result[month] = {
        amount: 0,
        month: date.toLocaleDateString('en-US', { month: 'short' }),
      };
    }

    result[month].amount += item.amount;

    return result;
  }, {});

  const keys = Object.keys(months).sort();
  return keys.map((month) => ({ ...months[month] }));
};

function withGroupByMonth(Component) {
  return function (props) {
    const { list, ...remain } = props;

    const monthsList = getMonthsList(list);

    return (
      <Component list={monthsList} {...remain} />
    );
  }
}

export default withGroupByMonth;
