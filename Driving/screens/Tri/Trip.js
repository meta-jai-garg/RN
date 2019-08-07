import React, { Component } from "react";
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    FlatList
} from "react-native";
import { Block, Text, Card, Badge, Progress } from "../../components";
import { theme, mocks, mapStyles } from "../../constants";
import { CircularProgress } from "react-native-circular-progress";
import rgba from "hex-to-rgba";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { styles as blockStyles } from "../../components/Block";

const { width } = Dimensions.get("window");

class Trip extends Component {
    static navigationOptions = ({ navigation }) => {
        const showMap = navigation.getParam("map");
        return {
            headerTitle: <Text style={theme.fonts.header}>Current Trip</Text>,
            headerRight: (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                        navigation.navigate("Trip", { map: !showMap })
                    }
                >
                    <Text
                        medium
                        accent={showMap}
                        primary={!showMap}
                        style={{ paddingBottom: 8 }}
                    >
                        {showMap ? "HIDE MAP" : "SHOW MAP"}
                    </Text>
                </TouchableOpacity>
            ),
            headerLeft: null
        };
    };

    renderChart() {
        return (
            <Card shadow style={{ paddingVertical: theme.sizes.base * 2 }}>
                <Block center>
                    <CircularProgress
                        size={214} // can use  with * .5 => 50%
                        fill={72} // percentage
                        lineCap="round" // line ending style
                        rotation={220}
                        arcSweepAngle={280}
                        width={theme.sizes.base}
                        tintColor={theme.colors.primary} // gradient is not supported :(
                        backgroundColor={theme.colors.gray3}
                        backgroundWidth={theme.sizes.base / 2}
                    >
                        {() => (
                            <Block center middle>
                                <Text h2 medium>
                                    7.2
                                </Text>
                                <Text h3 transform="uppercase">
                                    fair
                                </Text>
                            </Block>
                        )}
                    </CircularProgress>
                </Block>
                <Block center>
                    <Text title spacing={1} style={{ marginVertical: 8 }}>
                        Current Score
                    </Text>
                    <Text>
                        <Text primary>+$4 </Text>
                        <Text gray transform="uppercase">
                            challenge bonus
                        </Text>
                    </Text>
                </Block>
            </Card>
        );
    }

    renderDriveStatus = drive => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <Card shadow style={styles.drivingStatus}>
                    <Image
                        source={drive.icon}
                        style={styles.drivingIcon}
                        resizeMode="contain"
                    />
                    <Text
                        transform="capitalize"
                        title
                        accent={drive.status === "bad"}
                        tertiary={drive.status === "fair"}
                        primary={drive.status === "good"}
                        height={22}
                    >
                        {drive.status}
                    </Text>
                    <Text transform="capitalize" spacing={0.7}>
                        {drive.action}
                    </Text>
                </Card>
            </TouchableOpacity>
        );
    };

    renderDriving() {
        return (
            <Block>
                <Block
                    style={{
                        marginTop: theme.sizes.base,
                        marginBottom: theme.sizes.base,
                        paddingHorizontal: theme.sizes.base / 3
                    }}
                >
                    <Text spacing={0.7} transform="uppercase">
                        driving data
                    </Text>
                </Block>

                <FlatList
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0}
                    scrollEventThrottle={16}
                    data={mocks.drivingData}
                    keyExtractor={(item, index) => `${item.id}`}
                    renderItem={({ item }) => this.renderDriveStatus(item)}
                />

                <Block
                    row
                    space="between"
                    style={{
                        marginTop: theme.sizes.padding,
                        paddingBottom: theme.sizes.padding * 1.5
                    }}
                >
                    <Block center>
                        <Text h3 gray medium>
                            55
                        </Text>
                        <Text h3 gray medium>
                            mph
                        </Text>
                    </Block>
                    <Block />
                    <Block center>
                        <Text h3 gray medium>
                            978.7
                        </Text>
                        <Text h3 gray medium>
                            mi
                        </Text>
                    </Block>
                </Block>
            </Block>
        );
    }
    renderTripButton() {
        const { navigation } = this.props;

        return (
            <Block center middle style={styles.endTrip}>
                <Badge color={rgba(theme.colors.accent, 0.1)} size={144}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("Welcome")}
                    >
                        <Badge color={theme.colors.accent} size={62}>
                            <Icon name="square" size={62 / 2.5} color="white" />
                        </Badge>
                    </TouchableOpacity>
                </Badge>
            </Block>
        );
    }

    renderMap() {
        return (
            <Card style={{ padding: 0, overflow: "hidden" }}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    region={mocks.location}
                    customMapStyle={mapStyles}
                    style={styles.map}
                >
                    <Marker
                        rotation={-20}
                        anchor={{ x: 0.5, y: 0.5 }}
                        coordinate={{
                            latitude: 40.728399,
                            longitude: -73.883771
                        }}
                    >
                        <Badge
                            color={rgba(theme.colors.primary, 0.2)}
                            size={77}
                        >
                            <Badge
                                color={rgba(theme.colors.primary, 0.2)}
                                size={57}
                            >
                                <Icon
                                    name="car"
                                    size={57 / 2.5}
                                    color="black"
                                />
                            </Badge>
                        </Badge>
                    </Marker>
                </MapView>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.mapMyLocation, blockStyles.shadow]}
                >
                    <Block center middle shadow>
                        <Icon
                            name="location-arrow"
                            color={theme.colors.primary}
                        />
                    </Block>
                </TouchableOpacity>
            </Card>
        );
    }

    render() {
        const { navigation } = this.props;
        const showMap = navigation.getParam("map");

        return (
            <React.Fragment>
                <ScrollView
                    style={styles.trip}
                    showsVerticalScrollIndicator={false}
                >
                    {showMap ? this.renderMap() : this.renderChart()}
                    {this.renderDriving()}
                </ScrollView>
                {this.renderTripButton()}
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    trip: {
        padding: theme.sizes.padding,
        backgroundColor: theme.colors.gray4
    },
    endTrip: {
        position: "absolute",
        left: (width - 144) / 2,
        bottom: 0
    },
    drivingStatus: {
        width: width / 2.56,
        marginRight: theme.sizes.base
    },
    drivingIcon: {
        height: 56,
        width: 56,
        marginBottom: theme.sizes.base * 1.5
    },
    map: {
        height: 352
    },
    mapMyLocation: {
        position: "absolute",
        borderRadius: 4,
        bottom: theme.sizes.base,
        left: theme.sizes.base,
        width: theme.sizes.base + 3,
        height: theme.sizes.base + 3,
        backgroundColor: theme.colors.white
    }
});

export default Trip;