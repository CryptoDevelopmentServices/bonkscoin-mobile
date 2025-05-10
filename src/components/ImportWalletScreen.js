import React from 'react'
import {
  Platform,
  Alert,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native'

import store from 'react-native-simple-store';
/**
 * ImportWalletScreen
 *
 * - input mnemonic phrase (18 words)
 * - confirm will ask to "Set a password"
 */
export default class ImportWalletScreen extends React.Component {
  constructor(props) {

    super(props)

    this.createInProcess = false
    this.state = {
      words: '',
      walletName: ''
    }

  }

  // Align title image to center on Android
  static navigationOptions = {
    headerRight: Platform.OS === 'android' ? <View /> : ''
  }

  onConfirm = () => {

    if (!this.createInProcess) {
      
      this.createInProcess = true

      if (this.state.words == '') {

        Alert.alert('You must type mnemonic phrase!')
        this.createInProcess = false

      } else if(this.state.walletName == '') {

        Alert.alert('You must type wallet name!')
        this.createInProcess = false

      } else if(this.state.walletName.length < 4) {

        Alert.alert('Wallet name must be longer than 3 characters!')
        this.createInProcess = false

      } else {

        if (this.state.words.split(' ').length < 11) {

          Alert.alert('Your mnemonic phrase must be longer than 11 words!')
          this.createInProcess = false

        } else {

          this.createInProcess = false
          this.props.navigation.navigate('SetPassword', {"words": this.state.words, "walletName": this.state.walletName, "type": "import"})

        }

      }

    }
  }

  render() {
    return(
      <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.txtTop}>
              <Text style={styles.txtInfo}>Please enter your mnemonic phrase:</Text>
            </View>

              <TextInput style={[styles.inputContainer, styles.inputPhrase]}
                placeholder={'Enter phrase here'}
                onChangeText={(words) => this.setState({words})}
                value={this.state.words}
                multiline={true}
                blurOnSubmit={true}
                paddingBottom={10}
                underlineColorAndroid='transparent'
              />

              <TextInput style={[styles.inputContainer, styles.inputPhrase]}
                placeholder = {"Enter your wallet name"}
                onChangeText={(text) => this.setState({walletName: text})}
                underlineColorAndroid='transparent'
                maxLength = {35}
              />

            <View style={styles.spacing}></View>

            <View>
              <Text style={styles.txtInfo}>Keep your backup phrase secure.</Text>
            </View>

            <View style={styles.btnConfirmContainer}>
              <TouchableOpacity style={styles.btnConfirm} onPress={this.onConfirm}>
                <Text style={styles.btnConfirmText}>IMPORT MY ACCOUNT</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.txtInfo}>Back</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  innerContainer: {
    flex: 1,
    padding: 24,

  },
  txtTop: {
    marginBottom: 16
  },
  txtInfo: {
    fontSize: 14,
    color: '#505659',
    textAlign: 'center'
  },
  wordsContainer: {
    backgroundColor: '#ffffff',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 24,
    borderRadius: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.33,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 10,
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    marginBottom: 24,
    borderRadius: 16,
    minWidth: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.33,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 10,
  },
  titleContainer: {
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    width: '100%',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.33,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 10,
  },
  inputPhrase: {
    minHeight: 50,
    padding: 5,
    minWidth: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18,
    lineHeight: 32,
    fontWeight: 'bold',
    color: '#000672',
  },
  spacing: {
    flex: 1
  },
  btnConfirmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnConfirm: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#000672',
    margin: 18,
    paddingTop: 24,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.33,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 10,
  },
  btnConfirmText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  btnBack: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 48,
    paddingLeft: 48,
  }
})
