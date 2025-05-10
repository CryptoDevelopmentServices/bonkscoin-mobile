import React from 'react'
import {
  Alert,
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import Logo from '../assets/logo_bare.png'

export default class MyWalletItem extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      balance: 0
    }

  }

  componentDidMount() {
    this.updateBalance()
  }

  updateBalance = async() => {

    var balance = 0

    for (var address in this.props.wallet.addresses.external) {

      try {

        global.ecl.blockchainAddress_balance(address).then((res) => {

          balance += res.confirmed
          this.props.wallet.balance = balance;

        })

      } catch (e) {

        console.log(e)

      }

    }

    for (var address in this.props.wallet.addresses.internal) {

      try {

        global.ecl.blockchainAddress_balance(address).then((res) => {

          balance += res.confirmed
          this.props.wallet.balance = balance;

        })

      } catch (e) {

        console.log(e)

      }

    }

    this.props.wallet.balance = balance;
  }

  render() {
    
    const { wallet } = this.props
    const { balance } = this.state

    return(
      <View style={styles.listItem}>
        <Image source={Logo} style={styles.listItemLogo} />
        <View style={styles.listItemTextContainer}>
          <Text style={styles.listItemTextName}>{`${wallet.title}`}</Text>
          <Text style={styles.listItemTextBalance}>{`${wallet.balance/10000} MBC`}</Text>
        </View>
        {/*<Icon name='dots-three-vertical' size={20} color='#000672' style={styles.listItemIcon} />*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginBottom: 0,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.1 },
    shadowOpacity: 0.33,
    shadowRadius: 0,
    elevation: 1,
    zIndex: 10,
  },
  listItemLogo: {
    resizeMode: 'contain',
    height: 48,
    width: 48,
    marginRight: 16,
  },
  listItemTextContainer: {
    flex: 3,
    flexDirection: 'column',
  },
  listItemTextName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000672',
    marginBottom: 1,
  },
  listItemTextBalance: {
    fontSize: 16,
    color: '#000672',
    opacity: 0.66,
  },
})
