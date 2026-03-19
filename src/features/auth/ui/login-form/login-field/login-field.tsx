import type { LoginFormValues } from '@/features/auth/model/useLoginValidationSchema';
import { Flex, Form, Input } from 'antd';
import { Controller, type Control, type FieldError } from 'react-hook-form';

import styles from './login-field.module.scss';

interface LoginFieldProps {
  label: string;
  name: 'username' | 'password';
  placeholder: string;
  prefix: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?:
    | boolean
    | {
        clearIcon?: React.ReactNode;
      }
    | undefined;
  error: FieldError | undefined;
  control: Control<LoginFormValues>;
}

export const LoginField = ({
  control,
  error,
  name,
  placeholder,
  allowClear,
  prefix,
  suffix,
}: LoginFieldProps) => {
  return (
    <Flex vertical className={styles.inputGroup}>
      <label htmlFor={name} className={styles.label}>
        Логин
      </label>
      <Form.Item
        className={styles.formItem}
        validateStatus={error ? 'error' : ''}
        help={error?.message || undefined}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input
              size="large"
              placeholder={placeholder}
              className={styles.input}
              allowClear={allowClear}
              autoComplete="autocomplete"
              prefix={prefix}
              suffix={suffix}
              {...field}
            />
          )}
        />
      </Form.Item>
    </Flex>
  );
};
