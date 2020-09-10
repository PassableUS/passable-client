import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../../components/FirebaseAuthenticator';
import { Spinner, Text } from '@ui-kitten/components';
import { View, ScrollView, TouchableOpacity } from 'react-native';

interface SpecificRoomSelectorProps {
  category: any;
  setSelectedRoom: any;
  setStep: any;
}

const SpecificRoomSelector = ({
  category,
  setSelectedRoom,
  setStep,
}: SpecificRoomSelectorProps) => {
  const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);

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
          <TouchableOpacity
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
          </TouchableOpacity>
          {matchingRoomsCollection.docs.map(room => (
            <TouchableOpacity
              key={room.data().displayName}
              onPress={() => {
                setSelectedRoom({ ref: room.ref, ...room.data() });

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
                  {room.data().displayName}
                </Text>
              </>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default SpecificRoomSelector;
