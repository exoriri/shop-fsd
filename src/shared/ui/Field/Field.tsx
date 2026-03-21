import { Flex, Form, Input } from 'antd';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import styles from './Field.module.scss';

interface FieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  placeholder: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  autoComplete?: string;
  allowClear?:
    | boolean
    | {
        clearIcon?: React.ReactNode;
      }
    | undefined;
  error: string | undefined;
  control: Control<T>;
  type?: string;
}

export const Field = <T extends FieldValues>({
  control,
  error,
  name,
  placeholder,
  allowClear,
  label,
  prefix,
  suffix,
  ...restProps
}: FieldProps<T>) => {
  return (
    <Flex vertical className={styles.inputGroup}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <Form.Item
        className={styles.formItem}
        validateStatus={error ? 'error' : ''}
        help={error || undefined}
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
              {...restProps}
              {...field}
            />
          )}
        />
      </Form.Item>
    </Flex>
  );
};
