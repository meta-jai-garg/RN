import React, { Component } from "react";
import {
    StyleSheet,
    SafeAreaView,
    Image
} from "react-native";
import { Card, Text, Button } from "native-base";

export default class ProfilePage extends Component {
    render() {
        const user = this.props.navigation.state.params.user;
        return (
            <SafeAreaView style={styles.container}>
                <Card style={styles.card}>
                    <Image
                        source={{
                            uri: `http://graph.facebook.com/${
                                user.id
                            }/picture?type=large`
                        }}
                        style={styles.image}
                    />
                </Card>
                <Text style={[styles.text, { fontSize: 24 }]}>{user.name}</Text>
                <Text style={[styles.text, { fontSize: 20, color: "#385170" }]}>
                    {user.birthday}
                </Text>
                <Text style={[styles.text, { fontSize: 20, color: "#385170" }]}>
                    {user.location.name}
                </Text>
                <Button
                    full
                    rounded
                    onPress={() => this.showLocation()}
                    style={{
                        marginTop: 20,
                        marginHorizontal: 20,
                        backgroundColor: "#142d4c"
                    }}
                >
                    <Text style={{ fontSize: 20 }}>Current Location</Text>
                </Button>
                <Button
                    full
                    rounded
                    onPress={() => this.openCamera()}
                    style={{
                        marginTop: 20,
                        marginHorizontal: 20,
                        backgroundColor: "#EF424C"
                    }}
                >
                    <Text style={{ fontSize: 20 }}>Choose Pictures</Text>
                </Button>
            </SafeAreaView>
        );
    }

    showLocation = () => {
        this.props.navigation.navigate("Location");
    };

    openCamera = () => {
        this.props.navigation.navigate("ImagePicker");
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#ECECEC"
    },
    card: {
        marginTop: 40,
        height: 200,
        width: 200,
        borderRadius: 100
    },
    image: {
        height: 200,
        width: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "white"
    },
    text: {
        color: "#142d4c",
        marginTop: 20
    }
});
