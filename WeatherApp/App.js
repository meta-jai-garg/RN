import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {fetchWeather} from './weatherAPI';
import Highlighter from 'react-native-highlight-words';

const iconNames = {
  Clear: 'md-sunny',
  Rain: 'md-rainy',
  Thunderstorm: 'md-thunderstorm',
  Haze: 'md-cloudy',
  Snow: 'md-snow',
  Drizzle: 'md-umbrella'

}

const phrases = {
  Clear: {
    title:"It's an amazing weather" ,
    subTitle:'Rock that thing!',
    highlight:'amazing',
    color: '#E32500',
    background: "#FFD017" 
  },
  Rain: {
    title:'Rain rain go away',
    subTitle:'Stay inside and code all the day',
    highlight:'away',
    color: '#004A96',
    background: "#2F343A"
  },
  Thunderstorm: {
    title:'Blooming Thunderstrike',
    subTitle:'Unplug those devices',
    highlight:'Thunderstrike',
    color: '#FBFF46',
    background: "#020202"
  },
  Haze: {
    title:'Cloud storage limit reached',
    subTitle:'Error: 5000 - Cirrocumulus',
    highlight:'storage',
    color: '#0044FF',
    background: "#939393"
  },
  Snow: {
    title:'Brain crashing freeze',
    subTitle:"You're not supposed to eat it",
    highlight:'crashing',
    color: '#021D4C',
    background: "#15A678"
  },
  Drizzle: {
    title:"Meh... Don't even ask?",
    subTitle:'What did I just say?',
    highlight:"Don't",
    color: '#B3F6E4',
    background: "#1FBB68"
  }
}

export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
      temp:0,
      weather:'Drizzle'
    };
  }

  componentDidMount(){
    this.getLocation();
  }

  getLocation(){
    navigator.geolocation.getCurrentPosition(
      (posData)=>fetchWeather(posData.coords.latitude, posData.coords.longitude).then(res=>this.setState({
        temp:Math.round(res.temp),
        weather:res.weather
      })),
      (error)=>alert(JSON.stringify(error)),
      {enableHighAccuracy:false,timeout:10000,maximumAge: 3600000}
    )
  }

  render(){
    return(
      <View style={[styles.container, {backgroundColor:phrases[this.state.weather].background}]}>
       <View style={styles.header}>
        <Icon name={iconNames[this.state.weather]} color={'white'} size={80}/>
        <Text style={styles.temp}>{this.state.temp}&deg;</Text>
       </View>
       <View style={styles.body}>
          <Highlighter
            style={styles.title}
            highlightStyle={{color: phrases[this.state.weather].color}}
            searchWords={[phrases[this.state.weather].highlight]}
            textToHighlight={phrases[this.state.weather].title}
          />
        <Text style={styles.subTitle}>{phrases[this.state.weather].subTitle}</Text>
       </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#FFD017',
  },
  header:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  temp:{
    fontFamily:'Verdana',
    color: 'white',
    fontSize:45
  },
  body:{
    flex:4,
    alignItems:'flex-start',
    justifyContent:'flex-end',
    margin:10
  },
  title:{
    color:'white',
    fontFamily: 'Verdana',
    fontSize:80,
    marginBottom:5
  },
  subTitle:{
    color:'white',
    fontFamily:'Verdana',
    fontSize:16
  }
});