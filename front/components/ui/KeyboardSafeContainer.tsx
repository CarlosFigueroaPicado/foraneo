import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ViewStyle } from 'react-native';

type KeyboardSafeContainerProps = {
  children: ReactNode;
  style?: ViewStyle;
};

/**
 * A wrapper component that handles keyboard avoidance for iOS and Android platforms.
 * On iOS, uses 'padding' behavior; on Android, the keyboard behavior is handled by the system.
 */
export function KeyboardSafeContainer({ children, style }: KeyboardSafeContainerProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={style || { flex: 1 }}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
