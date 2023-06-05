import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NativeModules } from 'react-native';

// Configure Enzyme with the adapter
Enzyme.configure({ adapter: new Adapter() });

// Mock any native modules used by your components
NativeModules.RNCNetInfo = {
  getCurrentState: jest.fn(),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};
