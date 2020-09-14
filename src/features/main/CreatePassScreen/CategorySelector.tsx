import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import Icon from 'react-native-dynamic-vector-icons';
import SpecificRoomSelector from './SpecificRoomSelector';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { RoomCategory } from '../../../types/school';
import { LinearGradient } from 'expo-linear-gradient';
import { adjustColor } from '../../../utils/colors';

interface CategorySelectorProps {
  setSelectedCategory: any;
  setStep: any;
}

const CategorySelector = ({ setSelectedCategory, setStep }: CategorySelectorProps) => {
  const schoolRoomCategories = useSelector((state: RootState) => state.setup.school.roomCategories);

  return (
    <>
      <Text category="h1" style={{ marginBottom: 10 }}>
        Select a Room Category
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
                borderRadius: 10,
                display: 'flex',
                minWidth: 125,
                height: 150,
                margin: 5,
              }}>
              <LinearGradient
                colors={[category.color || '#FC6', adjustColor(category.color || '#FC6', -40)]}
                start={[0.0, 0.5]}
                end={[1.0, 0.5]}
                locations={[0.0, 1.0]}
                style={{
                  backgroundColor: category.color || '#FC6',
                  borderRadius: 10,
                  height: '100%',
                  width: '100%',
                  padding: 15,
                  alignContent: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
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
                {category.studentsRequireApproval && (
                  <View
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      borderRadius: 10,
                      padding: 5,
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 15,
                        textAlign: 'center',
                        flexWrap: 'wrap',
                        color: 'white',
                      }}>
                      Requires Approval
                    </Text>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default CategorySelector;
