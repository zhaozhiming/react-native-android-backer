import { BackHandler } from 'react-native';
import { handlerBack } from '../androidBackHandler';
import navigationService from '../navigationServer';

jest.mock('react-native', () => {
  return {
    BackHandler: {
      exitApp: jest.fn(),
    },
  };
});

jest.mock('../navigationServer', () => {
  const getCurrentRoute = jest.fn();
  const mockCloseModal = jest.fn();
  getCurrentRoute
    .mockReturnValueOnce({ routeName: 'Foo' })
    .mockReturnValueOnce({ routeName: 'Foo' })
    .mockReturnValueOnce({ params: { disableBack: true } })
    .mockReturnValueOnce({
      params: { isModalShow: () => true, closeModal: mockCloseModal },
    })
    .mockReturnValueOnce({
      params: { backPage: 'Bar', backPageParams: {} },
    })
    .mockReturnValueOnce({});

  const mockNavigate = jest.fn();
  const mockGoBack = jest.fn();
  return {
    getCurrentRoute,
    navigate: mockNavigate,
    goBack: mockGoBack,
    mockCloseModal,
    mockNavigate,
    mockGoBack,
  };
});

const exitToast = jest.fn();

describe('Android Back Handler', () => {
  beforeEach(() => {
    exitToast.mockClear();
  });

  it('should show exit app toast when first time at top level page', () => {
    const isExitScreen = jest.fn();
    isExitScreen.mockReturnValue(true);
    handlerBack({ exitToast, isExitScreen });
    expect(exitToast.mock.calls.length).toBe(1);
  });

  it('should exit app when second click at top level page', () => {
    const isExitScreen = jest.fn();
    isExitScreen.mockReturnValue(true);
    handlerBack({ exitToast, isExitScreen });
    expect(BackHandler.exitApp.mock.calls.length).toBe(1);
  });

  it('should disabled back button when disableBack is true', () => {
    const isExitScreen = jest.fn();
    isExitScreen.mockReturnValue(false);
    const result = handlerBack({ isExitScreen });
    expect(result).toBeTruthy();
  });

  it('should close modal when show modal is true', () => {
    const isExitScreen = jest.fn();
    isExitScreen.mockReturnValue(false);
    handlerBack({ isExitScreen });
    expect(navigationService.mockCloseModal.mock.calls.length).toBe(1);
  });

  it('should navigate when backPage set up', () => {
    const isExitScreen = jest.fn();
    isExitScreen.mockReturnValue(false);
    handlerBack({ isExitScreen });
    expect(navigationService.mockNavigate.mock.calls.length).toBe(1);
  });

  it('should goback when params is empty', () => {
    const isExitScreen = jest.fn();
    isExitScreen.mockReturnValue(false);
    handlerBack({ isExitScreen });
    expect(navigationService.mockGoBack.mock.calls.length).toBe(1);
  });
});
