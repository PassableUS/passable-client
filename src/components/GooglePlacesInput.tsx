import React, { ReactPropTypes, useEffect, useRef } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../utils/config';

const GooglePlacesInput = (props: any) => {
  const ref = useRef<any>();

  useEffect(() => {
    // ref.current?.focus();
  }, []);

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder="Search for a place"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        // console.log(data, details);
      }}
      query={{
        key: config.placesAPIKey,
        language: 'en',
      }}
      autoFillOnNotFound
      enablePoweredByContainer
      requestUrl={{
        useOnPlatform: 'web', // or "all"
        url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api', // or any proxy server that hits https://maps.googleapis.com/maps/api
      }}
      onFail={e => alert(JSON.stringify(e))}
      styles={{
        textInput: {
          borderRadius: 10,
          height: 50,
          backgroundColor: '#efefef',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderColor: 'blue',
          borderWidth: 2,
        },
      }}
      {...props}
    />
  );
};

export default GooglePlacesInput;
