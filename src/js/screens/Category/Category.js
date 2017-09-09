import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { replace } from 'actions/navigationActions'
import { setViewMode } from 'actions/viewActions'
import { VIEW_MODE_LIST, VIEW_MODE_MAP } from 'consts/viewModes'

import { Map } from 'components'

import { InfiniteList as InfiniteListContainer } from 'containers'

import { FloatingButton } from 'ui-components'

import { DataApi } from 'utils/DataApi'

import style from './style.scss'

class Category extends Component {
  constructor(props) {
    super(props)

    this.viewMode = this.props.params.viewMode.toUpperCase()

    this.state = {
      filterByDate: null,
      holiDates: [],
    }
  }

  componentWillMount() {
    this.getHoliDates(this.props)
  }

  componentWillUpdate(nextProps) {
    const isCategoryEqual = this.props.params.categoryId === nextProps.params.categoryId

    if (!isCategoryEqual) {
      this.getHoliDates(nextProps)
    }
  }

  getHoliDates(props) {
    DataApi.getDatesWithEvents()
      .byHoliday(1)
      .byCategory(props.params.categoryId)
      .perform()
      .then((response) => {
        this.setState({
          holiDates: response.data.data,
        })
      })
  }

  viewMode = this.props.params.viewMode.toUpperCase()

  toggleViewMode = () => {
    this.viewMode = this.viewMode === VIEW_MODE_LIST ? VIEW_MODE_MAP : VIEW_MODE_LIST
    this.props.onViewModeChanged(
      this.props.params.categoryId,
      this.viewMode
    )
  }

  filterByDate = (date) => {
    if (date !== this.state.filterByDate) {
      this.setState({
        filterByDate: date,
      })
      return
    }
    this.setState({
      filterByDate: null,
    })
  }

  render() {
    return (
      <div>
        {
          this.viewMode === VIEW_MODE_LIST
            ? <div>
              {
                this.state.holiDates.length > 1
                  ? <div style={{ padding: '16px 16px 24px 16px', display: 'flex' }}>
                    {this.state.holiDates.map((item) => {
                      return (
                        <button
                          key={item.date}
                          type='button'
                          className={`${style.filter_date} ${this.state.filterByDate === item.date ? style.filter_date__active : ''}`}
                          onClick={() => {
                            this.filterByDate(item.date)
                          }}
                        >{item.dateFormatted.day} {item.dateFormatted.month}</button>
                      )
                    })}
                  </div>
                  : ''
              }
              <InfiniteListContainer
                categoryId={this.props.params.categoryId}
                filterByDate={this.state.filterByDate}
              />
            </div>
            : <Map categoryId={this.props.params.categoryId} />
        }
        <FloatingButton
          typeIcon={this.viewMode === VIEW_MODE_LIST ? 'map' : 'list'}
          title={this.viewMode === VIEW_MODE_LIST ? 'Карта' : 'Список'}
          onClick={this.toggleViewMode}
        />
      </div>
    )
  }
}

Category.propTypes = {
  params: PropTypes.object.isRequired,
  onViewModeChanged: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    categoryData: state.data.categoryData,
    config: state.data.configData,
    view: state.view,
  }),
  dispatch => ({
    onViewModeChanged: (currCategoryId, newViewMode) => {
      dispatch(setViewMode(newViewMode))
      dispatch(replace(`/category/${currCategoryId}/${newViewMode.toLowerCase()}`))
    },
  })
)(Category)
