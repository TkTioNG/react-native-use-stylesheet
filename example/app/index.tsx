import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet, useStyleSheet } from 'react-native-use-stylesheet';

export default function App() {
  const queryStyle = useStyleSheet(styles);

  return (
    <View style={queryStyle.container}>
      <Text style={queryStyle.titleText}>Example App</Text>
      <Text style={queryStyle.packageText}>react-native-use-stylesheet</Text>
      <Text style={queryStyle.description}>
        Select one of the following demo:
      </Text>
      <View style={queryStyle.buttonList}>
        <Link href="breakpoint" asChild>
          <Pressable style={queryStyle.button}>
            <Text style={queryStyle.buttonText}>Breakpoint</Text>
          </Pressable>
        </Link>
        <Link href="landscape-portrait" asChild>
          <Pressable style={queryStyle.button}>
            <Text style={queryStyle.buttonText}>Landscape / Portrait</Text>
          </Pressable>
        </Link>
        <Link href="min-max-width" asChild>
          <Pressable style={queryStyle.button}>
            <Text style={queryStyle.buttonText}>Min-Max Width</Text>
          </Pressable>
        </Link>
        <Link href="min-max-height" asChild>
          <Pressable style={queryStyle.button}>
            <Text style={queryStyle.buttonText}>Min-Max Height</Text>
          </Pressable>
        </Link>
        <Link href="min-max-aspect-ratio" asChild>
          <Pressable style={queryStyle.button}>
            <Text style={queryStyle.buttonText}>Min-Max Aspect Ratio</Text>
          </Pressable>
        </Link>
        <Link href="min-max-pixel-ratio" asChild>
          <Pressable style={queryStyle.button}>
            <Text style={queryStyle.buttonText}>Min-Max Pixel Ratio</Text>
          </Pressable>
        </Link>
        <Link href="min-max-font-scale" asChild>
          <Pressable style={queryStyle.button}>
            <Text style={queryStyle.buttonText}>Min-Max Font Scale</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#1b1b1d',
    flex: 1,
  },
  buttonList: {
    flexDirection: 'column',
    gap: 24,
    mediaQueries: [
      {
        query: 'md',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
    ],
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#25c2a0',
    padding: 32,
    mediaQueries: [
      {
        query: 'md',
        flexBasis: '40%',
        flexGrow: 1,
      },
    ],
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 18,
  },
  titleText: {
    color: 'white',
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 12,
  },
  packageText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginBottom: 16,
  },
});
