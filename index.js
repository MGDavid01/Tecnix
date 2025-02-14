import { registerRootComponent } from 'expo';
import Navigation from './Navigation';

import Login from './LogIn';
import Home from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Login);
registerRootComponent(Home);
registerRootComponent(Navigation);