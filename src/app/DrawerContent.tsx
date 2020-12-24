import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

import { IndexPath, Text } from '@ui-kitten/components';
import Icon from 'react-native-dynamic-vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from './rootReducer';
import { getCoreScreens } from './AuthenticatedNavConfig';

const DrawerContent = (props: any) => {
  const authProfile = useSelector((state: RootState) => state.auth.profile);

  const signOut = () => alert('Sign out mock');

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Image
            source={{
              uri: 'https://i.pinimg.com/originals/bd/70/22/bd702201a2b6d8960734f60f34a22754.jpg',
            }}
            height={100}
            width={100}
            style={{ height: 100, width: 100, borderRadius: 100 }}
          />
          <View style={{ marginLeft: 15, flexDirection: 'column' }}>
            <Text category="h1">
              {authProfile.firstName} {authProfile.lastName}
            </Text>
            <Text category="s1">Martin County High School</Text>
            <Text category="s2">{JSON.stringify(authProfile.permissions)}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.section}>
            <Text category="p1" style={[styles.paragraph, styles.caption]}>
              23
            </Text>
            <Text category="s1" style={styles.caption}>
              Students
            </Text>
          </View>
          <View style={styles.section}>
            <Text category="p1" style={[styles.paragraph, styles.caption]}>
              5
            </Text>
            <Text category="s1" style={styles.caption}>
              Requests
            </Text>
          </View>
        </View>
      </View>

      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.drawerSection}>
            <DrawerItemList {...props} />
          </View>
          {/* <View title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </View> */}
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon type="Ionicons" name="ios-exit" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;
