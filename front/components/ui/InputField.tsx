import { forwardRef } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, fontFamilies } from '../../constants/theme';

type InputFieldProps = TextInputProps & {
  label: string;
  helperText?: string;
  error?: string;
  className?: string;
};

export const InputField = forwardRef<TextInput, InputFieldProps>(
  ({ label, helperText, error, className, ...rest }, ref) => {
    const hint = error ?? helperText;
    const hintColor = error ? 'text-danger' : 'text-neutral-500';

    return (
      <View className={className}>
        <Text
          className="text-xs"
          style={{ fontFamily: fontFamilies.interSemiBold, color: colors.primaryText }}
        >
          {label}
        </Text>
        <TextInput
          ref={ref}
          className="mt-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm"
          style={{ fontFamily: fontFamilies.interRegular, color: colors.primaryText }}
          placeholderTextColor={colors.placeholderColor}
          {...rest}
        />
        {hint ? <Text className={`mt-1 text-xs ${hintColor}`}>{hint}</Text> : null}
      </View>
    );
  }
);

InputField.displayName = 'InputField';
