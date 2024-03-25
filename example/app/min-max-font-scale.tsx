import Stack from 'expo-router/stack';
import { Text, View } from 'react-native';
import {
  MediaQueryComponent,
  StyleSheet,
  useStyleSheet,
} from 'react-native-use-stylesheet';

export default function MinmaxFontScaley() {
  const queryStyle = useStyleSheet(styles);

  return (
    <View style={queryStyle.container}>
      <Stack.Screen options={{ title: 'Font scale' }} />
      <Text style={queryStyle.titleText}>
        Adjust font scale in settings to view different text hint.
      </Text>
      <View style={queryStyle.wrapper}>
        <MediaQueryComponent maxFontScale={1}>
          <Text style={queryStyle.cellText}>This is shown when:</Text>
          <Text style={queryStyle.cellText}>Font Scale {'<='} 1</Text>
        </MediaQueryComponent>
        <MediaQueryComponent minFontScale={1.01} maxFontScale={2}>
          <Text style={queryStyle.cellText}>This is shown when:</Text>
          <Text style={queryStyle.cellText}>Font Scale is 2</Text>
        </MediaQueryComponent>
        <MediaQueryComponent minFontScale={2.01}>
          <Text style={queryStyle.cellText}>This is shown when:</Text>
          <Text style={queryStyle.cellText}>Font Scale is 3</Text>
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
