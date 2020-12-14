import React from 'react';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import './app.css'
import Loader from "./components/Loader/Loader";
import Table from "./components/Table/Table";
import DetailRowView from "./components/DetailRowView/DetailRowView";
import ModeSelector from "./components/ModeSelector/ModeSelector";
import TableSearch from "./components/TableSearch/TableSearch";
import Alert from "./components/Alert/Alert";
import {AlertState} from "./context/alert/AlertState";

class App extends React.Component{

  state = {
    isModeSelected: false,
    isLoading: false,
    data: [],
    sort: 'asc', // desk
    sortField: 'id',
    row: null,
    currentPage: 0,
    search: ''
  }

  async fetchData(url) {
    const response = await fetch(url)
    const data = await response.json()

    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    })
  }

  onSort = sortField => {
    const clonedData = this.state.data.concat()
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc'

    const data = _.orderBy(clonedData, sortField, sort)

    this.setState({
      data: data,
      sort: sort,
      sortField: sortField
    })
  }

  modeSelectHandler = url => {
    this.setState({
      isModeSelected: true,
      isLoading: true
    })

    this.fetchData(url)
  }

  onRowSelect = row => {
    this.setState({row})
    console.log(row)
  }

  pageChangeHandler = ({selected}) => {
    this.setState({currentPage: selected})
  }

  searchHandler = search => {
    this.setState({search, currentPage: 0})
  }

  getFilteredData() {
    const {data, search} = this.state

    if (!search) {
      return data
    }

    return data.filter(item => {
      return item['firstName'].toLowerCase().includes(search.toLowerCase())
        || item['lastName'].toLowerCase().includes(search.toLowerCase())
        || item['email'].toLowerCase().includes(search.toLowerCase())
        || item['phone'].toLowerCase().includes(search.toLowerCase())
    })

  }

  render() {
    const pageSize = 50

    if (!this.state.isModeSelected) {
      return (
        <div className="container">
          <ModeSelector onSelect={this.modeSelectHandler} />
        </div>
      )
    }

    const filteredData = this.getFilteredData()

    const pageCount = Math.ceil(filteredData.length / pageSize)

    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage]

    return (
      <AlertState>
        <div className="container">
          <Alert />
          {
            this.state.isLoading
              ? <Loader />
              : <React.Fragment>
                  <TableSearch
                    onSearch={this.searchHandler}
                  />
                  <Table
                    data={displayData}
                    onSort={this.onSort}
                    sort={this.state.sort}
                    sortField={this.state.sortField}
                    onRowSelect={this.onRowSelect}
                  />
                </React.Fragment>
          }

          {
            this.state.data.length > pageSize
              ? <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.pageChangeHandler}
                  containerClassName={'pagination'}
                  activeClassName={'active'}
                  activeLinkClassName={'bg-dark'}
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link'}
                  previousClassName={'page-item'}
                  nextClassName={'page-item'}
                  previousLinkClassName={'page-link'}
                  nextLinkClassName={'page-link'}
                  breakClassName={'page-item'}
                  breakLinkClassName={'page-link'}
                  forcePage={this.state.currentPage}
                />
              : null
          }

          {
            this.state.row
              ? <DetailRowView person={this.state.row}
                />
              : null
          }
        </div>
      </AlertState>
    );
  }
}

export default App

