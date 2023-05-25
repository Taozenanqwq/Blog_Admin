import React, { useContext } from 'react';
import { Card, Link, Button, Space } from '@arco-design/web-react';
import { IconClockCircle } from '@arco-design/web-react/icon';
import styles from './index.module.less';
import { collapseContext } from '@/layout';
export default function Save(props) {
  const { lastModifiedTime, onRefresh, onSave } = props;

  const message = lastModifiedTime
    ? `上次保存时间：${lastModifiedTime}`
    : `暂无操作`;
  const isCollapsed = useContext(collapseContext);
  const left = isCollapsed ? '48px' : '220px';
  return (
    <Card
      className={styles.bottom}
      style={{ width: `calc(100% - ${left})` }}
      bodyStyle={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Link icon={<IconClockCircle fontSize={18} />}>{message}</Link>
      <div className="operations">
        <Space size="large">
          <Button type="primary" onClick={onRefresh}>
            刷新
          </Button>
          <Button type="secondary" onClick={onSave}>
            保存
          </Button>
        </Space>
      </div>
    </Card>
  );
}
