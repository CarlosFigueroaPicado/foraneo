import { forwardRef } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

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
        <Text className="text-sm font-medium text-neutral-700">{label}</Text>
        <TextInput
          ref={ref}
          className={`mt-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 focus:border-primary`}
          placeholderTextColor="#A3A8B6"
          {...rest}
        />
        {hint ? <Text className={`mt-1 text-xs ${hintColor}`}>{hint}</Text> : null}
      </View>
    );
  }
);

InputField.displayName = 'InputField';
