/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import PopupDialog from "react-native-popup-dialog";
import DatePicker from "react-native-datepicker"
import FAB from "react-native-fab";
import * as Progress from "react-native-progress";
import {
  AsyncStorage,
  Platform,
  StyleSheet,
  SectionList,
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import moment from "moment";
import NavigationBar from "react-native-navbar";

export default class App extends Component<{}> {

  constructor(props){
    super(props)
    const currentDate = new Date();
    this.state = {startDate:moment(currentDate).format("YYYY-MM-DD").toString(),
                    endDate: moment(currentDate).format("YYYY-MM-DD").toString(),
                    shortTermGoals: [],
                    midTermGoals: [],
                    longTermGoals: [],
                    mostCurrentGoalShortDescription: "",
                    mostCurrentGoalLongDescription: "",
                    rowHeight: 0};
    this.retrieveGoals();
  }

  onRowClicked = () => {
    if(this.state.rowHeight == 0) {
      this.setState({rowHeight: 80});
    } else {
      this.setState({rowHeight: 0});
    }
  }
  render() {
    return (
      <View style = {styles.container} >
        <NavigationBar
          title = {{ title: "Goals", }}
          />
        <View style = {styles.graySeparatorLine} width = {Dimensions.get('window').width} />
        <SectionList
          style = {styles.sectionList}
          sections = {[
            {title: "Short-term", data: this.state.shortTermGoals},
            {title: "Medium-term", data: this.state.midTermGoals},
            {title: "Long-term", data: this.state.longTermGoals},
            ]}
          renderItem = {({item}) =>
            <TouchableHighlight onPress = {this.onRowClicked}
                                underlayColor = "transparent">
              <View style = {styles.mainSectionListRowContainer}>
                <View style= {styles.mainSectionListRow} >
                  <View style = {styles.mainSectionListRowGoalSummary} >
                    <Text style = {styles.mainListViewRow}>
                    {item.shortDescription + "\n" + item.startDate + " to " + item.endDate}
                    </Text>
                  </View>
                  <View style = {styles.mainSectionListRowProgressBarContainer} >
                    <View style = {styles.mainSectionListRowProgressBar} >
                      <Progress.Bar progress={item.percentageDaysPassed} width={100} color = {"#32cd32"} />
                    </View>
                  </View>
                </View>
                <View style= {styles.mainSectionListSeparator} >
                </View>
              </View>
            </TouchableHighlight>
          }
          renderSectionHeader = {({section}) =>
          <View style = {styles.mainSectionListHeaderContainer}>
              <View>
                <Text style = {styles.mainListViewHeader}>
                {section.title}
              </Text>
              </View>
              <View style= {styles.mainSectionListSeparator} >
              </View>
          </View>
          }
          keyExtractor = {(item, index) => index} />
          <FAB buttonColor="blue" visible={true}
          onClickAction={()=>{this.addNewGoalPopup.show();}}/>
          <PopupDialog ref = {(addNewGoalPopup) =>
            { this.addNewGoalPopup = addNewGoalPopup;}}>
            <View style = {styles.addGoalPopup}>
              <View style = {styles.addGoalPopupDatePickerContainer}>
                <Text style = {styles.popupText}>
                Choose your start date.
                </Text>
                <DatePicker
                 style={styles.addGoalPopupDatePicker}
                 date={this.state.startDate}
                 mode="date"
                 format="YYYY-MM-DD"
                 minDate={this.state.startDate}
                 maxDate="2019-12-31"
                 confirmBtnText="Confirm"
                 cancelBtnText="Cancel"
                 customStyles={{
                   dateIcon: {
                     position: "absolute",
                     top: 0,
                     left: 40,
                   },
                   dateInput: {
                     top: 0,
                     marginLeft: 100,
                   }
                 }}
                 onDateChange={(date) => {this.setState({startDate: date})}}
                />
              </View>
              <View style = {styles.addGoalPopupDatePickerContainer}>
              <Text style = {styles.popupText}>
              Choose your end date.
              </Text>
              <DatePicker
               style={styles.addGoalPopupDatePicker}
               date={this.state.endDate}
               mode="date"
               format="YYYY-MM-DD"
               minDate={this.state.endDate}
               maxDate="2019-12-31"
               confirmBtnText="Confirm"
               cancelBtnText="Cancel"
               customStyles={{
                 dateIcon: {
                   position: "absolute",
                   left: 40,
                 },
                 dateInput: {
                   marginLeft: 100,
                 }
               }}
               onDateChange={(date) => {this.setState({endDate: date})}}
               />
              </View>
              <View style = {styles.addGoalPopupDescriptionTextFieldsContainer}>
               <TextInput style = {styles.addGoalPopupTextInput}
                onChangeText={(text) =>
                  this.setState({mostCurrentGoalShortDescription: text})}
                placeholder = "Enter your goal title here."
               />
              </View>
              <View style = {styles.popupButtonView} >
               <Button
               onPress={()=>{
                 var goal = new Goal(this.state.startDate,
                                     this.state.endDate,
                                     this.state.mostCurrentGoalShortDescription,
                                     this.state.mostCurrentGoalLongDescription,
                                     0.0);
                 var goalCategory = "";
                 const startDate = moment(this.state.startDate);
                 const endDate = moment(this.state.endDate);
                 const difference = endDate.diff(startDate, "days");
                 if (difference > 0 && difference < 30) {
                   goalCategory = "Short-term";
                 } else if (difference >= 30 && difference < 90) {
                   goalCategory = "Mid-term";
                 } else {
                   goalCategory = "Long-term";
                 }
                 this.retrieveItem(goalCategory).then((goals) => {
                     if (Array.isArray(goals)) {
                       goals.push(goal);
                       this.storeItem(goalCategory, goals);
                     } else {
                       var newGoals = [];
                       newGoals.push(goal);
                       var jsonversion = newGoals;
                       this.storeItem(goalCategory, jsonversion);
                     }
                 });
                 this.addNewGoalPopup.dismiss();
               }}
               title="Submit"
               color="#42a1f4"
               />
               </View>
             </View>
          </PopupDialog>
      </View>
    );
  }

async storeItem(key, item) {
  try{
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
}

async retrieveGoals() {
  try {
    this.retrieveItem("Short-term").then((goals) => {
      if (goals) {
        var index = 0;
        goals.forEach(function (goal)
        {
          var updatedGoal = new Goal(goal.startDate,
                                     goal.endDate,
                                     goal.shortDescription,
                                     goal.longDescription,
                                     goal.percentageDaysPassed);
          updatedGoal.updatePercentageDaysPassed();
          goals[index] = updatedGoal;
          index++;
      });
        this.setState({shortTermGoals: goals});
      }
    }).catch((error) => {
            console.log("Promise is rejected with error: " + error);
        });
        this.retrieveItem("Mid-term").then((goals) => {
          if (goals) {
            var index = 0;
            goals.forEach(function (goal)
            {
              var updatedGoal = new Goal(goal.startDate,
                                         goal.endDate,
                                         goal.shortDescription,
                                         goal.longDescription,
                                         goal.percentageDaysPassed);
              updatedGoal.updatePercentageDaysPassed();
              goals[index] = updatedGoal;
              index++;
          });
            this.setState({midTermGoals: goals});
          }
        }).catch((error) => {
                console.log("Promise is rejected with error: " + error);
            });
            this.retrieveItem("Long-term").then((goals) => {
              if (goals) {
                var index = 0;
                goals.forEach(function (goal)
                {
                  var updatedGoal = new Goal(goal.startDate,
                                             goal.endDate,
                                             goal.shortDescription,
                                             goal.longDescription,
                                             goal.percentageDaysPassed);
                  updatedGoal.updatePercentageDaysPassed();
                  goals[index] = updatedGoal;
                  index++;
              });
                this.setState({longTermGoals: goals});
              }
            }).catch((error) => {
                    console.log("Promise is rejected with error: " + error);
                });
  } catch (error) {
    console.log(error.message);
  }
}

async retrieveItem(key) {
  try{
    const retrievedItem =  await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) {
    console.log(error.message);
  }
  return
}
}
var Goal = function (startDate, endDate, longDescription, shortDescription, percentageDaysPassed) {
  this.startDate = startDate;
  this.endDate = endDate;
  this.longDescription = longDescription;
  this.percentageDaysPassed = percentageDaysPassed;
  this.shortDescription = shortDescription;
  this.updatePercentageDaysPassed = function () {
    const startDate = moment(this.startDate);
    const endDate = moment(this.endDate);
    const currentDate = moment(new Date());
    const currentDifference = currentDate.diff(startDate, "days");
    const totalDifference = endDate.diff(startDate, "days");
    const ratio = currentDifference/totalDifference;
    if(ratio >= 0) {
      this.percentageDaysPassed = ratio;
    } else {
      this.percentageDaysPassed = 0.0;
    }

    };

}

const styles = StyleSheet.create({
  addGoalPopup: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  addGoalPopupDatePickerContainer: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  addGoalPopupDatePicker: {
    width: 300
  },
  addGoalPopupDescriptionTextFieldsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  addGoalPopupTextInput: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  graySeparatorLine: {
    backgroundColor:"#D3D3D3",
    height: 1,
  },
  mainListViewHeader: {
    fontSize: 28,
    textAlign: "left",
    padding: 25,
  },
  mainSectionListHeaderContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  mainListViewRow: {
    fontSize: 16,
    textAlign: "left",
    padding: 12,
    marginLeft: 12,
  },
  mainSectionListRow: {
    flexDirection: "row",
    height: 80,
  },
  mainSectionListRowContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: 24,
  },
  mainSectionListRowGoalSummary: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  mainSectionListRowLongDescription: {
    height: 0,
  },
  mainSectionListRowProgressBar: {
    flexDirection: "row",
    height: 8,
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 12,
  },
  mainSectionListRowProgressBarContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 16,
  },
  mainSectionListSeparator: {
    height: 1,
    backgroundColor: "lightgray",
    marginLeft: 10,
    marginRight: 10,
  },
  popupButtonView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 8,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 8,
  },
  popupText: {
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
  popupTextHeader: {
    fontSize: 20,
    marginTop: 24,
    textAlign: "center",
  },
  sectionList: {
    backgroundColor: "#FFFFFF",
  },
});
