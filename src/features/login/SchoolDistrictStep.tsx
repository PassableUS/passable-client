import React from 'react';
import { Layout, Text, Autocomplete, AutocompleteItem, Button, Icon } from '@ui-kitten/components';
import { KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DefaultLayout from '../../components/layouts/DefaultLayout';

const schoolDistricts = [
  {
    id: 1,
    name: 'Martin County School District',
  },
  {
    id: 2,
    name: 'Palm Beach School District',
  },
];

const SchoolDistrictStep = () => {
  const [value, setValue] = React.useState('');
  const [data, setData] = React.useState(schoolDistricts);

  const filter = (item: any, query: any) => item.name.toLowerCase().includes(query.toLowerCase());

  const onSelect = (index: number) => {
    setValue(schoolDistricts[index].name);
  };

  const onChangeText = (query: any) => {
    setValue(query);
    setData(schoolDistricts.filter(item => filter(item, query)));
  };

  const renderOption = (item: any, index: number) => (
    <AutocompleteItem key={index} title={item.name} />
  );

  const schoolDistrictListItem = ({ item }: any) => (
    <Button style={{ marginTop: 5, width: '100%', paddingVertical: 25 }}>{item.name}</Button>
  );

  return (
    <DefaultLayout>
      <Text category="h1" style={{ marginTop: 20 }}>
        Select School District
      </Text>
      <Text category="s1">Type in the name of the school district that you wish to join</Text>

      <Autocomplete
        style={{ width: '100%', marginTop: 50 }}
        placeholder="Type your school district name..."
        value={value}
        onSelect={onSelect}
        onChangeText={onChangeText}
      />

      <FlatList
        style={{ width: '100%' }}
        data={data}
        renderItem={schoolDistrictListItem}
        keyExtractor={item => String(item.id)}
      />
    </DefaultLayout>
  );
};

export default SchoolDistrictStep;
