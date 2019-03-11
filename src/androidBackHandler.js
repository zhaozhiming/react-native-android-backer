import { BackHandler, Platform } from 'react-native';
import navigationService from './navigationServer';

const EXIT_APP_EVENT_NAME = 'EXIT_APP_PRESS';

// 第二次点击 back 键的时间戳，初始化时比当前时间少 2 秒
let rebackTime = Date.now() - 2000;

const handlerBack = ({ exitToast, isExitScreen }) => {
  const currentRoute = navigationService.getCurrentRoute();
  const { routeName, params } = currentRoute;

  if (isExitScreen(routeName)) {
    // 如果时间小于 2 秒就退出app
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
