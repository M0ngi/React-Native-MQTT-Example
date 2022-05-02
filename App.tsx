import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './src/navigation';
import { FirebaseConfig } from './src/config/firebase';

export default function App() {
  FirebaseConfig.init();

  return (
    <SafeAreaProvider>
      <Navigator />
    </SafeAreaProvider>
  );
}