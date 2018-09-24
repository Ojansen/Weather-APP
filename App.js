import React from 'react';
import _ from 'lodash';
import { styles } from './styles.js';
import { SettingsDividerShort, SettingsDividerLong, SettingsEditText, SettingsCategoryHeader, SettingsSwitch, SettingsPicker } from 'react-native-settings-components';
import { StyleSheet, Text, View, Button, Platform, ScrollView, Switch, AsyncStorage, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Timestamp from 'react-timestamp';

const colors = {
  switchEnabled: (Platform.OS === 'android') ? '#C70039' : null,
  switchDisabled: (Platform.OS === 'android') ? '#efeff3' : null,
};

class WeatherScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
      title: 'Weather',
      headerRight: <Button title="Settings" onPress={() => navigation.navigate('Settings')} />,
      headerLeft: <Button title="About" onPress={() => navigation.navigate('About')} />
  });
  constructor(props){
    super(props);
      this.state = {
          isLoading: true,
          data: [],
          temp: null,
          tempMax: null,
          tempMin: null,
          sunrise: null,
          sunset: null,
          city: null,
          humidity: null,
          windSpeed: null,
          weatherDescription: null,
          weatherIcon: null,
          todayDescription: null,
          windDirection:null,
          windDeg:null,
          pressure: null,
      };
  }
    componentDidMount= async () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.getWeather(position.coords.latitude, position.coords.longitude);
      },
    );
    let unitSW = AsyncStorage.setItem('unitSwitch', 'false');
    let isLoading = AsyncStorage.setItem('isLoading', 'true');
    // console.log(unit);
  };

  getWeather = async (lat, lon) => {
        var unit = await AsyncStorage.getItem('units');
        var url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=0c9d7a006a838a322f66170b9a7ff62c&units=${unit}`;

        console.log(unit);
    fetch(
      url
    ).then(result => result.json())
     .then(json => {
      // console.log(json);
      this.setState({
        data: json,
        temp: Math.round(json.main.temp),
          tempMin: Math.round(json.main.temp_min),
          tempMax: Math.round(json.main.temp_max),
          sunrise: json.sys.sunrise,
          sunset: json.sys.sunset,
          city: json.name,
        weatherIcon: json.weather[0].icon,
        weatherDescription: json.weather[0].description,
          windDirection: json.wind.deg,
          windSpeed: Math.round(json.wind.speed * 3.6) + 'km/hr',
          humidity: json.main.humidity + '%',
          pressure: Math.round(json.main.pressure) + ' hPa',
      });
      if (this.state.temp >= 35) {
          this.setState({
              temp: Math.round(json.main.temp) + ' ℉',
              todayDescription: 'Today: A ' + this.state.weatherDescription + '. The high will be ' + this.state.tempMax + '℉. And with a low of ' + this.state.tempMin + '℉.'
          });
      } else {
          this.setState({
             temp: Math.round(json.main.temp) + ' ℃',
              todayDescription: 'Today: A ' + this.state.weatherDescription + '. The high will be ' + this.state.tempMax + '℃. And with a low of ' + this.state.tempMin + '℃.'
          });
      }
    });
    let isLoading = AsyncStorage.setItem('isLoading', 'false');
    // console.log(this.state.unitSwitch);
  };
  render() {
    return (
      <View style={styles.container}>
          <View style={{alignContent: 'center'}}>
              <Text style={styles.city}>{this.state.city}</Text>
          </View>
          <View style={styles.tempDiv}>
            <Text style={styles.temp}>{ this.state.temp }</Text>
          </View>
          <Image style={styles.icon} source={{uri: `http://openweathermap.org/img/w/${this.state.weatherIcon}.png`}}/>
          <View style={styles.descDiv}>
            <Text style={styles.desc}>{ this.state.weatherDescription }</Text>
          </View>
          <View style={styles.infoBlock} >
              <Text style={styles.infoItem}>{this.state.todayDescription}</Text>
              <Text style={styles.infoItemRow }>Sunrise : <Timestamp time={this.state.sunrise} component={Text} format='time' twentyFourHour/></Text>
              <Text style={styles.infoItemRow }>Sunset : <Timestamp time={this.state.sunset} component={Text} format='time' twentyFourHour/></Text>
              <Text style={styles.infoItemRow }>Wind : {this.state.windSpeed}</Text>
              <Text style={styles.infoItemRow }>Humidity : {this.state.humidity}</Text>
              <Text style={styles.infoItemRow }>Pressure : {this.state.pressure}</Text>
          </View>
            <Button title={'reload'} onPress={this.componentDidMount}/>
      </View>
    )
  }
}

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings",
  };

  constructor(props){
    super(props);
    this.state = {
      unitSwitch: null,
    };
  };
  render() {
    return (
      <ScrollView>
        <SettingsCategoryHeader title={'Units '}/>
          <SettingsSwitch
              title={'Toggle units imperial / metric'}
              onSaveValue={(value) => {
                  this.setState({ unitSwitch: value });
                  if (value === true) {
                    let unitSF = AsyncStorage.setItem('unitSwitch', 'false');
                    let unitI = AsyncStorage.setItem('units', 'imperial');
                    console.log(value);
                  } else {
                    let unitST = AsyncStorage.setItem('unitSwitch', 'true');
                    let unitM = AsyncStorage.setItem('units', 'metric');
                    console.log(value);
                  }

                  console.log(this.state.unitSwitch);
              }}
              value={this.state.unitSwitch}
              thumbTintColor={(this.state.unitSwitch) ? colors.switchEnabled : colors.switchDisabled}
          />
      </ScrollView>
    )
  }
}

class AboutScreen extends React.Component {
  static navigationOptions = {
    title: "About",
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.aboutItem}>Made by : Obe Jansen</Text>
      </View>
    )
  }
}

const RootStack = createStackNavigator (
  {
    Weather: WeatherScreen,
    Settings: SettingsScreen,
    About: AboutScreen,
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
