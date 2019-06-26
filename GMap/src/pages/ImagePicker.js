import React, { Component } from "react";
import {
    View,
    BackHandler,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions
} from "react-native";
import { CameraKitGalleryView } from "react-native-camera-kit";

import { Button, Text } from "native-base";
import ImagePicker from "react-native-image-crop-picker";
const { width, height } = Dimensions.get("window");

class ImagePick extends Component {
    constructor() {
        super();
        this.state = {
            isPermitted: true,
            images: {},
            shouldRenderCameraScreen: false,
            selectionComplete: false,
            croppedImage: undefined
        };
    }

    componentDidMount() {
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.onBackPress.bind(this)
        );
    }

    onBackPress() {
        this.props.navigation.pop();
        return true;
    }

    renderGallery() {
        if (!this.state.selectionComplete)
            return (
                <CameraKitGalleryView
                    ref={gallery => (this.gallery = gallery)}
                    style={{ flex: 1, marginTop: 20 }}
                    minimumInteritemSpacing={10}
                    minimumLineSpacing={10}
                    columnCount={3}
                    selectedImages={Object.keys(this.state.images)}
                    onTapImage={event => {
                        const uri = event.nativeEvent.selected;
                        console.log("Tapped on an image: " + uri);
                        if (this.state.images[uri]) {
                            delete this.state.images[uri];
                        } else {
                            this.state.images[uri] = true;
                        }
                        this.setState({ images: { ...this.state.images } });
                    }}
                    fileTypeSupport={{
                        supportedFileTypes: ["image/jpeg"],
                        unsupportedOverlayColor: "#00000055",
                        unsupportedTextColor: "#ff0000"
                    }}
                />
            );
    }

    renderDone() {
        const { selectionComplete } = this.state;
        if (Object.keys(this.state.images).length > 0 && !selectionComplete) {
            return (
                <Button
                    full
                    rounded
                    dark={true}
                    onPress={() => this.setState({ selectionComplete: true })}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        left: 0,
                        marginBottom: 16,
                        marginHorizontal: 32
                    }}
                >
                    <Text>Done</Text>
                </Button>
            );
        } else return null;
    }

    showFullImage(item) {
        ImagePicker.openCropper({
            path: `file://${item}`
        })
            .then(image => {
                this.setState({ croppedImage: image });
            })
            .catch(e => {
                console.log(e);
            });
    }

    showCroppedImage() {
        const { croppedImage } = this.state;
        return (
            croppedImage && (
                <Image
                    source={{ uri: croppedImage.path }}
                    style={{
                        width: width - 32,
                        height: width,
                        marginTop: 16,
                        marginLeft: 16
                    }}
                />
            )
        );
    }

    showSelectedImages() {
        const selectedImages = Object.keys(this.state.images);
        return (
            <View
                style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    right: 0,
                    marginBottom: 16
                }}
            >
                <FlatList
                    horizontal={true}
                    data={selectedImages}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => this.showFullImage(item)}
                        >
                            <Image
                                source={{
                                    uri: `file://${item}`
                                }}
                                style={{
                                    height: 100,
                                    width: 100,
                                    overflow: "visible",
                                    marginLeft: index > 0 ? 16 : 0
                                }}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderGallery()}
                {this.renderDone()}
                {this.state.selectionComplete && this.showSelectedImages()}
                {this.showCroppedImage()}
            </View>
        );
    }
}

export default ImagePick;
