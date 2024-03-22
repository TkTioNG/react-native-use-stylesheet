import { View, Text } from 'react-native';
import { useStyleSheet, StyleSheet } from 'react-native-use-stylesheet';

export default function App() {
  const queryStyles = useStyleSheet(styles);

  return (
    <View style={queryStyles.container}>
      <Text>Result</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
