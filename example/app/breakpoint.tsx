import Stack from 'expo-router/stack';
import { Text, View, useWindowDimensions } from 'react-native';
import { StyleSheet, useStyleSheet } from 'react-native-use-stylesheet';

export default function Breakpoint() {
  const { width } = useWindowDimensions();
  const queryStyle = useStyleSheet(styles);

  return (
    <View style={queryStyle.container}>
      <Stack.Screen options={{ headerTitle: 'Breakpoint' }} />
      <Text style={queryStyle.titleText}>
        Change the window width to view different background color at each
        breakpoint.
      </Text>
      <View style={queryStyle.wrapper}>
        <View style={[queryStyle.breakpointWrapper, queryStyle.smWrapper]}>
          <Text style={queryStyle.breakpointText}>'sm'</Text>
          <Text style={queryStyle.breakpointText}>400</Text>
        </View>
        <View style={[queryStyle.breakpointWrapper, queryStyle.mdWrapper]}>
          <Text style={queryStyle.breakpointText}>'md'</Text>
          <Text style={queryStyle.breakpointText}>600</Text>
        </View>
        <View style={[queryStyle.breakpointWrapper, queryStyle.lgWrapper]}>
          <Text style={queryStyle.breakpointText}>'lg'</Text>
          <Text style={queryStyle.breakpointText}>800</Text>
        </View>
        <View style={queryStyle.widthWrapper}>
          <Text style={queryStyle.widthText}>Current width: {width}</Text>
        </View>
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
    backgroundColor: '#25c2a0',
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    mediaQueries: [
      { query: 'sm', backgroundColor: '#c084fc' },
      { query: 'md', backgroundColor: '#22d3ee' },
      { query: 'lg', backgroundColor: '#fb7185' },
    ],
  },
  titleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  widthWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  widthText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
    paddingBottom: 60,
  },
  breakpointWrapper: {
    ...StyleSheet.absoluteFillObject,
    left: 400,
    justifyContent: 'center',
    borderLeftColor: '#fef08a',
    borderLeftWidth: 4,
    borderStyle: 'dashed',
    paddingTop: 60,
  },
  smWrapper: {
    left: 400,
  },
  mdWrapper: {
    left: 600,
  },
  lgWrapper: {
    left: 800,
  },
  breakpointText: {
    textAlign: 'left',
    color: '#fef08a',
    fontSize: 24,
    fontWeight: '600',
    paddingLeft: 24,
    minWidth: 200,
  },
});
