import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, NetInfo, WebView } from 'react-native'
import { Constants } from 'expo'

const Chomok = ({ start, end }) => (
  <WebView
    source={{ uri: 'https://chomoks.com/' }}
    transparent={false}
    style={{ flex: 1, zIndex: 1 }}
    onLoadStart={start}
    onLoadEnd={end}
  />
)

export default function App (props) {
  const [offline, setOffline] = useState(false)
  const [loading, setLoading] = useState(false)

  const webLoaded = () => setLoading(false)
  const webLoading = () => setLoading(true)
  const setNetState = ct => {
    setOffline(ct.type === 'none')
  }

  useEffect(function () {
    NetInfo.getConnectionInfo().then(setNetState)
    NetInfo.addEventListener('connectionChange', setNetState)
  })

  return (
    <View style={styles.container}>
      <Chomok start={webLoading} end={webLoaded} />
      {loading && (
        <View style={styles.loadingScreen}>
          <Text>Please Wait While we update your Chomok Offer!</Text>
        </View>
      )}
      {offline && (
        <View style={styles.netScreen}>
          <Text>Please Check your Net Connection</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 0,
    margin: 0,
    height: '100%',
    width: '100%'
  },
  loadingScreen: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'white',
    width: '100%',
    fontSize: 20,
    zIndex: 5
  },
  netScreen: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'white',
    width: '100%',
    fontSize: 20,
    zIndex: 7
  }
})
