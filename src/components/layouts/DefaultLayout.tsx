import React, { ReactNode } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

interface DefaultLayoutProps {
  children: ReactNode;
  scrollable?: boolean;
}

const DefaultLayout = ({ children, scrollable = false }: DefaultLayoutProps) =>
  scrollable ? (
    <ScrollView
      style={{
        width: '100%',
        flex: 1,
        backgroundColor: '#FFF',
      }}>
      <Layout
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 50,
          // paddingHorizontal: 20,
        }}>
        <SafeAreaView style={{ width: '90%', height: '100%' }}>
          <KeyboardAvoidingView
            style={{ height: '100%', width: '100%' }}
            behavior={Platform.select({ ios: 'padding', android: null })}>
            {children}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Layout>
    </ScrollView>
  ) : (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        // paddingHorizontal: 20,
      }}>
      <SafeAreaView style={{ width: '90%', height: '100%' }}>
        <KeyboardAvoidingView
          style={{ height: '100%', width: '100%' }}
          behavior={Platform.select({ ios: 'padding', android: null })}>
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Layout>
  );

export default DefaultLayout;
