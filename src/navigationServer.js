import { NavigationActions } from 'react-navigation';

let navigator;

const setTopLevelNavigator = navigatorRef => {
  navigator = navigatorRef;
};

const navigate = (routeName, params = {}) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};

const goBack = () => {
  navigator.dispatch(NavigationActions.back());
};

const getCurrentRoute = () => {
  let route = navigator.state.nav;
  while (route.routes) {
    route = route.routes[route.index];
  }
  return route;
};

export default {
  navigate,
  setTopLevelNavigator,
  getCurrentRoute,
  goBack,
};
