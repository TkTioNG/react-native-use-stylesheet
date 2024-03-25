import Stack from 'expo-router/stack';
import { Text, View } from 'react-native';
import {
  MediaQueryComponent,
  StyleSheet,
  useStyleSheet,
} from 'react-native-use-stylesheet';

export default function MinMaxAspectRatio() {
  const queryStyle = useStyleSheet(styles);

  return (
    <View style={queryStyle.container}>
      <Stack.Screen options={{ title: 'Aspect Ratio' }} />
      <Text style={queryStyle.titleText}>
        Adjust your window aspect ratio to view different text hint.
      </Text>
      <View style={queryStyle.wrapper}>
        <MediaQueryComponent maxAspectRatio={0.5}>
          <Text style={queryStyle.cellText}>This is shown when:</Text>
          <Text style={queryStyle.cellText}>aspect-ratio {'<='} 0.5</Text>
          <View style={queryStyle.aspectRatioBox} />
        </MediaQueryComponent>
        <MediaQueryComponent minAspectRatio={0.51} maxAspectRatio={1.49}>
          <Text style={queryStyle.cellText}>This is shown when:</Text>
          <Text style={queryStyle.cellText}>
            0.51 {'<='} aspect-ratio {'<='} 1.49
          </Text>
          <View style={queryStyle.aspectRatioBox} />
        </MediaQueryComponent>
        <MediaQueryComponent minAspectRatio={1.5} maxAspectRatio={1.99}>
          <Text style={queryStyle.cellText}>This is shown when:</Text>
          <Text style={queryStyle.cellText}>
            1.5 {'<='} aspect-ratio {'<='} 1.99
          </Text>
          <View style={queryStyle.aspectRatioBox} />
        </MediaQueryComponent>
        <MediaQueryComponent minAspectRatio={2}>
          <Text style={queryStyle.cellText}>This is shown when:</Text>
          <Text style={queryStyle.cellText}>2 {'<='} aspect-ratio</Text>
          <View style={queryStyle.aspectRatioBox} />
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
  aspectRatioBox: {
    marginTop: 40,
    borderWidth: 4,
    borderColor: 'white',
    aspectRatio: 1,
    width: 60,
    mediaQueries: [
      { query: { maxAspectRatio: 0.5 }, aspectRatio: 0.5, width: 50 },
      { query: { minAspectRatio: 1.5 }, aspectRatio: 1.5, width: 90 },
      { query: { minAspectRatio: 2 }, aspectRatio: 2, width: 120 },
    ],
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
