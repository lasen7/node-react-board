import React, { Component } from 'react';
import { HomeWrapper } from 'components';

import * as auth from 'actions/auth';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Home extends Component {

  componentDidMount() {
    this.props.actions.getStatus();
  }

  render() {
    return (
      <HomeWrapper isLoggedIn={this.props.status.isLoggedIn} />
    );
  }
}

Home = connect(state => {
  return {
    status: state.auth.status,
  }
}, dispatch => {
  return {
    actions: bindActionCreators({
      getStatus: auth.getStatus,
    }, dispatch)
  }
})(Home);
export default Home;