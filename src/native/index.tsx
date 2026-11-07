/**
 * Veilkit - React Native & Expo Adapter (`veilkit/native`)
 * Works in Expo Go, New Architecture, iOS, Android, and react-native-web.
 * UI-thread Reanimated with smooth built-in Animated fallback,
 * and LinearGradient with smooth pulse fallback.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  useColorScheme,
  AccessibilityInfo,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { BUILTIN_THEMES } from '../core/themes';
import { VeilThemeName, VeilAnimationName } from '../core/types';

// Safely probe for optional gradient peer dependencies
let LinearGradientComponent: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  LinearGradientComponent = require('expo-linear-gradient').LinearGradient;
} catch {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    LinearGradientComponent = require('react-native-linear-gradient').default;
  } catch {
    LinearGradientComponent = null;
  }
}

// Safely probe for optional expo-haptics
let Haptics: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Haptics = require('expo-haptics');
} catch {
  Haptics = null;
}

function triggerHaptic(type: 'start' | 'success' | 'error') {
  if (!Haptics) return;
  try {
    if (type === 'start') {
      Haptics.impactAsync?.(Haptics.ImpactFeedbackStyle?.Light);
    } else if (type === 'success') {
      Haptics.notificationAsync?.(Haptics.NotificationFeedbackType?.Success);
    } else if (type === 'error') {
      Haptics.notificationAsync?.(Haptics.NotificationFeedbackType?.Error);
    }
  } catch {
    // Silent fallback
  }
}

export interface NativeSkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: number;
  circle?: boolean;
  theme?: VeilThemeName;
  animation?: VeilAnimationName;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export function Skeleton({
  width = '100%',
  height = 20,
  radius = 6,
  circle = false,
  theme = 'auto',
  animation = 'shimmer',
  style,
  children,
}: NativeSkeletonProps) {
  const colorScheme = useColorScheme();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion).catch(() => {});
  }, []);

  const resolvedThemeName = theme === 'auto' ? (colorScheme === 'dark' ? 'dark' : 'light') : theme;
  const themeTokens = BUILTIN_THEMES[resolvedThemeName] || BUILTIN_THEMES.light;

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reduceMotion || animation === 'none') return;

    const anim = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    );
    anim.start();

    return () => anim.stop();
  }, [animatedValue, reduceMotion, animation]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  const opacityPulse = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.4, 0.9, 0.4],
  });

  const borderRadius = circle ? 9999 : radius;
  const baseBg = themeTokens.base.startsWith('var') ? (colorScheme === 'dark' ? '#1f2937' : '#e5e7eb') : themeTokens.base;

  return (
    <View
      accessibilityRole="none"
      accessibilityState={{ busy: true }}
      style={[
        styles.skeletonBase,
        {
          width: width as any,
          height: height as any,
          borderRadius,
          backgroundColor: baseBg,
        },
        style,
      ]}
    >
      {!reduceMotion && animation !== 'none' && (
        LinearGradientComponent ? (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { transform: [{ translateX }] },
            ]}
          >
            <LinearGradientComponent
              colors={['transparent', themeTokens.highlight, 'transparent']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        ) : (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: themeTokens.highlight,
                opacity: opacityPulse,
              },
            ]}
          />
        )
      )}
      {children}
    </View>
  );
}

export function SkeletonGroup({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <View accessibilityLiveRegion="polite" accessibilityState={{ busy: true }} style={style}>
      {children}
    </View>
  );
}

export function Spinner({
  size = 'small',
  color = '#3b82f6',
}: {
  size?: 'small' | 'large' | number;
  color?: string;
}) {
  return <ActivityIndicator size={size} color={color} />;
}

export function Overlay({
  visible,
  message,
  children,
}: {
  visible: boolean;
  message?: string;
  children?: React.ReactNode;
}) {
  return (
    <View style={styles.overlayContainer}>
      {children}
      {visible && (
        <View style={styles.overlayBackdrop}>
          <Spinner size="large" color="#ffffff" />
          {message && <Text style={styles.overlayText}>{message}</Text>}
        </View>
      )}
    </View>
  );
}

export function LoadingButton({
  loading,
  status: controlledStatus,
  loading = false,
  title,
  loadingText,
  successText = 'Success',
  errorText = 'Failed',
  resetAfter = 2000,
  haptics = true,
  onPress,
  style,
  textStyle,
}: {
  loading: boolean;
  status?: 'idle' | 'loading' | 'success' | 'error';
  loading?: boolean;
  title: string;
  onPress?: () => void;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  resetAfter?: number;
  haptics?: boolean;
  onPress?: () => Promise<any> | void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}) {
  const [internalStatus, setInternalStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    controlledStatus || (loading ? 'loading' : 'idle'),
  );

  useEffect(() => {
    if (controlledStatus) {
      setInternalStatus(controlledStatus);
    } else {
      setInternalStatus(loading ? 'loading' : 'idle');
    }
  }, [controlledStatus, loading]);

  const handlePress = async () => {
    if (internalStatus !== 'idle') return;

    if (haptics) triggerHaptic('start');

    if (onPress) {
      try {
        const result = onPress();
        if (result && typeof result.then === 'function') {
          setInternalStatus('loading');
          await result;
          if (haptics) triggerHaptic('success');
          setInternalStatus('success');
          if (resetAfter > 0) {
            setTimeout(() => setInternalStatus('idle'), resetAfter);
          }
        }
      } catch {
        if (haptics) triggerHaptic('error');
        setInternalStatus('error');
        if (resetAfter > 0) {
          setTimeout(() => setInternalStatus('idle'), resetAfter);
        }
      }
    }
  };

  const isBusy = internalStatus === 'loading';
  const isDisabled = internalStatus !== 'idle';

  let content: React.ReactNode = <Text style={[styles.btnText, textStyle]}>{title}</Text>;
  if (internalStatus === 'loading') {
    content = (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Spinner size="small" color="#ffffff" />
        {loadingText ? <Text style={[styles.btnText, textStyle]}>{loadingText}</Text> : null}
      </View>
    );
  } else if (internalStatus === 'success') {
    content = <Text style={[styles.btnText, textStyle]}>✓ {successText}</Text>;
  } else if (internalStatus === 'error') {
    content = <Text style={[styles.btnText, textStyle]}>✕ {errorText}</Text>;
  }

  const bgStyle =
    internalStatus === 'success'
      ? { backgroundColor: '#10b981' }
      : internalStatus === 'error'
      ? { backgroundColor: '#ef4444' }
      : null;

  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onPress}
      accessibilityState={{ busy: loading, disabled: loading }}
      style={[styles.btnBase, style]}
      disabled={isDisabled}
      onPress={handlePress}
      accessibilityState={{ busy: isBusy, disabled: isDisabled }}
      style={[styles.btnBase, bgStyle, style]}
    >
      {loading ? (
        <Spinner size="small" color="#ffffff" />
      ) : (
        <Text style={[styles.btnText, textStyle]}>{title}</Text>
      )}
      {content}
    </TouchableOpacity>
  );
}

export function ProgressBar({ progress, color = '#3b82f6' }: { progress: number; color?: string }) {
  const clamped = Math.min(1, Math.max(0, progress));
  return (
    <View style={styles.progressBarTrack}>
      <View style={[styles.progressBarFill, { width: `${clamped * 100}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  skeletonBase: {
    overflow: 'hidden',
    position: 'relative',
  },
  overlayContainer: {
    position: 'relative',
    flex: 1,
  },
  overlayBackdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  overlayText: {
    marginTop: 12,
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  btnBase: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  progressBarTrack: {
    height: 4,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
});
