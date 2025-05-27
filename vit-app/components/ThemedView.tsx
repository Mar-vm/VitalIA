import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../hooks/useTheme';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export const ThemedView = ({ children, style }: Props) => {
  const { colors } = useTheme();

  return (
    <View style={[{ flex: 1, backgroundColor: colors.background }, style]}>
      {children}
    </View>
  );
};
