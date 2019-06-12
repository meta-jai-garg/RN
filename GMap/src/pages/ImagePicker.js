import React, { Component } from "react";
import { Text, View, PermissionsAndroid, Platform } from "react-native";
import { CameraKitGalleryView, CameraKitCamera, CameraKitCameraScreen, } from "react-native-camera-kit";

export class ImagePicker extends Component {
    constructor() {
        super();
        this.state = {
            isPermitted: true,
            album: "pics",
            images: {},
            shouldRenderCameraScreen: false
        };
    }

    render() {
        return (
            <CameraKitGalleryView
                ref={gallery => (this.gallery = gallery)}
                style={{ flex: 1, marginTop: 20 }}
                minimumInteritemSpacing={10}
                minimumLineSpacing={10}
                albumName={this.state.album}
                columnCount={3}
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
                selectedImages={Object.keys(this.state.images)}
                fileTypeSupport={{
                supportedFileTypes: ['image/jpeg'],
                unsupportedOverlayColor: "#00000055",
                //unsupportedText: 'JPEG!!',
                unsupportedTextColor: '#ff0000'
            }}
            />
        );
    }
}

export default ImagePicker;
