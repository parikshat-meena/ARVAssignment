import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Foundation';
import {COLORS} from '../constants/color';

type CameraGallaryCompProps = {
  itmeImage?: [];
  setImgResponse: (item: any) => void;
  heading?: string;
};
const CameraGallaryComp: React.FC<CameraGallaryCompProps> = ({
  setImgResponse,
  itmeImage,

  heading,
}) => {
  const [image, setImage] = useState('');
  const openCameraOrGallery = async (type: string) => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const options: any = {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: true,
        includeExtra: true,
      };
      let response: any = null;
      if (type === 'camera') {
        response = await launchCamera(options);
      } else if (type === 'gallery') {
        response = await new Promise(resolve => {
          const galleryOptions: any = {
            mediaType: 'photo',
            includeBase64: true,
            includeExtra: true,
          };
          launchImageLibrary(galleryOptions, res => resolve(res));
        });
      }
      if (!response.didCancel && !response.error) {
        // setImgResponse(response);
        const imagePath: any = response.assets[0].uri;
        console.log(imagePath, 'repsons');
        RNFetchBlob.fs
          .stat(imagePath)
          .then(stats => {
            console.log(stats, 'states');
            const sizeInBytes = stats.size;
            const sizeInKB = sizeInBytes / 1024;
            if (sizeInKB <= 5120) {
              const data = {
                id: response?.assets[0]?.id,

                filePath: response?.assets[0]?.uri,
                name: `SiteDPR_${response?.assets[0]?.fileName}`,
                type: response?.assets[0]?.type,
                size: response?.assets[0]?.fileSize,
                content: response.assets[0].base64,
              };

              setImage(data);
              setImgResponse(data);
              return imagePath;
            } else {
              return 'Error';
            }
          })
          .catch(error => {
            console.log('Error fetching image information:', error);
          });
      }
    }
  };

  return (
    <View style={{marginHorizontal: 20}}>
      <Text style={styles.descriptionHeading}>{heading}</Text>
      <View style={styles.cameraGalleryView}>
        <View style={styles.addImgBtnMainView}>
          <>
            <TouchableOpacity
              onPress={() => {
                openCameraOrGallery('camera');
              }}
              style={[styles.addImgBtnSubView, {flex: 0.4, marginLeft: 20}]}>
              <Icon
                name={'camera'}
                size={20}
                style={{color: COLORS.secondaryColorLight}}
              />
              <Text style={styles.addImgBtnText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                openCameraOrGallery('gallery');
              }}
              style={[styles.addImgBtnSubView, {flex: 0.4, marginRight: 20}]}>
              <Icon1
                name={'photo'}
                size={20}
                style={{color: COLORS.secondaryColorLight}}
              />
              <Text style={styles.addImgBtnText}>gallery </Text>
            </TouchableOpacity>
          </>
        </View>
        {image && (
          <View style={styles.itemImgView}>
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.secondaryColor,
              }}>
              <Image source={{uri: image.filePath}} style={styles.imgStyl} />
            </View>
            <TouchableOpacity
              style={styles.removeImgIcon}
              onPress={() => {
                setImage('');
                setImgResponse('');
              }}>
              <Icon
                color={COLORS.secondaryColorLight}
                size={15}
                name={'closecircleo'}
                style={{}}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default CameraGallaryComp;
const styles = StyleSheet.create({
  descriptionHeading: {
    // marginHorizontal: 20,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.new,
  },

  addImgBtnMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addImgBtnSubView: {
    backgroundColor: COLORS.primaryColorLight,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    elevation: 1,
    borderWidth: 0.3,
    borderColor: COLORS.secondaryColorLight,
  },
  addImgBtnText: {
    color: COLORS.secondaryColor,
    marginLeft: 5,
  },
  itemImgView: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeImgIcon: {
    alignSelf: 'flex-start',
    marginTop: -12,
    marginLeft: -1,
  },
  imgStyl: {
    width: 100,
    height: 100,
  },
  cameraGalleryView: {
    borderColor: COLORS.secondaryColorLight,
    borderWidth: 0.5,
    paddingVertical: 15,
    borderStyle: 'dashed',
    marginTop: 10,
  },
});
