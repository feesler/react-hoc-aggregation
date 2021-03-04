import React from 'react';
import MonthTable from './components/MonthTable/MonthTable.jsx';
import YearTable from './components/YearTable/YearTable.jsx';
import SortTable from './components/SortTable/SortTable.jsx';
import withGroupByMonth from './components/withGroupByMonth/withGroupByMonth.jsx';
import withGroupByYear from './components/withGroupByYear/withGroupByYear.jsx';
import withSort from './components/withSort/withSort.jsx';

const MonthTableExt = withGroupByMonth(MonthTable);
const YearTableExt = withGroupByYear(YearTable);
const SortTableExt = withSort(SortTable);

export default class App extends React.Component {
  state = {
    list: [],
  };

  async requestData() {
    const response = await fetch(process.env.REACT_APP_DATA_URL);
    if (!response.ok) {
      throw new Error('Invalid server response');
    }

    const data = await response.json();
    if (!data.list) {
      throw new Error('Invalid data');
    }

    this.setState((prev) => ({
      ...prev,
      list: [...data.list],
    }));
  }

  componentDidMount() {
    this.requestData();
  }

  render() {
    const { list } = this.state;
    return (
      <div id="app">
        <MonthTableExt list={list} />
        <YearTableExt list={list} />
        <SortTableExt list={list} />
      </div>
    );
  }
}