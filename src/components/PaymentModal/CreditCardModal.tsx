import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface CreditCardInfo {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
}

interface CreditCardModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: CreditCardInfo) => void;
}

const CreditCardModal: React.FC<CreditCardModalProps> = ({ visible, onClose, onSave }) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values: CreditCardInfo) => {
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
      title="Введите информацию о кредитной карте"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Отмена
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Сохранить
        </Button>,
      ]}
      centered
    >
      <Form form={form}>
        <Form.Item
          name="cardNumber"
          label="Номер карты"
          rules={[{ required: true, message: 'Пожалуйста, введите номер карты' }]}
        >
          <Input maxLength={16} />
        </Form.Item>
        <Form.Item
          name="cardHolder"
          label="Владелец карты"
          rules={[{ required: true, message: 'Пожалуйста, введите имя владельца карты' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="expirationDate"
          label="Срок действия"
          rules={[{ required: true, message: 'Пожалуйста, введите срок действия карты' }]}
        >
          <Input placeholder="MM/YYYY" maxLength={7} />
        </Form.Item>
        <Form.Item
          name="cvv"
          label="CVV"
          rules={[{ required: true, message: 'Пожалуйста, введите CVV' }]}
        >
          <Input maxLength={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreditCardModal;
