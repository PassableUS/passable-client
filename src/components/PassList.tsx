import React from 'react';
import { Pass } from '../features/main/StudentInfoScreen';
import { firestore } from 'firebase';
import PassCard from './PassCard';
import { FlatList, ScrollView, View } from 'react-native';

const PassList = ({
  passesData,
  setUserPasses,
}: {
  passesData: firebase.firestore.DocumentData[];
  setUserPasses: any;
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
                key={pass.uid}
                //@ts-ignore
                passInfo={{ passColor: '#00BFFF', ...pass }}
                unmountPass={() => setUserPasses(passesData.filter(p => p.uid !== pass.uid))}
                style={{
                  marginTop: 10,
                  flex: 1,
                  minWidth: 150,
                  marginLeft: index % 2 !== 0 ? 10 : null,
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
