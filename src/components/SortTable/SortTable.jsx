import React from 'react';
import PropTypes from 'prop-types';

function SortTable(props) {
  console.log('SortTable', props);

  return (
    <div>
      <h2>Sort Table</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map(item => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

SortTable.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  })).isRequired,
};

export default SortTable;
