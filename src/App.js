import React from 'react';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import Loader from "./components/Loader/Loader";
import Table from "./components/Table/Table";
import DetailRowView from "./components/DetailRowView/DetailRowView";
import ModeSelector from "./components/ModeSelector/ModeSelector";

class App extends React.Component{

  state = {
    isModeSelected: false,
    isLoading: false,
    data: [],
    sort: 'asc', // desk
    sortField: 'id',
    row: null,
    currentPage: 0
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
  }

  pageChangeHandler = ({selected}) => {
    this.setState({currentPage: selected})
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

    const displayData = _.chunk(this.state.data, pageSize)[this.state.currentPage]

    return (
      <div className="container">
        {
          this.state.isLoading
            ? <Loader />
            : <Table
                data={displayData}
                onSort={this.onSort}
                sort={this.state.sort}
                sortField={this.state.sortField}
                onRowSelect={this.onRowSelect}
            />
        }

        {
          this.state.data.length > pageSize
            ? <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                pageCount={20}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.pageChangeHandler}
                containerClassName={'pagination'}
                activeClassName={'active'}
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
            ? <DetailRowView person={this.state.row} />
            : null
        }
      </div>
    );
  }
}

export default App

