import React, { useState } from 'react';
import { Modal, Form, Input, Message } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import { editCategoriey } from '@/api/categories';
export default function EditModal(props: any) {
  const FormItem = Form.Item;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { visible, onCancel, id, onFetchData } = props;
  const t = useLocale(locale);
  const onOk = async () => {
    try {
      await form.validate();
      setConfirmLoading(true);
      const res = await editCategoriey(id, form.getFieldValue('category'));
      if (res.code != 0) throw new Error('修改文章类型出错，请重试');
      onFetchData();
      Message.success('修改成功！');
    } catch (err) {
      Message.warning('修改失败，请重试！');
    } finally {
      setConfirmLoading(false);
      onCancel();
    }
  };
  return (
    <Modal
      title={t['categories.editCategory']}
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
