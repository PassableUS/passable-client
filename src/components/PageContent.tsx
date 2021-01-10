import React, { ReactNode } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

interface DefaultLayoutProps {
  children: ReactNode;
  scrollable?: boolean;
  backgroundColor?: string;
  childrenStyle?: any;
  pageContentWidth: string | number;
}

const PageContent = ({
  children,
  scrollable = false,
  backgroundColor = '#FFF',
  childrenStyle,
  pageContentWidth = '90%',
}: DefaultLayoutProps) =>
  scrollable ? (
    <ScrollView
      style={{
        width: '100%',
        flex: 1,
        backgroundColor: backgroundColor,
      }}>
      <Layout
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // paddingHorizontal: 20,
        }}>
        <SafeAreaView style={{ width: pageContentWidth, height: '100%' }}>
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
        backgroundColor: backgroundColor,
        // paddingHorizontal: 20,
      }}>
      <SafeAreaView style={{ width: pageContentWidth, height: '100%' }}>
        <KeyboardAvoidingView
          style={{ height: '100%', width: '100%' }}
          behavior={Platform.select({ ios: 'padding', android: null })}>
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Layout>
  );

export default PageContent;
