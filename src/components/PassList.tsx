import React from 'react';
import { Pass } from '../features/main/StudentInfoScreen';
import { firestore } from 'firebase';
import PassCard from './PassCard';
import { FlatList } from 'react-native';

const PassList = ({ passesData }: { passesData: firebase.firestore.DocumentData[] }) => {
  const ListPassCard = ({ item, onPress, style }: any) => (
    <PassCard passInfo={{ passColor: '#00BFFF', ...item }} />
  );

  return (
    <>
      <FlatList data={passesData} renderItem={ListPassCard} numColumns={2} />
    </>
  );
};

export default PassList;
