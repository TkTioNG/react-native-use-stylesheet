import Stack from 'expo-router/stack';
import { Text, View } from 'react-native';
import {
  MediaQueryComponent,
  StyleSheet,
  useStyleSheet,
} from 'react-native-use-stylesheet';

export default function MinMaxPixelRatio() {
  const queryStyle = useStyleSheet(styles);

  return (
    <View style={queryStyle.container}>
      <Stack.Screen options={{ title: 'Pixel Ratio' }} />
      <Text style={queryStyle.titleText}>
        Change device with different Pixel Ratio to view different text hint.
      </Text>
      <View style={queryStyle.wrapper}>
        <MediaQueryComponent maxPixelRatio={1.5}>
          <Text style={queryStyle.cellText}>This is shown when:</Text>
          <Text style={queryStyle.cellText}>Pixel Ratio {'<='} 1.5</Text>
        </MediaQueryComponent>
        <MediaQueryComponent minPixelRatio={1.51} maxPixelRatio={2}>
          <Text style={queryStyle.cellText}>This is shown when:</Text>
          <Text style={queryStyle.cellText}>Pixel Ratio is 2</Text>
        </MediaQueryComponent>
        <MediaQueryComponent minPixelRatio={2.01}>
          <Text style={queryStyle.cellText}>This is shown when:</Text>
          <Text style={queryStyle.cellText}>Pixel Ratio is 3 or above</Text>
        </MediaQueryComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b1b1d',
    flex: 1,
    paddingTop: 16,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  titleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
});
