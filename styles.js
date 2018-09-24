import { StyleSheet, Platform } from 'react-native';
// import { SettingsDividerShort, SettingsDividerLong, SettingsEditText, SettingsCategoryHeader, SettingsSwitch, SettingsPicker } from 'react-native-settings-components';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1faced',
      flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
    city:{
      color: '#fff',
        fontSize: 20,
        top:30,
        // justifyContent:'center',
        // alignItems: 'center',
        // left: 50,
    },
    icon: {
        height: 75,
        width: 75,
        position: 'absolute',
        top: 80,
        left: 60,
    },
    descDiv: {
      flex: 1,
        // justifyContent: 'center',
        // height:10,
    },
    desc:{
      color: '#fff',
        fontSize: 40,
        position: 'absolute',
        top: 140,
        // left: 40,
    },
    tempDiv: {
      // flex: 1,
        justifyContent: 'center',
        height: 10,
    },
    temp: {
        position: 'absolute',
        top: 50,
        left: -50,
        fontSize: 100,
        color: '#fff',
    },
    infoBlock:{
      flex: 1,
        padding: 20,
        justifyContent: 'center',
        flexDirection: 'column',
        bottom: 0,
    },
    infoItemRow:{
      width: 180,
        fontSize:24,
        color:'#fff',
    },
    infoItem:{
      // width: 200,
      color: '#fff',
        fontSize: 24,
    },
    aboutItem:{
        fontSize: 24,
        color: '#fff',
        justifyContent: 'center',
    },
});
