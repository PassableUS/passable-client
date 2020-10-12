import React from 'react';
import {
  Layout,
  Text,
  Autocomplete,
  AutocompleteItem,
  Button,
  Icon,
  Spinner,
} from '@ui-kitten/components';
import { Platform, FlatList, View, Alert } from 'react-native';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { db } from '../../components/FirebaseAuthenticator';
import LottieView from 'lottie-react-native';
import { District, setupDistrict } from './setupSlice';
import { useDispatch } from 'react-redux';
import { SchoolDistrictScreenNavigationProp } from './LoginNavigation';
import { useCollectionData } from 'react-firebase-hooks/firestore/';
import { useAppDispatch } from '../../app/store';

interface SchoolDistrictStepProps {
  navigation: SchoolDistrictScreenNavigationProp;
}

const SchoolDistrictStep = ({ navigation }: SchoolDistrictStepProps) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState('');

  const [districtData, isDistrictsLoading, districtsError] = useCollectionData<District>(
    db.collection('districts'),
    { idField: 'id' }
  );
  const [filteredDistricts, setFilteredDistricts] = React.useState<District[]>();

  const filter = (item: District, query: string) =>
    item.name.toLowerCase().includes(query.toLowerCase());

  const onChangeText = (query: string) => {
    setValue(query);
    setFilteredDistricts(districtData.filter(item => filter(item, query)) as District[]);
  };

  const handleSelectDistrict = (district: firebase.firestore.DocumentData) => {
    // Validation
    if (!district.name || !district.id) {
      alert(
        'Invalid district data. Please try restarting the application. If this problem persists, please contact support.'
      );
      return;
    }

    try {
      dispatch(setupDistrict(district as District));
    } catch (e) {
      Alert.alert(JSON.stringify(e));
      return;
    }

    navigation.navigate('TeacherLoginStep');
  };

  const SchoolDistrictListItem = ({ item }: { item: District }) => (
    <Button
      onPress={() => handleSelectDistrict(item)}
      appearance="outline"
      size="large"
      style={{ marginTop: 5, width: '100%', paddingVertical: 30 }}>
      {item.name}
    </Button>
  );

  return (
    <DefaultLayout>
      <Text category="h1" style={{ marginTop: 30 }}>
        Select School District
      </Text>
      <Text category="s1">Type in the name of the school district that you wish to join</Text>

      <Autocomplete
        size="large"
        style={{ width: '100%', marginTop: 50, marginBottom: 20 }}
        placeholder="Type your school district name..."
        caption="Type the full name of your school district without abbreviation"
        value={value}
        onChangeText={onChangeText}
      />

      {districtData == null && (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          {Platform.OS === 'web' ? (
            <Spinner size="giant" />
          ) : (
            <LottieView
              autoPlay
              style={{
                width: 100,
              }}
              source={require('../../assets/mainLoader.json')}
            />
          )}
        </View>
      )}

      <FlatList
        style={{ width: '100%' }}
        data={filteredDistricts}
        renderItem={SchoolDistrictListItem}
        keyExtractor={item => String(item.id)}
      />
    </DefaultLayout>
  );
};

export default SchoolDistrictStep;
