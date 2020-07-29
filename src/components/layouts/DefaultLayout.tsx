import React, { ReactNode } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Layout } from '@ui-kitten/components';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <Layout
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50,
      // paddingHorizontal: 20,
    }}>
    <SafeAreaView style={{ width: '80%', height: '100%' }}>
      <KeyboardAvoidingView
        style={{ height: '100%', width: '100%' }}
        behavior={Platform.select({ ios: 'padding', android: null })}>
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  </Layout>
);

export default DefaultLayout;
