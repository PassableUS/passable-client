import React from 'react';
import { Layout, Text, Autocomplete, AutocompleteItem, Button, Icon } from '@ui-kitten/components';
import { KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { db } from '../../components/FirebaseAuthenticator';
import LottieView from 'lottie-react-native';

interface District {
  id: string;
  name: string;
}

const SchoolDistrictStep = () => {
  React.useEffect(() => {
    const unsubscribe = db.collection('districts').onSnapshot(
      querySnapshot => {
        let districts: District[] = [];
        querySnapshot.forEach(function(doc) {
          districts.push({ id: doc.id, ...doc.data() } as District);
        });
        setDistrictData(districts);
        setFilteredDistricts(districts);
      },
      error => alert(error)
    );

    return unsubscribe;
  }, []);

  const [value, setValue] = React.useState('');
  const [districtData, setDistrictData] = React.useState<District[]>();
  const [filteredDistricts, setFilteredDistricts] = React.useState<District[]>();

  const filter = (item: District, query: string) =>
    item.name.toLowerCase().includes(query.toLowerCase());

  const onChangeText = (query: string) => {
    setValue(query);
    setFilteredDistricts(districtData.filter(item => filter(item, query)) as District[]);
  };

  const SchoolDistrictListItem = ({ item }: { item: District }) => (
    <Button
      appearance="outline"
      size="large"
      onPress={() => alert(item.id)}
      style={{ marginTop: 5, width: '100%', paddingVertical: 30 }}>
      {item.name}
    </Button>
  );

  // const AlertIcon = props => <Icon {...props} name="alert-circle-outline" />;

  return (
    <DefaultLayout>
      <Text category="h1" style={{ marginTop: 20 }}>
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
        <LottieView source={require('../../assets/mainLoader.json')}></LottieView>
      )}

      <FlatList
        style={{ width: '100%' }}
        data={filteredDistricts}
        renderItem={SchoolDistrictListItem}
        keyExtractor={item => String(item.id)}
      />
      {/* <LottieView
        autoPlay
        style={{
          width: 400,
          height: 400,
          backgroundColor: '#eee',
        }}
        source={require('../../assets/mainLoader.json')}></LottieView> */}
    </DefaultLayout>
  );
};

export default SchoolDistrictStep;
