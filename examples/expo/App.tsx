import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Skeleton, SkeletonGroup, LoadingButton, Overlay, ProgressBar } from 'veilkit/native';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Veilkit + Expo / React Native</Text>
        <Text style={styles.subtitle}>Works in Expo Go with automatic gradient fallback</Text>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.btn} onPress={() => setLoading(!loading)}>
            <Text style={styles.btnText}>Toggle Loading</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => setOverlayVisible(!overlayVisible)}>
            <Text style={styles.btnText}>Toggle Overlay</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeader}>1. Skeleton Card</Text>
        <SkeletonGroup style={styles.card}>
          <Skeleton height={140} radius={8} theme="auto" />
          <View style={{ height: 12 }} />
          <Skeleton height={22} width="70%" radius={4} />
          <View style={{ height: 8 }} />
          <Skeleton height={14} width="90%" radius={4} />
          <View style={{ height: 6 }} />
          <Skeleton height={14} width="50%" radius={4} />
        </SkeletonGroup>

        <Text style={styles.sectionHeader}>2. Loading Button & Progress</Text>
        <LoadingButton
          loading={btnLoading}
          title="Save Profile"
          onPress={() => {
            setBtnLoading(true);
            setTimeout(() => setBtnLoading(false), 2000);
          }}
        />

        <View style={{ height: 16 }} />
        <ProgressBar progress={0.65} color="#10b981" />
      </ScrollView>

      <Overlay visible={overlayVisible} message="Syncing with cloud…" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scroll: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
});
