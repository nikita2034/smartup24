import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface DeliveryInfo {
  fullName: string;
  address: string;
  // Другие поля доставки
}

interface DeliveryModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: DeliveryInfo) => void;
}

const DeliveryModal: React.FC<DeliveryModalProps> = ({ visible, onClose, onSave }) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values: DeliveryInfo) => {
        onSave(values);
        form.resetFields();
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
  };

  return (
    <Modal
      visible={visible}
      title="Введите информацию о доставке"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Отмена
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Сохранить
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item
          name="fullName"
          label="ФИО"
          rules={[{ required: true, message: 'Пожалуйста, введите ФИО' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Адрес"
          rules={[{ required: true, message: 'Пожалуйста, введите адрес' }]}
        >
          <Input />
        </Form.Item>
        {/* Другие поля информации о доставке */}
      </Form>
    </Modal>
  );
};

export default DeliveryModal;