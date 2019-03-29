/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableNativeFeedback,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Modal,
  ScrollView,
  AsyncStorage,
  TextInput,
  TouchableOpacity
} from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { ListItem, Image } from "react-native-elements";

type Props = {};
const { height, width } = Dimensions.get("window");
class App extends Component<Props> {
  render() {
    return <AppContainer />;
  }
}

export default App;

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate("Dashboard")}
          background={TouchableNativeFeedback.Ripple("#F7DCDC", false)}
        >
          <View style={styles.button}>
            <Text style={styles.btnText}>LOGIN</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate("Dashboard")}
          background={TouchableNativeFeedback.Ripple("#C0EB6A", false)}
        >
          <View style={[styles.button, { backgroundColor: "#485550" }]}>
            <Text style={styles.btnText}>SIGN UP</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

class DashboardScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Dashboard Screen</Text>
      </View>
    );
  }
}
class Feed extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Go To Details"
          onPress={() => this.props.navigation.navigate("Detail")}
        />
      </View>
    );
  }
}
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  _showUserDetail(userDetail) {
    this.props.navigation.navigate("UserDetail", { user: userDetail });
  }

  render() {
    return (
      <View>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : null}
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.name.first} ${item.name.last}`}
              subtitle={item.email}
              onPress={() => this._showUserDetail(item)}
              leftAvatar={{
                title: item.name.first[0],
                source: { uri: item.picture.thumbnail }
              }}
              chevron
            />
          )}
          keyExtractor={item => item.email}
        />
      </View>
    );
  }
}

// const user = {
//   name: "",
//   email: "",
//   contact: "",
//   city: "",
//   state: "",
//   pincode: "",
//   password: ""
// }

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      // user: {
      //   name: '',
      //   email: '',
      //   contact: '',
      //   city: '',
      //   state: '',
      //   pincode: '',
      //   passwod: '',
      // }
      name: "",
      email: "",
      contact: "",
      city: "",
      state: "",
      pincode: "",
      password: ""
    };
  }

  componentDidMount(){
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const userJSON = await AsyncStorage.getItem('user')
      const user = JSON.parse(userJSON)
      this.setState({name:user.name})
      this.setState({email:user.email})
      this.setState({contact:user.contact})
      this.setState({city:user.city})
      this.setState({state:user.state})
      this.setState({pincode:user.pincode})
      this.setState({password:user.password})
    } catch (error) {
      // Error retrieving data
    }
  };

  focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  _storeData = async () => {
    try{
      const user = {
        name:this.state.name,
        email:this.state.email,
        contact:this.state.contact,
        city:this.state.city,
        state:this.state.state,
        pincode:this.state.pincode,
        password:this.state.password,

      }
      await AsyncStorage.setItem('user', JSON.stringify(user))
    }catch(error){
      console.log(error)
    }
  }


  handleSubmit() {
    this._storeData();
  }

  render() {
    return (
      <ScrollView
        style={{
          padding: 8
        }}
      >
        <Text style={styles.hintStyle}>Name</Text>
        <TextInput
          style={styles.textInputStyle}
          ref="1"
          returnKeyType="next"
          onSubmitEditing={() => this.focusNextField("2")}
          onChangeText={name => this.setState({ name })}
          blurOnSubmit={false}
          value={this.state.name}
        />
        <Text style={styles.hintStyle}>Email</Text>
        <TextInput
          style={styles.textInputStyle}
          ref="2"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => this.focusNextField("3")}
          blurOnSubmit={false}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Text style={styles.hintStyle}>Contact</Text>
        <TextInput
          style={styles.textInputStyle}
          ref="3"
          returnKeyType="next"
          keyboardType="number-pad"
          onSubmitEditing={() => this.focusNextField("4")}
          blurOnSubmit={false}
          onChangeText={contact => this.setState({ contact })}
          value={this.state.contact}
        />
        <Text style={styles.hintStyle}>City</Text>
        <TextInput
          style={styles.textInputStyle}
          ref="4"
          returnKeyType="next"
          onSubmitEditing={() => this.focusNextField("5")}
          blurOnSubmit={false}
          onChangeText={city => this.setState({ city })}
          value={this.state.city}
        />
        <Text style={styles.hintStyle}>State</Text>
        <TextInput
          style={styles.textInputStyle}
          ref="5"
          returnKeyType="next"
          onSubmitEditing={() => this.focusNextField("6")}
          blurOnSubmit={false}
          onChangeText={state => this.setState({ state })}
          value={this.state.state}
        />
        <Text style={styles.hintStyle}>Pincode</Text>
        <TextInput
          style={styles.textInputStyle}
          ref="6"
          keyboardType="numeric"
          returnKeyType="next"
          onSubmitEditing={() => this.focusNextField("7")}
          blurOnSubmit={false}
          onChangeText={pincode => this.setState({ pincode })}
          value={this.state.pincode}
        />
        <Text style={styles.hintStyle}>Password</Text>
        <TextInput
          style={styles.textInputStyle}
          ref="7"
          secureTextEntry={true}
          returnKeyType="done"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity
          style={{
            flex: 1,
            width: "100%",
            height: 45,
            marginTop: 10,
            backgroundColor: "#F9A602",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => this.handleSubmit()}
        >
          <Text
            style={{
              fontSize: 18,
              color: "white"
            }}
          >
            SUBMIT
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const Detail = props => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Details</Text>
  </View>
);

class UserDetail extends Component {
  render() {
    const { navigation } = this.props;
    const userDetail = navigation.getParam("user", "NaN");
    console.log(JSON.stringify(userDetail));

    return (
      <ScrollView>
        <Image
          source={{ uri: userDetail.picture.large }}
          style={{
            width: 150,
            height: 150,
            borderColor: "#000",
            borderRadius: 75,
            overflow: "hidden",
            borderWidth: 1,
            marginTop: 10,
            alignSelf: "center"
          }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text
          style={{
            marginTop: 10,
            fontSize: 18,
            fontWeight: "bold",
            alignSelf: "center"
          }}
        >{`${userDetail.name.title.charAt(0).toUpperCase() +
          userDetail.name.title.slice(1)} ${userDetail.name.first
          .charAt(0)
          .toUpperCase() +
          userDetail.name.first.slice(1)} ${userDetail.name.last
          .charAt(0)
          .toUpperCase() + userDetail.name.last.slice(1)}`}</Text>
        <Text style={{ marginTop: 10, fontSize: 18, alignSelf: "center" }}>
          {userDetail.email}
        </Text>
        <View
          style={{
            width: width,
            height: 1,
            backgroundColor: "lightgrey",
            marginTop: 10
          }}
        />

        <Text style={styles.headerText}>Username</Text>
        <Text style={styles.subTitle}>{`${userDetail.login.username}`}</Text>
        <Text style={styles.headerText}>Password</Text>
        <Text style={styles.subTitle}>{`${userDetail.login.password}`}</Text>
        <Text style={styles.headerText}>Address</Text>
        <Text style={styles.subTitle}>{`${userDetail.location.street}, ${
          userDetail.location.city
        }, ${userDetail.location.state}, ${
          userDetail.location.postcode
        }`}</Text>
        <Text style={styles.headerText}>Contact</Text>
        <Text style={styles.subTitle}>{`${userDetail.phone}`}</Text>
        <Text style={styles.subTitle}>{`${userDetail.cell}`}</Text>
        <Text style={styles.headerText}>About</Text>
        <Text style={styles.subTitle}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum
        </Text>
        <Text style={styles.subTitle}>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary, making this the first true generator on the
          Internet. It uses a dictionary of over 200 Latin words, combined with
          a handful of model sentence structures, to generate Lorem Ipsum which
          looks reasonable. The generated Lorem Ipsum is therefore always free
          from repetition, injected humour, or non-characteristic words etc.
        </Text>
      </ScrollView>
    );
  }
}

const FeedStack = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: ({ navigations }) => {
      return {
        headerTitle: "Feed",
        headerLeft: (
          <Icon
            name="md-menu"
            size={30}
            style={{ paddingLeft: 16 }}
            onPress={() => navigations.openDrawer()}
          />
        )
      };
    }
  },
  Detail: {
    screen: Detail
  }
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigations }) => {
      return {
        headerTitle: "Profile",
        headerLeft: (
          <Icon
            name="md-menu"
            size={30}
            style={{ paddingLeft: 16 }}
            onPress={() => navigation.openDrawer()}
          />
        )
      };
    }
  },
  UserDetail: {
    screen: UserDetail,
    tabBarOptions: {
      tabBarVisible: false
    }
  }
});

ProfileStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const SettingsStack = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigations }) => {
      return {
        headerTitle: "Settings",
        headerLeft: (
          <Icon
            name="md-menu"
            size={30}
            style={{ paddingLeft: 16 }}
            onPress={() => navigation.openDrawer()}
          />
        )
      };
    }
  }
});

const DashboardTabNavigator = createBottomTabNavigator(
  {
    FeedStack,
    ProfileStack,
    SettingsStack
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName
      };
    },
    tabBarOptions: {
      activeTintColor: "#000",
      labelStyle: {
        fontSize: 16
      },
      showIcon: false,
      style: {
        alignItems: "center",
        justifyContent: "center"
      }
    }
  }
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            name="md-menu"
            size={30}
            style={{ paddingLeft: 16 }}
            onPress={() => navigation.openDrawer()}
          />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  }
});

const AppSwithcNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Dashboard: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwithcNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  button: {
    fontSize: 16,
    backgroundColor: "#361040",
    width: width * 0.8,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    margin: 8
  },
  btnText: {
    fontSize: 18,
    color: "white"
  },
  headerText: {
    fontSize: 18,
    color: "#000",
    padding: 8
  },
  subTitle: {
    fontSize: 16,
    paddingLeft: 8,
    color: "#333942"
  },
  textInputStyle: {
    height: 40,
    width: "100%",
    borderColor: "lightgray",
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 18,
    paddingStart: 12
  },
  hintStyle: {
    fontSize: 16,
    color: "#000",
    alignSelf: "flex-start",
    paddingStart: 12,
    paddingTop: 8
  }
});
