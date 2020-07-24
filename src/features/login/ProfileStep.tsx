import { View, Alert, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React, { useState } from 'react';
import Header from '../../components/Header';
import FancyInput from '../../components/FancyInput';
import FancyButton from '../../components/FancyButton';
import spacing from '../../theme/spacing';
import { useDispatch } from 'react-redux';
import { setupFullName, setupUsername } from './setupSlice';
import { AppDispatch } from '../../app/store';
import colors from '../../theme/colors';
import BackButton from '../../components/BackButton';
import { ProfileSetupScreenNavigationProp } from '../../navigation/AuthNavigation';

interface ProfileStepProps {
  navigation: ProfileSetupScreenNavigationProp;
}

const ProfileStep: React.FC<ProfileStepProps> = ({ navigation }: ProfileStepProps) => {
  const dispatch: AppDispatch = useDispatch();

  const [name, setName] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    // Validation
    if (!name || !username) {
      alert('Please enter a value');
      return;
    }

    setIsLoading(true);

    try {
      dispatch(setupFullName(name));
      dispatch(setupUsername(username));
    } catch (e) {
      Alert.alert(JSON.stringify(e));
    }

    setIsLoading(false);
    navigation.navigate('SchoolSetup');
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.contrastText, alignItems: 'center' }}>
      <KeyboardAvoidingView
        style={{
          width: '80%',
          height: '100%',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
        }}
        behavior={Platform.select({ ios: 'padding', android: null })}>
        <BackButton />
        <Header
          title="who are you?"
          subtitle="let's get a few things down so people know who you are"
        />

        <FancyInput
          label="full name"
          placeholder="enter in ur full name"
          value={name}
          onChangeText={name => setName(name)}
          maxLength={50}
        />

        <FancyInput
          style={{ marginTop: spacing.largeInputSpacing }}
          label="username"
          placeholder="pick a username"
          value={username}
          onChangeText={username => setUsername(username)}
          maxLength={50}
        />

        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10 }}>
          <FancyButton loading={isLoading} onPress={handleSubmit} text="next" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileStep;
