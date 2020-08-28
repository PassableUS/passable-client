import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { RoomCategory } from '../CreatePassScreen';
import { Text } from '@ui-kitten/components';
import Icon from 'react-native-dynamic-vector-icons';
import SpecificRoomSelector from './SpecificRoomSelector';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';

interface CategorySelectorProps {
  setSelectedCategory: any;
  setStep: any;
}

const CategorySelector = ({ setSelectedCategory, setStep }: CategorySelectorProps) => {
  const schoolRoomCategories = useSelector((state: RootState) => state.setup.school.roomCategories);

  return (
    <>
      <Text category="h1" style={{ marginBottom: 10 }}>
        Select a category
      </Text>
      <ScrollView>
        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {schoolRoomCategories.map((category: RoomCategory) => (
            <TouchableOpacity
              key={category.categorySpecifier}
              onPress={() => {
                setSelectedCategory(category);
                setStep('selectRoom');
              }}
              style={{
                flex: 1,
                backgroundColor: category.color || '#FC6',
                borderRadius: 10,
                padding: 15,
                alignContent: 'center',
                justifyContent: 'center',
                display: 'flex',
                minWidth: 125,
                height: 150,
                margin: 5,
              }}>
              <>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Icon
                    name={category.iconName}
                    type={category.iconGroup}
                    size={35}
                    color="white"
                  />
                </View>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '600',
                    fontFamily: 'Inter_800ExtraBold',
                    fontSize: 20,
                    textAlign: 'center',
                    flexWrap: 'wrap',
                  }}>
                  {category.displayName}
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: '600',
                    fontFamily: 'Inter_800ExtraBold',
                    fontSize: 20,
                    textAlign: 'center',
                    flexWrap: 'wrap',
                  }}>
                  {category.studentsRequireApproval && 'Requires Approval'}
                </Text>
              </>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default CategorySelector;
