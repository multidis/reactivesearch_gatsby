import React, { Component } from 'react'
import {
  ReactiveBase,
  CategorySearch,
  SingleRange,
  ReactiveList,
} from '@appbaseio/reactivesearch'
import initReactivesearch from '@appbaseio/reactivesearch/lib/server'
import './reactivesearcher.css'
const reactiveSearchSettings = {
  settings: {
    app: 'carstore-dataset',
    credentials: '4HWI27QmA:58c731f7-79ab-4f55-a590-7e15c7e36721',
  },
  dataSearcher: {
    componentId: 'searchbox',
    dataField: 'model',
    categoryField: 'brand.keyword',
    placeholder: 'Search for cars',
    className: 'search',
    highlight: true,
  },
  searchSingleRange: {
    componentId: 'ratingsfilter',
    title: 'Filter by ratings',
    dataField: 'rating',
    data: [
      { start: '4', end: '5', label: '4 stars and up' },
      { start: '3', end: '5', label: '3 stars and up' },
      { start: '2', end: '5', label: '2 stars and up' },
      { start: '1', end: '5', label: 'see all ratings' },
    ],
    defaultSelected: '4 stars and up',
  },
  resultsCard: {
    className: 'right-col',
    componentId: 'result',
    title: 'Results',
    dataField: 'model',
    from: 0,
    size: 6,
    pagination: true,
    renderItem: data => ( <div key={data._id}>{data.brand} - {data.model}</div> ),
    react: { and: ['searchbox', 'ratingsfilter'] },
    innerClass: {
      resultStats: 'result-stats',
      list: 'list',
      listItem: 'list-item',
      image: 'image',
    },
  },
}

class SearchReactive extends Component {
  state = {
    reactivedata: null,
  }
  async componentDidMount() {
    const result = await initReactivesearch(
      [
        {
          ...reactiveSearchSettings.dataSearcher,
          type: 'CategorySearch',
          source: CategorySearch,
        },
        {
          ...reactiveSearchSettings.searchSingleRange,
          type: 'SingleRange',
          source: SingleRange,
        },
        {
          ...reactiveSearchSettings.resultsCard,
          type: 'ReactiveList',
          source: ReactiveList,
        },
      ],
      null,
      reactiveSearchSettings.settings
    )
    this.setState({ reactivedata: result })
  }
  render() {
    const { reactivedata } = this.state
    return (
      <div className="container">
        <ReactiveBase
          {...reactiveSearchSettings.settings}
          initialState={reactivedata}>
          <nav className="nav">
            <div className="title">
              <CategorySearch {...reactiveSearchSettings.dataSearcher} />
            </div>
            <SingleRange {...reactiveSearchSettings.searchSingleRange} />
            <ReactiveList {...reactiveSearchSettings.resultsCard} />
          </nav>
        </ReactiveBase>
      </div>
    )
  }
}

export default SearchReactive
