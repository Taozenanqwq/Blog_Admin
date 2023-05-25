import React, { useState } from 'react';
import { Card, Grid, Form, Input } from '@arco-design/web-react';
import TagCloud from './components/TagCloud';
import Save from '@/components/Save';
import UploadImage from './components/UploadImage';
import './mock';
import dayjs from 'dayjs';

const Row = Grid.Row;
const Col = Grid.Col;
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const maxTags = 20;

export default function TagsManagment() {
  const formItemStyle = {
    marginBottom: 50,
  };
  const [form] = Form.useForm();
  const [lastModifiedTime, setLastModifiedTime] = useState('');
  const refresh = () => {
    console.log(form.getFieldsValue());
  };

  const save = () => {
    setLastModifiedTime(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  };
  return (
    <div>
      <Card>
        <Form form={form}>
          <Row>
            <Col span={14}>
              <Row>
                <Col span={24}>
                  <FormItem
                    label={`标签云(1-${maxTags}个)`}
                    field="tags"
                    rules={[{ required: true, message: '请添加标签' }]}
                    layout="vertical"
                    style={formItemStyle}
                  >
                    <TagCloud max={maxTags} form={form} />
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="详细介绍"
                    field="desc"
                    rules={[{ required: true, message: '请添加详细信息' }]}
                    layout="vertical"
                    style={formItemStyle}
                  >
                    <TextArea
                      placeholder="请输入详细介绍"
                      style={{ minHeight: 200, width: 500 }}
                      name="desc"
                    />
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="个人简历"
                    rules={[{ required: true }]}
                    layout="vertical"
                    style={formItemStyle}
                  ></FormItem>
                </Col>
              </Row>
            </Col>
            <Col span={10} style={{ height: 600 }}>
              <FormItem
                label="介绍图片(1-3张)"
                field="image"
                rules={[{ required: true, message: '请添加介绍图片' }]}
                layout="vertical"
              >
                <UploadImage max={3} />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <Save
        onRefresh={refresh}
        onSave={save}
        lastModifiedTime={lastModifiedTime}
      ></Save>
    </div>
  );
}
