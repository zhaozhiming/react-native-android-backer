import React, { Component } from 'react';
import navigationService from './navigationServer';
import androidBackHandler from './androidBackHandler';

export default (WrapComponent, options) => {
  class WithBacker extends Component {
    componentDidMount() {
      this.backHandler = androidBackHandler(options);
    }

    componentWillUnmount() {
      this.backHandler && this.backHandler.remove();
    }

    render() {
      return (
        <WrapComponent
          {...this.props}
          ref={navigatorRef => {
            navigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      );
    }
  }
  return WithBacker;
};
