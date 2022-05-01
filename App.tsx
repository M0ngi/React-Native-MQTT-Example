import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './src/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigator />
    </SafeAreaProvider>
  );
}