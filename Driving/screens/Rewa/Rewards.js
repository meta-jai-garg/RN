import React, { Component } from "react";
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from "react-native";
import { Block, Text, Card, Badge, Progress } from "../../components";
import { theme, mocks } from "../../constants";
import { CircularProgress } from "react-native-circular-progress";
import rgba from "hex-to-rgba";
import Icon from "react-native-vector-icons/FontAwesome";
 
class Rewards extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <Text
                    style={[
                        theme.fonts.header,
                        { paddingLeft: theme.sizes.base }
                    ]}
                >
                    Your Rewards
                </Text>
            ),
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        resizeMode="contain"
                        source={require("../../assets/images/Icon/Back.png")}
                        style={{
                            width: 20,
                            height: 24
                        }}
                    />
                </TouchableOpacity>
            )
        };
    };

    renderMonthly() {
        return (
            <Card shadow style={{ paddingVertical: theme.sizes.padding }}>
                <Block center>
                    <Text h1 primary spacing={1.7}>
                        $11.71
                    </Text>
                    <Text spacing={0.7}>Total Monthly Rewards</Text>
                </Block>
                <Block color={theme.colors.gray3} style={styles.hLine} />
                <Block row>
                    <Block center>
                        <Text
                            size={20}
                            spacing={0.6}
                            primary
                            style={{ marginBottom: 6 }}
                        >
                            8.1
                        </Text>
                        <Text body spacing={0.7}>
                            Driving
                        </Text>
                        <Text body spacing={0.7}>
                            Score
                        </Text>
                    </Block>
                    <Block
                        flex={false}
                        color={theme.colors.gray3}
                        style={styles.vLine}
                    />
                    <Block center>
                        <Text
                            size={20}
                            spacing={0.6}
                            primary
                            style={{ marginBottom: 6 }}
                        >
                            37
                        </Text>
                        <Text body spacing={0.7}>
                            Driver's
                        </Text>
                        <Text body spacing={0.7}>
                            Level
                        </Text>
                    </Block>
                </Block>
            </Card>
        );
    }

    renderRewards() {
        return (
            <Card shadow style={{ paddingVertical: theme.sizes.base * 2 }}>
                <Block center>
                    <CircularProgress
                        size={214} // can use  with * .5 => 50%
                        fill={85} // percentage
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
                                    8.1
                                </Text>
                                <Text h3 transform="uppercase">
                                    good
                                </Text>
                            </Block>
                        )}
                    </CircularProgress>
                </Block>
                <Block center>
                    <Text title spacing={1} style={{ marginVertical: 8 }}>
                        Driving Score
                    </Text>
                    <Text>
                        <Text primary>37 </Text>
                        <Text gray transform="uppercase">
                            level
                        </Text>
                    </Text>
                </Block>

                <Block color="gray3" style={styles.hLine} />

                <Block row>
                    <Block center flex={0.8}>
                        <Text
                            size={20}
                            spacing={0.6}
                            primary
                            style={{ marginBottom: 6 }}
                        >
                            79
                        </Text>
                        <Text spacing={0.7}>Trips</Text>
                    </Block>
                    <Block center flex={2}>
                        <Text
                            size={20}
                            spacing={0.6}
                            primary
                            style={{ marginBottom: 6 }}
                        >
                            123
                        </Text>
                        <Text spacing={0.7}>Hours</Text>
                    </Block>
                    <Block center flex={0.8}>
                        <Text
                            size={20}
                            spacing={0.6}
                            primary
                            style={{ marginBottom: 6 }}
                        >
                            2786
                        </Text>
                        <Text spacing={0.7}>Miles</Text>
                    </Block>
                </Block>

                <Block color="gray3" style={styles.hLine} />

                <Block style={{ marginBottom: theme.sizes.base }}>
                    <Block row space="between">
                        <Text spacing={0.7} style={{ paddingLeft: 6 }}>
                            Breaking
                        </Text>
                        <Text>8.1</Text>
                    </Block>
                    <Progress value={0.81} />
                </Block>
                <Block style={{ marginBottom: theme.sizes.base }}>
                    <Block row space="between">
                        <Text spacing={0.7} style={{ paddingLeft: 6 }}>
                            Speeding
                        </Text>
                        <Text>9.8</Text>
                    </Block>
                    <Progress value={0.98} />
                </Block>
                <Block style={{ marginBottom: theme.sizes.base }}>
                    <Block row space="between">
                        <Text spacing={0.7} style={{ paddingLeft: 6 }}>
                            Distracted Driving
                        </Text>
                        <Text>7.4</Text>
                    </Block>
                    <Progress endColor="#D37694" value={0.74} />
                </Block>
                <Block color="gray3" style={styles.hLine} />
                <Block row center space="between">
                    <Text>Total Driver Discount</Text>
                    <Text size={20} spacing={1} primary>
                        $6.71
                    </Text>
                </Block>
            </Card>
        );
    }

    renderChallenges() {
        return (
            <Block style={{ paddingBottom: theme.sizes.padding * 1.5 }}>
                <Block
                    style={{
                        marginBottom: theme.sizes.base,
                        marginTop: theme.sizes.base,
                        paddingHorizontal: theme.sizes.base / 3
                    }}
                >
                    <Text spacing={0.7} transform="uppercase">
                        Challenges Taken
                    </Text>
                </Block>
                <Card row shadow color="gray">
                    <Block middle flex={0.4}>
                        <Badge
                            color={rgba(theme.colors.white, "0.2")}
                            size={74}
                        >
                            <Badge
                                color={rgba(theme.colors.white, "0.2")}
                                size={52}
                            >
                                <Icon
                                    name="check"
                                    color="white"
                                    size={theme.sizes.h1}
                                />
                            </Badge>
                        </Badge>
                    </Block>
                    <Block middle style={{ paddingLeft: theme.sizes.base }}>
                        <Text
                            spacing={0.4}
                            size={theme.sizes.base}
                            medium
                            white
                        >
                            Hit zero pedestrians
                        </Text>
                        <Text
                            spacing={0.4}
                            size={theme.sizes.base}
                            medium
                            white
                        >
                            during next trip - $5
                        </Text>
                    </Block>
                </Card>
            </Block>
        );
    }

    render() {
        return (
            <ScrollView
                style={styles.rewards}
                showsVerticalScrollIndicator={false}
            >
                {this.renderMonthly()}
                {this.renderRewards()}
                {this.renderChallenges()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    rewards: {
        padding: theme.sizes.padding,
        backgroundColor: theme.colors.gray4
    },
    hLine: {
        marginVertical: theme.sizes.base * 1.5,
        height: 1
    },
    vLine: {
        marginVertical: theme.sizes.base / 2,
        width: 1
    }
});

export default Rewards;
