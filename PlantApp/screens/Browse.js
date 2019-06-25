import React, { Component } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    KeyboardAvoidingView,
    Keyboard,
    Image,
    TouchableOpacity,
    ScrollView
} from "react-native";

import { Button, Block, Text, Input, Card, Badge } from "../components";

import { theme, mocks } from "../constants";

class Browse extends Component {
    state = {
        active: "Products",
        categories: []
    };

    componentWillMount() {
        this.setState({ categories: this.props.categories });
    }

    handleTab = tab => {
        const { categories } = this.props;
        const filtered = categories.filter(category =>
            category.tags.includes(tab.toLowerCase())
        );
        this.setState({ active: tab, categories: filtered });
    };

    renderTab(tab) {
        const { active } = this.state;
        const isActive = active === tab;
        return (
            <TouchableOpacity
                key={`tab-${tab}`}
                onPress={() => this.handleTab(tab)}
                style={[styles.tab, isActive ? styles.active : null]}
            >
                <Text size={16} medium gray={!isActive} secondary={isActive}>
                    {tab}
                </Text>
            </TouchableOpacity>
        );
    }
    render() {
        const { profile, navigation } = this.props;
        const { categories } = this.state;
        const tabs = ["Products", "Inspirations", "Shop"];
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
                        Browse
                    </Text>
                    <Button onPress={() => navigation.navigate("Settings")}>
                        <Image source={profile.avatar} style={styles.avatar} />
                    </Button>
                </Block>
                <Block flex={false} row center style={styles.tabs}>
                    {tabs.map(tab => this.renderTab(tab))}
                </Block>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingHorizontal: theme.sizes.base * 2 }}
                >
                    <Block
                        flex={false}
                        row
                        space="between"
                        style={styles.categories}
                    >
                        {categories.map(category => (
                            <TouchableOpacity
                                key={category.id}
                                onPress={() =>
                                    navigation.navigate("Explore", { category })
                                }
                            >
                                <Card
                                    center
                                    middle
                                    shadow
                                    style={styles.category}
                                >
                                    <Badge
                                        margin={[0, 0, 15]}
                                        size={50}
                                        color="rgba(41,216,143,0.20)"
                                    >
                                        <Image source={category.image} />
                                    </Badge>
                                    <Text medium height={20}>
                                        {category.name}
                                    </Text>
                                    <Text gray caption>
                                        {`${category.count} Products`}
                                    </Text>
                                </Card>
                            </TouchableOpacity>
                        ))}
                    </Block>
                </ScrollView>
            </Block>
        );
    }
}

Browse.defaultProps = {
    profile: mocks.profile,
    categories: mocks.categories
};

export default Browse;

const styles = StyleSheet.create({
    header: { paddingHorizontal: theme.sizes.base * 2 },
    avatar: {
        height: theme.sizes.base * 2.25,
        width: theme.sizes.base * 2.25
    },
    tabs: {
        marginTop: theme.sizes.base,
        marginHorizontal: theme.sizes.base * 2,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    tab: {
        marginRight: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base * 1.5
    },
    active: {
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: 3
    },
    category: {
        height: 150,
        width: 150
    },
    categories: {
        flexWrap: "wrap",
        paddingVertical: theme.sizes.base * 2
    }
});
