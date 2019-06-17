import React, { Component } from "react";
import { StyleSheet, Image, ScrollView, TextInput } from "react-native";

import { Block, Text, Divider, Switch } from "../components";

import { theme, mocks } from "../constants";
import Slider from "react-native-slider";

class Settings extends Component {
    state = {
        budget: 750,
        monthly_cap: 1800,
        notifications: true,
        newsLetter: false,
        editing: null,
        profile: {}
    };

    componentDidMount() {
        this.setState({ profile: this.props.profile });
    }

    handleEdit(field, text) {
        const { profile } = this.state;
        profile[field] = text;
        this.setState({ profile });
    }

    renderEdit(field) {
        const { profile, editing } = this.state;
        if (editing === field)
            return (
                <TextInput
                    defaultValue={profile[field]}
                    onChangeText={text => this.handleEdit([field], text)}
                />
            );

        return <Text bold>{profile[field]}</Text>;
    }

    toggleEdit(field) {
        const { editing } = this.state;
        this.setState({ editing: !editing ? field : null });
    }

    render() {
        const { profile, editing } = this.state;
        return (
            <Block>
                <Block
                    flex={false}
                    row
                    center
                    space="between"
                    style={styles.header}
                >
                    <Text h1 bold>
                        Settings
                    </Text>
                    <Image source={profile.avatar} style={styles.avatar} />
                </Block>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Block style={styles.input}>
                        <Block
                            row
                            space="between"
                            margin={[10, 0]}
                            style={styles.inputRow}
                        >
                            <Block>
                                <Text gray2 style={{ marginBottom: 10 }}>
                                    Username
                                </Text>
                                {this.renderEdit("username")}
                            </Block>

                            <Text
                                medium
                                secondary
                                onPress={() => this.toggleEdit("username")}
                            >
                                {editing === "username" ? "Save" : "Edit"}
                            </Text>
                        </Block>
                        <Block
                            row
                            space="between"
                            margin={[10, 0]}
                            style={styles.inputRow}
                        >
                            <Block>
                                <Text gray2 style={{ marginBottom: 10 }}>
                                    Location
                                </Text>
                                {this.renderEdit("location")}
                            </Block>

                            <Text
                                medium
                                secondary
                                onPress={() => this.toggleEdit("location")}
                            >
                                {editing === "location" ? "Save" : "Edit"}
                            </Text>
                        </Block>
                        <Block
                            row
                            space="between"
                            margin={[10, 0]}
                            style={styles.inputRow}
                        >
                            <Block>
                                <Text gray2 style={{ marginBottom: 10 }}>
                                    E-mail
                                </Text>
                                <Text bold>{profile.email}</Text>
                            </Block>
                        </Block>
                    </Block>

                    <Divider
                        margin={[theme.sizes.base, theme.sizes.base * 2]}
                    />
                    <Block style={styles.sliders}>
                        <Block margin={[10, 0]}>
                            <Text gray2 style={{ marginBottom: 10 }}>
                                Budget
                            </Text>
                            <Slider
                                minimumValue={0}
                                maximumValue={1000}
                                style={{ height: 19 }}
                                thumbStyle={styles.thumb}
                                trackStyle={{ height: 6, borderRadius: 6 }}
                                minimumTrackTintColor={theme.colors.secondary}
                                maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                                value={this.state.budget}
                                onValueChange={value =>
                                    this.setState({ budget: value })
                                }
                            />
                            <Text caption gray right style={{ marginTop: 5 }}>
                                $1,000
                            </Text>
                        </Block>
                        <Block margin={[10, 0]}>
                            <Text gray2 style={{ marginBottom: 10 }}>
                                Monthly Cap
                            </Text>
                            <Slider
                                minimumValue={0}
                                maximumValue={5000}
                                style={{ height: 19 }}
                                thumbStyle={styles.thumb}
                                trackStyle={{ height: 6, borderRadius: 6 }}
                                minimumTrackTintColor={theme.colors.secondary}
                                maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                                value={this.state.monthly_cap}
                                onValueChange={value =>
                                    this.setState({ monthly_cap: value })
                                }
                            />
                            <Text caption gray right style={{ marginTop: 5 }}>
                                $5,000
                            </Text>
                        </Block>
                    </Block>

                    <Divider
                        margin={[theme.sizes.base, theme.sizes.base * 2]}
                    />

                    <Block style={styles.toggles}>
                        <Block row center space="between" margin={[10, 0]}>
                            <Text size={16} gray>
                                Notifications
                            </Text>
                            <Switch
                                value={this.state.notifications}
                                onValueChange={notifications =>
                                    this.setState({ notifications })
                                }
                            />
                        </Block>
                        <Block row center space="between" margin={[10, 0]}>
                            <Text size={16} gray>
                                Newsletter
                            </Text>
                            <Switch
                                value={this.state.newsLetter}
                                onValueChange={newsLetter =>
                                    this.setState({ newsLetter })
                                }
                            />
                        </Block>
                    </Block>
                </ScrollView>
            </Block>
        );
    }
}

Settings.defaultProps = {
    profile: mocks.profile
};

export default Settings;

const styles = StyleSheet.create({
    header: { paddingHorizontal: theme.sizes.base * 2 },
    avatar: {
        height: theme.sizes.base * 2.25,
        width: theme.sizes.base * 2.25
    },
    input: {
        paddingHorizontal: theme.sizes.base * 2,
        marginTop: theme.sizes.base * 0.75
    },
    inputRow: {
        alignItems: "flex-end"
    },
    sliders: {
        paddingHorizontal: theme.sizes.base * 2,
        marginTop: theme.sizes.base * 0.75
    },
    toggles: {
        paddingHorizontal: theme.sizes.base * 2,
        marginTop: theme.sizes.base * 0.75
    },
    thumb: {
        width: theme.sizes.base,
        height: theme.sizes.base,
        borderRadius: theme.sizes.base,
        borderColor: "white",
        borderWidth: 3,
        backgroundColor: theme.colors.secondary
    }
});
