import React from 'react';
import { Pass } from '../features/main/StudentInfoScreen';
import { firestore } from 'firebase';
import PassCard from './PassCard';
import { FlatList, ScrollView, View } from 'react-native';

const PassList = ({
  passesData,
  displayTeacher,
}: {
  passesData: firebase.firestore.DocumentData[];
  displayTeacher: boolean;
}) => {
  // const ListPassCard = ({ item, index, onPress, style }: any) => (
  //   <PassCard
  //   unmountPass
  //     passInfo={{ passColor: '#00BFFF', ...item }}
  //     style={{
  //       flex: 1,
  //       marginLeft: index % 2 !== 0 ? 10 : null,
  //     }}
  //   />
  // );

  return (
    <>
      {/* <FlatList
        style={{ flexDirection: 'row', display: 'flex' }}
        data={passesData}
        renderItem={ListPassCard}
        keyExtractor={(item, index) => item.id}
        numColumns={2}
      /> */}

      <ScrollView>
        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {passesData.map((pass, index) => {
            return (
              <PassCard
                displayTeacher={displayTeacher}
                key={pass.uid}
                //@ts-ignore
                passInfo={{ passColor: '#00BFFF', ...pass }}
                style={{
                  flex: 1,
                  minWidth: 150,
                  margin: 5,
                }}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default PassList;
