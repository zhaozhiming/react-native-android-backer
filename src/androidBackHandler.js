import { BackHandler, Platform } from 'react-native';
import navigationService from './navigationServer';

const EXIT_APP_EVENT_NAME = 'EXIT_APP_PRESS';

// Second timestamp to click back button which should be less 2 seconds than current timestamp
let rebackTime = Date.now() - 2000;

const handlerBack = ({ exitToast = () => {}, isExitScreen = () => false }) => {
  const currentRoute = navigationService.getCurrentRoute();
  const { routeName, params } = currentRoute;

  if (isExitScreen(routeName)) {
    // if time interval of the double click less than 2 seconds, App will exit
    if (Date.now() - rebackTime < 2000) {
      BackHandler.exitApp();
      return true;
    }

    exitToast();
    rebackTime = Date.now();
    return true;
  }

  const { disableBack, backPage, backPageParams, isModalShow, closeModal } =
    params || {};
  if (disableBack) return true;

  if (isModalShow && isModalShow() === true) {
    closeModal();
    return true;
  }

  if (backPage) {
    navigationService.navigate(backPage, backPageParams);
    return true;
  }

  navigationService.goBack();
  return true;
};

export default options => {
  if (Platform.OS === 'android') {
    return BackHandler.addEventListener(EXIT_APP_EVENT_NAME, () =>
      handlerBack(options)
    );
  }
  return null;
};
