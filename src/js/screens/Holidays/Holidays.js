import React, { Component } from 'react'
import { connect } from 'react-redux'

import { push, goBack } from 'actions/navigationActions'

import { BottomNav } from 'components'

import { TopBar, Container, HolidayCard } from 'ui-components'

import { DataApi } from 'utils'

class Holidays extends Component {
  constructor(props) {
    super(props)
    this.state = {
      holidays: [],
    }
  }

  componentWillMount() {
    DataApi.getHolidays()
      .perform()
      .then(response => this.setState({
        holidays: response.data.data,
      }))
      .then(response => (
        this.state.holidays.map((day) => {
          const holiday = day
          holiday.open = false
          return holiday
        })))
  }

  openDescription = (holidayId) => {
    const newHolidays = this.state.holidays.map((day) => {
      const holiday = day
      if (holiday.id === holidayId) {
        holiday.open = !holiday.open
      }
      return holiday
    })

    this.setState({
      holidays: newHolidays,
    })
  }

  render() {
    return (
      <div className='screen'>
        <TopBar
          title='Все праздники'
        />
        <Container scrolling stretching>
          <div>
            <div style={{ margin: '24px 16px', color: '#333', fontSize: 16 }}>
              Мы собираем всю информацию о крупных городских праздниках.
              Здесь представлен анонс будущих мероприятий.
            </div>
            {this.state.holidays.map(item => (
              <HolidayCard
                key={item.id}
                onClick={this.openDescription}
                content={item}
              />
            ))}
          </div>
        </Container>
        <BottomNav />
      </div>
    )
  }
}

export default connect(
  state => ({
  }),
  dispatch => ({
  })
)(Holidays)
