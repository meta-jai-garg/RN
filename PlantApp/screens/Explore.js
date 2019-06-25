import React, { Component } from "react";
import {
    StyleSheet,
    Image,
    ScrollView,
    TextInput,
    Dimensions,
    TouchableOpacity
} from "react-native";

import { Block, Text, Divider, Switch, Input, Button } from "../components";

import { theme, mocks } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";

const { width, height } = Dimensions.get("window");

class Explore extends Component {
    state = {
        searchString: ""
    };
    renderSearch() {
        const { searchString } = this.state;
        return (
            <Block middle flex={0.6} style={styles.search}>
                <Input
                    placeholder="Search"
                    placeholderTextColor={theme.colors.gray2}
                    style={styles.searchInput}
                    onChangeText={text => this.setState({ searchString: text })}
                    value={searchString}
                    rightStyle={styles.searchRight}
                    rightLabel={
                        <Icon
                            name="search"
                            size={theme.sizes.base / 1.6}
                            color={theme.colors.gray2}
                            style={styles.searchIcon}
                        />
                    }
                />
            </Block>
        );
    }

    renderImage(img, index) {
        const { navigation } = this.props;
        const sizes = Image.resolveAssetSource(img);
        const fullWidth = width - theme.sizes.padding * 2.5;
        const resize = (sizes.width * 100) / fullWidth;
        const imgWidth = resize > 75 ? fullWidth : sizes.width * 1;

        return (
            <TouchableOpacity
                activeOpacity={0.9}
                key={`img-${index}`}
                onPress={() => navigation.navigate("Product")}
            >
                <Image
                    source={img}
                    style={[
                        styles.image,
                        { minWidth: imgWidth, maxWidth: imgWidth }
                    ]}
                />
            </TouchableOpacity>
        );
    }

    renderExplore() {
        const { images, navigation } = this.props;
        const mainImage = images[0];
        return (
            <Block
                style={{
                    marginBottom: height / 3,
                    marginTop: theme.sizes.base
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={[styles.image, styles.mainImage]}
                    onPress={() => navigation.navigate("Product")}
                >
                    <Image
                        source={mainImage}
                        style={[styles.image, styles.mainImage]}
                    />
                </TouchableOpacity>
                <Block row space="between" wrap>
                    {images
                        .slice(1)
                        .map((img, index) => this.renderImage(img, index))}
                </Block>
            </Block>
        );
    }
    renderFooter() {
        return (
            <LinearGradient
                locations={[0.5, 1]}
                style={styles.footer}
                colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.6)"]}
            >
                <Button gradient style={{ width: width / 2.678 }}>
                    <Text bold white center>
                        Filter
                    </Text>
                </Button>
            </LinearGradient>
        );
    }
    render() {
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
                        Explore
                    </Text>
                    {this.renderSearch()}
                </Block>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.explore}
                >
                    {this.renderExplore()}
                </ScrollView>
                {this.renderFooter()}
            </Block>
        );
    }
}

Explore.defaultProps = {
    images: mocks.explore
};

export default Explore;

const styles = StyleSheet.create({
    header: { paddingHorizontal: theme.sizes.base * 2 },
    search: {
        height: theme.sizes.base * 2,
        width: width - theme.sizes.base * 2
    },
    searchInput: {
        fontSize: theme.sizes.caption,
        height: theme.sizes.base * 2,
        backgroundColor: "rgba(142,142,147, 0.06)",
        borderColor: "rgba(142,142,147, 0.06)",
        paddingLeft: theme.sizes.base / 1.33,
        paddingRight: theme.sizes.base * 1.5
    },
    searchRight: {
        top: 0,
        marginVertical: 0,
        backgroundColor: "transparent"
    },
    searchIcon: {
        position: "absolute",
        right: theme.sizes.base / 1.333,
        top: theme.sizes.base / 1.6
    },
    explore: {
        marginHorizontal: theme.sizes.padding * 1.25
    },
    image: {
        minHeight: 100,
        maxHeight: 130,
        maxWidth: width - theme.sizes.padding * 2.5,
        marginBottom: theme.sizes.base,
        borderRadius: 4
    },
    mainImage: {
        minWidth: width - theme.sizes.padding * 2.5,
        minHeight: width - theme.sizes.padding * 2.5
    },
    footer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        overflow: "visible",
        alignItems: "center",
        justifyContent: "center",
        height: height * 0.1,
        width,
        paddingBottom: theme.sizes.base * 4
    }
});
