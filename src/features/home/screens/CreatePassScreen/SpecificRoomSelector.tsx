import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/rootReducer';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Spinner, Text } from '@ui-kitten/components';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { RoomCategory } from '../../../../types/school';
import { LinearGradient } from 'expo-linear-gradient';
import { adjustColor } from '../../../../utils/colors';
import { db } from '../../../../app/AppAuthentication';

interface SpecificRoomSelectorProps {
  category: RoomCategory;
  setSelectedRoom: any;
  setStep: any;
}

const SpecificRoomSelector = ({
  category,
  setSelectedRoom,
  setStep,
}: SpecificRoomSelectorProps) => {
  const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);
  const role = useSelector((state: RootState) => state.setup.role);

  const [
    matchingRoomsCollection,
    isMatchingRoomsCollectionLoading,
    matchingRoomsCollectionError,
  ] = useCollection(
    db
      .doc(schoolPath)
      .collection('rooms')
      .where('category', '==', category.categorySpecifier)
      .limit(20)
  );

  if (matchingRoomsCollectionError) {
    return <Text>{matchingRoomsCollectionError.message}</Text>;
  }

  if (isMatchingRoomsCollectionLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Text category="h1" style={{ marginBottom: 10 }}>
        Select a room
      </Text>
      <ScrollView>
        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {/* <TouchableOpacity
            onPress={() => {
              setSelectedRoom({
                ref: null,
                category: category.categorySpecifier,
                displayName: 'General Location',
              });

              setStep('selectTime');
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
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  fontFamily: 'Inter_800ExtraBold',
                  fontSize: 20,
                  textAlign: 'center',
                  flexWrap: 'wrap',
                }}>
                General Location
              </Text>
            </>
          </TouchableOpacity> */}
          {matchingRoomsCollection.docs.map(room => (
            <TouchableOpacity
              key={room.data().displayName}
              onPress={() => {
                setSelectedRoom(room);

                if (category.studentsRequireApproval && role == 'student') {
                  setStep('selectApprover');
                } else {
                  setStep('selectTime');
                }
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
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '600',
                    fontFamily: 'Inter_800ExtraBold',
                    fontSize: 20,
                    textAlign: 'center',
                    flexWrap: 'wrap',
                  }}>
                  {room.data().displayName}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default SpecificRoomSelector;
