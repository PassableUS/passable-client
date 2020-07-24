import {
  View,
  Alert,
  Modal,
  TouchableHighlight,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  FlatList,
  Platform,
} from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React, { useState } from 'react';
import Header from '../../components/Header';
import FancyInput from '../../components/FancyInput';
import FancyButton from '../../components/FancyButton';
import spacing from '../../theme/spacing';
import { useDispatch } from 'react-redux';
import { setupFullName, setupUsername, setupSchool, School } from './setupSlice';
import setupAPI from './setupAPI';
import { AppDispatch } from '../../app/store';
import colors from '../../theme/colors';
import BackButton from '../../components/BackButton';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { SchoolSetupScreenNavigationProp } from '../../navigation/AuthNavigation';

interface SchoolStepProps {
  navigation: SchoolSetupScreenNavigationProp;
}

const SchoolStep: React.FC<SchoolStepProps> = ({ navigation }: SchoolStepProps) => {
  const dispatch: AppDispatch = useDispatch();

  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [schools, setSchools] = useState<School[]>();
  const [schoolModalVisible, setSchoolModalVisible] = useState(false);
  const [schoolInput, setSchoolInput] = useState<string>();

  const handleSchoolSearch = async (schoolName: string) => {
    setIsSearchLoading(true);
    try {
      const schoolSearchResults = await setupAPI.searchSchools(schoolName);
      setSchools(schoolSearchResults);
    } catch (e) {
      alert(e);
    }
    setIsSearchLoading(false);
  };

  const SchoolListItem = ({ school }: { school: School }) => {
    const toTitleCase = (str: string) =>
      str.replace(/\w\S*/g, (txt: string) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });

    const schoolLevelConverter = (level: number) => {
      switch (level) {
        case 1:
          return 'Elementary School';
        case 2:
          return 'Middle School';
        case 3:
          return 'High School';
        case 4:
          return 'Post-Secondary School';
        default:
          return `Unknown School Type: ${level}`;
      }
    };

    const schoolName = toTitleCase(school.name);
    const schoolAddress = toTitleCase(school.address);
    const schoolCity = toTitleCase(school.city);
    const schoolType = schoolLevelConverter(school.level);

    return (
      <TouchableHighlight
        underlayColor={colors.primaryColorLight}
        onPress={() => {
          dispatch(setupSchool(school));
          navigation.navigate('PictureSetup');
        }}
        style={{
          marginTop: 8,
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderRadius: 15,
          minHeight: 80,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: colors.backgroundDifferentiator,
        }}>
        <>
          <Ionicons size={24} name="md-school" style={{ marginHorizontal: 15 }} />
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: colors.lightContrastText }}>
              {schoolType}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{schoolName}</Text>
            <Text style={{ color: colors.lightContrastText }}>
              {schoolAddress} {schoolCity}, {school.state}
            </Text>
          </View>
        </>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.contrastText, alignItems: 'center' }}>
      <KeyboardAvoidingView
        style={{
          width: '85%',
          height: '100%',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
        }}
        behavior={Platform.select({ ios: 'padding', android: null })}>
        <BackButton />

        <Header
          emoji="school"
          title="let's find ur friends"
          subtitle="we'll find people that u might know at ur school"
        />

        <FancyInput
          placeholder="type in your school's name"
          onChangeText={schoolName => {
            handleSchoolSearch(schoolName);
            setSchoolInput(schoolName);
          }}
        />

        {isSearchLoading ? <ActivityIndicator style={{ padding: 10 }} /> : null}

        {// If no schools are returned and there is a search query, return the no matches found component
        schools?.length === 0 && schoolInput ? (
          <View>
            <Text>No Schools Found</Text>
          </View>
        ) : (
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={schools}
            renderItem={({ item }) => <SchoolListItem school={item} />}
            keyExtractor={school => school._id}
          />
        )}

        {/* <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10 }}>
          <FancyButton loading={isLoading} onPress={handleSubmit} text="next" />
        </View> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SchoolStep;
