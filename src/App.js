import React from 'react'
import _ from 'lodash'
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
    row: null

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

  render() {
    if (!this.state.isModeSelected) {
      return (
        <div className="container">
          <ModeSelector onSelect={this.modeSelectHandler} />
        </div>
      )
    }

    return (
      <div className="container">
        {
          this.state.isLoading
            ? <Loader />
            : <Table
                data={this.state.data}
                onSort={this.onSort}
                sort={this.state.sort}
                sortField={this.state.sortField}
                onRowSelect={this.onRowSelect}
            />
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

