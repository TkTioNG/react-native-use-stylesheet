import { Text, View } from 'react-native';
import { StyleSheet, useStyleSheet } from 'react-native-use-stylesheet';

export default function Orientation() {
  const queryStyle = useStyleSheet(styles);

  return (
    <View style={queryStyle.container}>
      <Text style={queryStyle.titleText}>Change the device orientation.</Text>
      <View style={queryStyle.formContainer}>
        <View style={queryStyle.formWrapper}>
          <View style={queryStyle.inputContainer}>
            <View style={queryStyle.inputWrapper}>
              <Text style={queryStyle.inputText}>Name</Text>
            </View>
            <View style={queryStyle.inputWrapper}>
              <Text style={queryStyle.inputText}>Password</Text>
            </View>
          </View>
          <View style={queryStyle.buttonRow}>
            <View style={[queryStyle.button, queryStyle.blueButton]}>
              <Text style={queryStyle.buttonText}>Sign up</Text>
            </View>
            <View style={[queryStyle.button, queryStyle.redButton]}>
              <Text style={queryStyle.buttonText}>Login</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b1b1d',
    flex: 1,
    paddingTop: 24,
  },
  titleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  formContainer: {
    backgroundColor: '#25c2a0',
    flex: 1,
    mediaQueries: [
      {
        query: { orientation: 'landscape' },
        alignItems: 'center',
        justifyContent: 'center',
      },
    ],
  },
  formWrapper: {
    mediaQueries: [
      {
        query: { orientation: 'landscape' },
        backgroundColor: '#f5f5f4',
        padding: 24,
        borderRadius: 16,
        elevation: 8,
        shadowColor: '#1b1b1d',
        shadowRadius: 8,
        shadowOpacity: 0.1,
        width: '60%',
        maxWidth: 500,
      },
      { query: { orientation: 'portrait' }, flex: 1 },
    ],
  },
  inputContainer: {
    mediaQueries: [
      { query: { orientation: 'portrait' }, flex: 1, justifyContent: 'center' },
    ],
  },
  inputWrapper: {
    height: 48,
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    mediaQueries: [
      {
        query: { orientation: 'landscape' },
        borderRadius: 40,
        borderColor: '#57534e',
        borderWidth: 1,
      },
      {
        query: { orientation: 'portrait' },
        borderBottomColor: '#f5f5f4',
        borderBottomWidth: 3,
        marginHorizontal: 16,
        paddingLeft: 0,
      },
    ],
  },
  inputText: {
    fontSize: 18,
    opacity: 0.6,
    mediaQueries: [
      {
        query: { orientation: 'portrait' },
        color: 'white',
        fontWeight: '600',
        fontSize: 24,
        opacity: 0.8,
      },
    ],
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    mediaQueries: [
      {
        query: { orientation: 'landscape' },
        borderRadius: 16,
        minWidth: '35%',
      },
      {
        query: { orientation: 'portrait' },
        paddingVertical: 16,
        flex: 1,
      },
    ],
  },
  blueButton: {
    backgroundColor: '#0284c7',
  },
  redButton: {
    backgroundColor: '#e11d48',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});
