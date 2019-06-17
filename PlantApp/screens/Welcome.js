import React, { Component } from "react";
import {
    Animated,
    FlatList,
    StyleSheet,
    Image,
    Dimensions,
    Modal,
    ScrollView
} from "react-native";
import { Button, Block, Text } from "../components";
import { theme } from "../constants";

const { width, height } = Dimensions.get("window");

class Welcome extends Component {
    static navigationOptions = {
        header: null
    };

    scrollX = new Animated.Value(0);

    state = {
        showTerms: false
    };

    renderIllustration() {
        const { illustrations } = this.props;
        return (
            <FlatList
                horizontal
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment="center"
                data={illustrations}
                extraData={this.state}
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({ item }) => (
                    <Image
                        source={item.source}
                        resizeMode="contain"
                        style={{
                            width,
                            height: height / 2,
                            overflow: "visible"
                        }}
                    />
                )}
                onScroll={Animated.event([
                    {
                        nativeEvent: { contentOffset: { x: this.scrollX } }
                    }
                ])}
            />
        );
    }
    renderSteps() {
        const { illustrations } = this.props;
        const stepPosition = Animated.divide(this.scrollX, width);
        return (
            <Block row center middle style={styles.stepsContainer}>
                {illustrations.map((item, index) => {
                    const opacity = stepPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: "clamp"
                    });
                    return (
                        <Block
                            animated
                            flex={false}
                            key={`step-${index}`}
                            style={[styles.steps, { opacity }]}
                            color="gray"
                        />
                    );
                })}
            </Block>
        );
    }

    renderTermsService() {
        return (
            <Modal animationType="slide" visible={this.state.showTerms}>
                <Block
                    padding={[theme.sizes.padding * 2, theme.sizes.padding]}
                    space="between"
                >
                    <Text>Terms of service</Text>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ paddingVertical: theme.sizes.padding }}
                    >
                        <Text caption gray height={18}>
                            Lorem ipsum, or lipsum as it is sometimes known, is
                            dummy text used in laying out print, graphic or web
                            designs. The passage is attributed to an unknown
                            typesetter in the 15th century who is thought to
                            have scrambled parts of Cicero's De Finibus Bonorum
                            et Malorum for use in a type specimen book.
                        </Text>
                        <Text caption gray height={18}>
                            {"\n"}
                            Lorem ipsum, or lipsum as it is sometimes known, is
                            dummy text used in laying out print, graphic or web
                            designs. The passage is attributed to an unknown
                            typesetter in the 15th century who is thought to
                            have scrambled parts of Cicero's De Finibus Bonorum
                            et Malorum for use in a type specimen book.
                        </Text>
                        <Text caption gray height={18}>
                            {"\n"}
                            Lorem ipsum, or lipsum as it is sometimes known, is
                            dummy text used in laying out print, graphic or web
                            designs. The passage is attributed to an unknown
                            typesetter in the 15th century who is thought to
                            have scrambled parts of Cicero's De Finibus Bonorum
                            et Malorum for use in a type specimen book.
                        </Text>
                        <Text caption gray height={18}>
                            {"\n"}
                            Lorem ipsum, or lipsum as it is sometimes known, is
                            dummy text used in laying out print, graphic or web
                            designs. The passage is attributed to an unknown
                            typesetter in the 15th century who is thought to
                            have scrambled parts of Cicero's De Finibus Bonorum
                            et Malorum for use in a type specimen book.
                        </Text>
                        <Text caption gray height={18}>
                            {"\n"}
                            Lorem ipsum, or lipsum as it is sometimes known, is
                            dummy text used in laying out print, graphic or web
                            designs. The passage is attributed to an unknown
                            typesetter in the 15th century who is thought to
                            have scrambled parts of Cicero's De Finibus Bonorum
                            et Malorum for use in a type specimen book.
                        </Text>
                        <Text caption gray height={18}>
                            {"\n"}
                            Lorem ipsum, or lipsum as it is sometimes known, is
                            dummy text used in laying out print, graphic or web
                            designs. The passage is attributed to an unknown
                            typesetter in the 15th century who is thought to
                            have scrambled parts of Cicero's De Finibus Bonorum
                            et Malorum for use in a type specimen book.
                        </Text>
                        <Text caption gray height={18}>
                            {"\n"}
                            Lorem ipsum, or lipsum as it is sometimes known, is
                            dummy text used in laying out print, graphic or web
                            designs. The passage is attributed to an unknown
                            typesetter in the 15th century who is thought to
                            have scrambled parts of Cicero's De Finibus Bonorum
                            et Malorum for use in a type specimen book.
                        </Text>
                        <Text
                            caption
                            gray
                            height={18}
                            style={{
                                marginBottom: theme.sizes.padding * 2
                            }}
                        >
                            {"\n"}
                            Lorem ipsum, or lipsum as it is sometimes known, is
                            dummy text used in laying out print, graphic or web
                            designs. The passage is attributed to an unknown
                            typesetter in the 15th century who is thought to
                            have scrambled parts of Cicero's De Finibus Bonorum
                            et Malorum for use in a type specimen book.
                        </Text>
                    </ScrollView>
                    <Button
                        gradient
                        onPress={() => this.setState({ showTerms: false })}
                    >
                        <Text center white>
                            I understand
                        </Text>
                    </Button>
                </Block>
            </Modal>
        );
    }

    render() {
        const { navigation } = this.props;
        return (
            <Block>
                <Block center bottom flex={0.5}>
                    <Text h1 center bold>
                        Your Home.
                        <Text h1 primary>
                            {" "}
                            Greener.
                        </Text>
                    </Text>
                    <Text
                        h3
                        gray2
                        style={{ marginTop: theme.sizes.padding / 2 }}
                    >
                        Enjoy the experience.
                    </Text>
                </Block>
                <Block>
                    {this.renderIllustration()}
                    {this.renderSteps()}
                </Block>
                <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
                    <Button
                        gradient
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text center semibold white>
                            Login
                        </Text>
                    </Button>
                    <Button
                        shadow
                        onPress={() => navigation.navigate("Signup")}
                    >
                        <Text center semibold>
                            Signup
                        </Text>
                    </Button>
                    <Button onPress={() => this.setState({ showTerms: true })}>
                        <Text
                            center
                            caption
                            gray
                            style={{ paddingBottom: theme.sizes.padding / 2 }}
                        >
                            Terms of service
                        </Text>
                    </Button>
                </Block>
                {this.renderTermsService()}
            </Block>
        );
    }
}

Welcome.defaultProps = {
    illustrations: [
        { id: 1, source: require("../assets/images/illustration_1.png") },
        { id: 2, source: require("../assets/images/illustration_2.png") },
        { id: 3, source: require("../assets/images/illustration_3.png") }
    ]
};

export default Welcome;

const styles = StyleSheet.create({
    stepsContainer: {
        position: "absolute",
        right: 0,
        bottom: theme.sizes.base * 3,
        left: 0
    },
    steps: {
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 2.5
    }
});
