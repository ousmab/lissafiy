import { SafeAreaView } from 'react-native-safe-area-context';
import { Text} from 'react-native';
function Historique() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Historique journaliere, hebdomadaire et mensuelle!</Text>
    </SafeAreaView>
  );
}


export default Historique;