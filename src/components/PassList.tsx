import React from 'react';
import { firestore } from 'firebase';
import PassCard from './PassCard';
import { Text } from '@ui-kitten/components';
import { FlatList, ScrollView, View, Platform } from 'react-native';
import LottieView from 'lottie-react-native';
import { Pass } from '../types/school';

const PassList = ({
  passesData,
  displayIssuer,
  displayDateInsteadOfTime,
  scrollable = false,
}: {
  passesData: firebase.firestore.DocumentData[];
  displayIssuer?: boolean;
  displayDateInsteadOfTime?: boolean;
  scrollable?: boolean;
}) => {
  const [timerDependentPassesData, setTimerDependentPassesData] = React.useState(passesData);

  // const handlePassExpire = (expiredPass: Pass) => {
  //   setTimerDependentPassesData(timerDependentPassesData =>
  //     timerDependentPassesData.filter(pass => pass !== expiredPass)
  //   );
  // };

  return (
    <>
      {passesData.length === 0 ? (
        <View
          style={{
            width: 350,
            minHeight: 125,
            maxHeight: 125,
            borderColor: 'gray',
            borderWidth: 2,
            padding: 20,
            borderRadius: 10,
            borderStyle: 'dashed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* {Platform.OS !== 'web' && (
            <LottieView
              autoPlay
              loop
              speed={0.5}
              style={{
                width: 300,
              }}
              source={require('../assets/passDisplay.json')}
            />
          )} */}
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}>
            You do not have any passes dispatched. Active passes you create will appear here.
          </Text>
        </View>
      ) : (
        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {passesData.map((pass, index) => {
            return (
              <PassCard
                // handlePassExpire={handlePassExpire}
                displayIssuer={displayIssuer}
                displayDateInsteadOfTime={displayDateInsteadOfTime}
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
      )}
    </>
  );
};

export default PassList;
