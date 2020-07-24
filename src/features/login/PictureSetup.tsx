import { View, Alert, Text, Image, ImagePickerResult } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React, { useState } from 'react';
import Header from '../../components/Header';
import FancyButton from '../../components/FancyButton';
import spacing from '../../theme/spacing';
import { useDispatch } from 'react-redux';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import config from '../../utils/config';
import { setupProfilePicture } from './setupSlice';
import { AppDispatch } from '../../app/store';

interface PictureSetupProps {
  nextStep: any;
}

interface ImagePickerResultFix extends ImagePickerResult {
  uri: string;
}

const PictureSetup: React.FC<PictureSetupProps> = ({ nextStep }: PictureSetupProps) => {
  const dispatch: AppDispatch = useDispatch();

  const [image, setImage] = useState<ImagePickerResultFix>();
  const [isLoading, setIsLoading] = useState(false);
  const [cloudinaryURL, setCloudinaryURL] = useState<string>();

  const handleSubmit = () => {
    if (!image) {
      alert('Please select an image.');
      return;
    }

    setIsLoading(true);

    // Create request
    const data = new FormData();
    // @ts-ignore
    const base64Image = `data:image/jpg;base64,${image.base64}`;
    data.append('upload_preset', config.cloudinaryUploadPreset);
    data.append('file', base64Image);

    fetch(config.cloudinaryURL, {
      method: 'POST',
      body: data,
    })
      .then(response => response.json())
      .then(data => {
        if (data.secure_url !== '') {
          // Extract the URL from the response
          const cloudinarySecureURLResponse = data.secure_url;

          // Adds the URL to the setup state
          setCloudinaryURL(cloudinarySecureURLResponse);
          dispatch(setupProfilePicture(cloudinarySecureURLResponse));
          return nextStep();
        }

        setIsLoading(false);
      })
      .catch(err => alert(JSON.stringify(err)));
  };

  const pickImage = async (camera: boolean) => {
    // Request camera roll
    if (Constants.platform.ios) {
      const cameraStatus = (await ImagePicker.requestCameraPermissionsAsync()).status;
      const libraryStatus = (await ImagePicker.requestCameraPermissionsAsync()).status;

      if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    // Grab image
    const result = camera
      ? await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true,
        })
      : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true,
        });

    // console.log(result);

    if (!result.cancelled) {
      // @ts-ignore
      setImage(result);
    }
  };

  return (
    <View style={{ height: '100%', flex: 1 }}>
      <Header emoji="camera" title="set a profile picture" subtitle="let ur friends identify u" />
      <FancyButton text="Take Picture" onPress={() => pickImage(true)} />
      <FancyButton text="Select Picture" onPress={() => pickImage(false)} />
      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
      {cloudinaryURL ? <Text>{cloudinaryURL}</Text> : <Text>No Image</Text>}
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10 }}>
        <FancyButton loading={isLoading} onPress={handleSubmit} text="next" />
      </View>
    </View>
  );
};

export default PictureSetup;
