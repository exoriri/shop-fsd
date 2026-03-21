import { Button, Flex, Form, Modal, notification } from 'antd';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  ADD_PRODUCT_DEFAULT_VALUES,
  addProductSchema,
  type AddProductValues,
} from '../../model/addProductSchema';
import { Field } from '@/shared/ui/Field';

import CrossIcon from 'icons/cross-icon.svg?react';

import styles from './add-product-modal.module.scss';

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

interface FieldProps {
  name: keyof AddProductValues;
  placeholder: string;
  label: string;
  error: string | undefined;
}

export const AddProductModal = ({ open, onClose }: AddProductModalProps) => {
  const {
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm<AddProductValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: ADD_PRODUCT_DEFAULT_VALUES,
  });

  const handleAdd = () => {
    handleSubmit(() => {
      reset();
      onClose();
      notification.success({
        message: 'Продукт успешно добавлен',
      });
    })();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const fields: FieldProps[] = [
    {
      name: 'name',
      label: 'Название',
      placeholder: 'Введите название',
      error: errors.name?.message,
    },
    {
      name: 'vendor',
      label: 'Вендор',
      placeholder: 'Введите вендора',
      error: errors.vendor?.message,
    },
    {
      name: 'sku',
      label: 'Артикул',
      placeholder: 'Введите артикул',
      error: errors.vendor?.message,
    },
    {
      name: 'rating',
      label: 'Рейтинг',
      placeholder: 'Введите рейтинг',
      error: errors.rating?.message,
    },
    {
      name: 'price',
      label: 'Цена',
      placeholder: 'Введите цену',
      error: errors.price?.message,
    },
  ];

  const footer: React.ReactNode = (
    <>
      <Button className={styles.footerButton} onClick={handleClose}>
        Отмена
      </Button>
      <Button
        className={styles.footerButton}
        type="primary"
        onClick={handleAdd}
      >
        Добавить
      </Button>
    </>
  );
  return (
    <Modal
      footer={footer}
      centered
      closeIcon={false}
      mask={{ enabled: true, blur: true }}
      open={open}
      onCancel={handleClose}
    >
      <Flex
        className={styles.modalHeader}
        justify="space-between"
        align="center"
      >
        <h3 className={styles.title}>Новый продукт</h3>
        <Button onClick={handleClose} className={styles.closeButton}>
          <CrossIcon width={16} height={16} />
        </Button>
      </Flex>
      <Form>
        <Flex gap={10} vertical>
          {fields.map((fieldProps) => (
            <Field<AddProductValues>
              allowClear={{
                clearIcon: <CrossIcon />,
              }}
              control={control}
              {...fieldProps}
            />
          ))}
        </Flex>
      </Form>
    </Modal>
  );
};
