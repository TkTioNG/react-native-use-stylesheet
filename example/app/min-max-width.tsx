import Stack from 'expo-router/stack';
import { FlatList, ScrollView, Text, View } from 'react-native';
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

function DataItem({
  id,
  wrapperStyle,
  viewStyle,
  textStyle,
}: {
  id: number;
  wrapperStyle: object;
  viewStyle: object;
  textStyle: object;
}) {
  return (
    <View style={wrapperStyle}>
      <View style={viewStyle}>
        <Text style={textStyle}>{id}</Text>
      </View>
    </View>
  );
}

export default function MinMaxWidth() {
  const queryStyle = useStyleSheet(styles);

  return (
    <ScrollView style={queryStyle.container}>
      <Stack.Screen options={{ title: 'Device Width' }} />
      <Text style={queryStyle.titleText}>
        Change the window width above/below 600 for different layout.
      </Text>
      <MediaQueryComponent maxWidth={600}>
        <FlatList
          style={queryStyle.wrapper}
          data={DATA}
          renderItem={({ item }) => (
            <DataItem
              id={item.id}
              wrapperStyle={queryStyle.cellWrapper}
              viewStyle={[
                queryStyle.cellItem,
                { backgroundColor: item.backgroundColor },
              ]}
              textStyle={queryStyle.cellText}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false}
          numColumns={1}
        />
      </MediaQueryComponent>
      <MediaQueryComponent minWidth={601}>
        <FlatList
          style={queryStyle.wrapper}
          data={DATA}
          renderItem={({ item }) => (
            <DataItem
              id={item.id}
              wrapperStyle={queryStyle.cellWrapper}
              viewStyle={[
                queryStyle.cellItem,
                { backgroundColor: item.backgroundColor },
              ]}
              textStyle={queryStyle.cellText}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false}
          numColumns={3}
        />
      </MediaQueryComponent>
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
    mediaQueries: [{ query: { minWidth: 601 }, paddingLeft: 24 }],
  },
  cellWrapper: {
    flex: 1,
    paddingBottom: 24,
    paddingHorizontal: 24,
    mediaQueries: [
      { query: { minWidth: 601 }, paddingLeft: 0, paddingRight: 24 },
    ],
  },
  cellItem: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  cellText: {
    fontSize: 40,
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
