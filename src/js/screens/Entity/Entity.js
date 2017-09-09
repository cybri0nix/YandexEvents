import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { goBack } from 'actions/navigationActions'

import { BottomNav } from 'components'

import { List as ListContainer } from 'containers'

import { TopBar, Icon, Container, Spinner } from 'ui-components'

import { DataApi } from 'utils/DataApi'

class Entity extends Component {
  state = {
    entity: {},
    loading: true,
  }

  componentWillMount() {
    DataApi.getEntity()
      .byHoliday(1)
      .byId(this.props.params.entityId)
      .perform()
      .then(response => this.setState({
        entity: response.data.data,
        loading: false,
      }))
  }

  goBack = () => {
    this.props.goBack()
  }

  render() {
    const entity = this.state.entity
    return (
      <div>
        {this.state.loading
          ? (<Spinner />)
          : (
            <div className='screen'>
              <TopBar
                title={entity.title}
                onClick={this.goBack}
                iconLeft={
                  <Icon type='arrowBack' width='24' height='24' color='#fff' />
                }
              />
              <Container scrolling stretching>
                <ListContainer
                  params={{
                    method: 'events',
                    holiday: 1,
                    entityId: this.props.params.entityId,
                  }}
                />
              </Container>
              <BottomNav />
            </div>
          )
        }
      </div>
    )
  }
}

Entity.propTypes = {
  params: PropTypes.object.isRequired,
  goBack: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    entityData: state.data.entityData,
  }),
  dispatch => ({
    goBack: () => {
      dispatch(goBack())
    },
  })
)(Entity)
