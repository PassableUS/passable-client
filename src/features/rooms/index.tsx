import React from 'react';
import { Text, Spinner } from '@ui-kitten/components';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { auth, db } from '../../app/AppAuthentication';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData, useCollectionData, useCollection } from 'react-firebase-hooks/firestore';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { Room, Pass } from '../../types/school';
import FancyInput from '../../components/FancyInput';
import RoundedButton from '../../components/RoundedButton';
import PassList from '../../components/PassList';
import CapacityChecker from '../home/screens/CreatePassScreen/CapacityChecker';

const RoomDetails = ({ room }: { room: firebase.firestore.DocumentSnapshot<Room> }) => {
  const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);
  const [currentTime, _] = React.useState(new Date());

  const [activeRoomPasses, loading, error] = useCollectionData<Pass>(
    db
      .doc(schoolPath)
      .collection('passes')
      .where('toLocation', '==', room.ref)
      .limit(15),
    { idField: 'uid' }
  );

  return (
    <View>
      {/* TODO: Optimization here: fetch Pass data once, then allow both of the following components to grab it */}
      <CapacityChecker selectedRoom={room} />
      {activeRoomPasses && (
        <>
          <Text style={{ marginTop: 20 }} category="h6">
            Room History
          </Text>
          <PassList passesData={activeRoomPasses} flatCard displayDateInsteadOfTime />
        </>
      )}
    </View>
  );
};

const RoomPreview = ({ room }: { room: firebase.firestore.DocumentSnapshot<Room> }) => {
  const [viewDetails, setViewDetails] = React.useState(false);
  const roomData = room.data();

  return (
    <View
      style={{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        borderColor: '#dadce0',
        borderWidth: 1,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          maxHeight: 50,
          minHeight: 50,
        }}>
        <View style={{ flex: 2 }}>
          <Text category="h5">{roomData.displayName}</Text>
          <Text category="s1">{roomData.category}</Text>
        </View>
        <RoundedButton
          title="View Details"
          onPress={() => setViewDetails(currentValue => !currentValue)}
          size="sm"
          style={{ borderRadius: 10, flex: 1 }}
          backgroundColor="#007bff"
        />
      </View>

      {viewDetails && <RoomDetails room={room} />}
    </View>
  );
};

const RoomScreen = () => {
  const schoolPath = useSelector((state: RootState) => state.setup.school.documentPath);
  const [schoolRooms, schoolRoomsLoading, schoolRoomsError] = useCollection(
    db.doc(schoolPath).collection('rooms')
  );

  if (schoolRoomsLoading) {
    return (
      <View>
        <Spinner />
        <Text>Loading room data...</Text>
      </View>
    );
  }

  return (
    <DefaultLayout scrollable>
      <Text category="h1" style={{ marginTop: 30, marginBottom: 20 }}>
        Rooms
      </Text>
      <FancyInput placeholder="Search for a room" />

      <View style={{ marginTop: 15 }}>
        {schoolRooms.docs.map((room: firebase.firestore.DocumentSnapshot<Room>) => (
          <RoomPreview key={room.id} room={room} />
        ))}
      </View>
    </DefaultLayout>
  );
};

export default RoomScreen;
