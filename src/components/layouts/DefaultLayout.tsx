import React, { ReactNode } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Layout } from '@ui-kitten/components';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <SafeAreaView>
    <KeyboardAvoidingView
      style={{ height: '100%' }}
      behavior={Platform.select({ ios: 'padding', android: null })}>
      <Layout
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        {children}
      </Layout>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

export default DefaultLayout;
