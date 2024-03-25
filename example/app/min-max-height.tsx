import Stack from 'expo-router/stack';
import { ScrollView, Text, View } from 'react-native';
import {
  MediaQueryComponent,
  StyleSheet,
  useStyleSheet,
} from 'react-native-use-stylesheet';

const DATA = [
  { id: 1, backgroundColor: '#ef4444' },
  { id: 2, backgroundColor: '#f97316' },
  { id: 3, backgroundColor: '#eab308' },
  { id: 4, backgroundColor: '#22c55e' },
  { id: 5, backgroundColor: '#14b8a6' },
  { id: 6, backgroundColor: '#06b6d4' },
  { id: 7, backgroundColor: '#3b82f6' },
  { id: 8, backgroundColor: '#8b5cf6' },
  { id: 9, backgroundColor: '#d946ef' },
];

export default function MinMaxHeight() {
  const queryStyle = useStyleSheet(styles);

  return (
    <ScrollView style={queryStyle.container}>
      <Stack.Screen options={{ title: 'Device Height' }} />
      <Text style={queryStyle.titleText}>
        Change the window height to show/hide list item.
      </Text>
      <View style={queryStyle.wrapper}>
        <MediaQueryComponent maxHeight={800}>
          <View style={queryStyle.cellWrapper}>
            <View style={queryStyle.defaultCellItem}>
              <Text style={queryStyle.defaultCellText}>Max Height: 800</Text>
            </View>
          </View>
        </MediaQueryComponent>
        {DATA.map((item) => (
          <MediaQueryComponent key={item.id} minHeight={item.id * 50 + 450}>
            <View style={queryStyle.cellWrapper}>
              <View
                style={[
                  queryStyle.cellItem,
                  { backgroundColor: item.backgroundColor },
                ]}
              >
                <Text style={queryStyle.cellText}>
                  Min Height: {item.id * 50 + 450}
                </Text>
              </View>
            </View>
          </MediaQueryComponent>
        ))}
      </View>
    </ScrollView>
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
    alignItems: 'center',
  },
  cellWrapper: {
    flex: 1,
    paddingBottom: 24,
    paddingHorizontal: 24,
    maxWidth: 500,
    width: '100%',
  },
  cellItem: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 2,
  },
  cellText: {
    fontSize: 30,
    fontWeight: '600',
    color: 'white',
  },
  defaultCellItem: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 2,
    backgroundColor: '#cbd5e1',
  },
  defaultCellText: {
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
  },
  titleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
});
