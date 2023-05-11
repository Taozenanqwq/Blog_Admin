import React, { useState } from 'react';
import { Modal, Form, Input } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import { addCategoriey } from '@/api/categories';
export default function AddModal(props: any) {
  const FormItem = Form.Item;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { visible, onCancel, onTotalChange } = props;
  const t = useLocale(locale);

  const onOk = async () => {
    try {
      await form.validate();
      setConfirmLoading(true);
      const res = await addCategoriey(form.getFieldValue('category'));
      if (res.code != 0) throw new Error('添加类型出错，请重试');
      onTotalChange(res.total);
    } catch (err) {
      console.log(err.message);
    } finally {
      setConfirmLoading(false);
      onCancel();
    }
  };
  return (
    <Modal
      title={t['categories.addCategory']}
      visible={visible}
      onOk={onOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      <Form
        form={form}
        labelCol={{
          style: { flexBasis: 100 },
        }}
        wrapperCol={{
          style: { flexBasis: 'calc(100% - 100px)' },
        }}
      >
        <FormItem
          label={t['categories.modal.field']}
          field="category"
          rules={[{ required: true }]}
        >
          <Input placeholder={t['categories.modal.placeholder']} />
        </FormItem>
      </Form>
    </Modal>
  );
}
