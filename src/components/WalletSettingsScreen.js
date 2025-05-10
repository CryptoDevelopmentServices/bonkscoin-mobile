import React from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Dimensions,
  Clipboard,
  Alert,
  Picker
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import NavbarButton from './NavbarButton'
import store from 'react-native-simple-store'
import {decryptData} from '../utils/Helpers'

export default class WalletSettingsScreen extends React.Component {

  constructor(props) {
    super(props)
    this.isCancelled = false
    this.state = {

      walletUtils: this.props.navigation.getParam('walletUtils', null),

    }
  }

  static navigationOptions = () => {
    return {
      headerRight: (
        <View></View>
      )
    }
  }

  componentWillUnmount() {
    this.isCancelled = true
  }

  copyMnemonic = () => {
    Clipboard.setString(decryptData(this.state.walletUtils.wallet.mnemonicPhrase, this.state.walletUtils.password))
    Alert.alert('Copy recovery phrase', 'The recovery phrase has been successfully copied!')
  }

  clearTransactions = () => {
    store.get('wallets').then((res) => {
      for (var i = 0; i < res.length; i++) {
        if (res[i].id == this.state.walletUtils.wallet.id) {
          res[i].transactions = {}
          res[i].mempool = []
          this.setState({wallet: res[i]})
          break
        }
      }

      this.setState({walletUtils: this.state.walletUtils});
      store.save('wallets', res)
      this.props.navigation.push("MyWallets")
    })
  }
 
  removeWallet = () => {

    Alert.alert(
      "Remove wallet", "Are you sure?",
      [
          {text: 'No'},
          {text: 'Yes', onPress: () => {

            store.get('wallets').then((res) => {
      
              for (var i = 0; i < res.length; i++) {
                
                if(res[i].id == this.state.walletUtils.wallet.id) {

                  res.splice(i, 1)
                  break

                }

              }

              store.save('wallets', res)
              this.props.navigation.navigate('MyWallets')

            })

          }}
        ],
        { cancelable: false })

  }

  changeHistoryCount = (itemValue) => {
    store.get('wallets').then((res) => {
      for (var i = 0; i < res.length; i++) {
        if (res[i].id == this.state.walletUtils.wallet.id) {
          res[i].settings.historyCount = itemValue
          this.state.walletUtils.wallet = res[i]
          this.setState({walletUtils: this.state.walletUtils})
          break
        }
      }

      store.save('wallets', res)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity>
          <SettingsItem item={{containerStyle: {padding: 0, flexDirection: 'column'}, 'icon': 'bookmarks', 'left': 'Number of transactions to display', 'right': '', own: 
            <Picker
              selectedValue={this.state.walletUtils.wallet.settings.historyCount}
              style={{ width: 100}}
              onValueChange={(itemValue, itemIndex) => this.changeHistoryCount(itemValue)}>
              <Picker.Item label="5" value="5" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="20" value="20" />
              <Picker.Item label="40" value="40" />
              <Picker.Item label="60" value="60" />
              <Picker.Item label="80" value="80" />
              <Picker.Item label="100" value="100" />
            </Picker>
            }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.clearTransactions() } style={{ marginTop: 10}}>
            <SettingsItem item={{'icon': 'folder', 'left': 'Clear transaction cache', 'right': ''}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.removeWallet() }>
            <SettingsItem item={{'icon': 'trash', 'left': 'Remove wallet', 'right': ''}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.copyMnemonic() }>
            <SettingsItem item={{'icon': 'clipboard', 'left': 'Copy recovery phrase', 'right': ''}} />
          </TouchableOpacity>
          <View style={styles.spacing}></View>
          <SettingsItem item={{'icon': 'info', 'left': `Ver. ${global.version} build ${global.build}`, 'right': ''}} />   
        </ScrollView>
      </View> 
    );
  }
}



class SettingsItem extends React.Component {
  render() {
    const { item } = this.props
    return(
      <View>
        <View style={styles.itemContainer}>
          {item.icon != null ? <Icon name={item.icon} size={32} color="#cccccc" /> : null}
          <View style={styles.itemLeftContainer}>
            <Text style={styles.itemLeft}>{item.left}</Text>
          </View>
          <View style={styles.itemRightContainer}>
            <Text style={styles.itemRight}>{item.right}</Text>
          </View>
        </View>
        {item.own != null && <View style={[styles.itemContainer, item.containerStyle != null ? item.containerStyle : null]}>
           {item.own}
        </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.1 },
    shadowOpacity: 0.33,
    shadowRadius: 0,
    elevation: 1,
    zIndex: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.1 },
    shadowOpacity: 0.33,
    shadowRadius: 0,
    elevation: 1,
    zIndex: 10,
  },
  spacing: {
    flex: 1
  },
  itemLeftContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  itemLeft: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000672',
  },
  itemRightContainer: {
    flexDirection: 'column',
  },
  itemRight: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000672',
    textAlign: 'right'
  },
})