import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Table,
  Link,
  Button,
  Input,
  Message,
  Popconfirm,
} from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import './mock';
import styles from './style/popular-contents.module.less';
import { getCategories, delCategoriey } from '@/api/categories';
import AddModal from './add-modal';
import EditModal from './edit-modal';
function PopularContent() {
  // states
  const t = useLocale(locale);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [curEditId, setCurEditId] = useState();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getCategories(page);
      setData(res.list);
      setTotal(res.total);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [page, fetchData]);

  const columns = [
    {
      title: t['categories.name'],
      dataIndex: 'category',
    },
    {
      title: t['categories.articleCount'],
      dataIndex: 'count',
    },
    {
      title: t['categories.createdAt'],
      dataIndex: 'createdAt',
    },
    {
      title: t['categories.modifiedAt'],
      dataIndex: 'modifiedAt',
    },
    {
      title: t['categories.operations'],
      dataIndex: 'operations',
      render: (col, item, idx) => {
        return (
          <div>
            <Link>查看</Link>
            <Link
              onClick={async () => {
                setCurEditId(item._id);
                setEditVisible(true);
              }}
            >
              编辑
            </Link>

            <Popconfirm
              focusLock
              title={t['categories.delete.pop.title']}
              content={t['categories.delete.pop']}
              onOk={async () => {
                try {
                  const { total } = await delCategoriey(item._id);
                  if (total % pageSize == 0 && page == total / pageSize + 1)
                    setPage((prePage) => prePage - 1);
                  await fetchData();
                  Message.success('删除成功！');
                } catch (err) {
                  Message.error('删除失败，请重试！');
                }
              }}
            >
              <Link status="error">删除</Link>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <Card>
      {/* 添加模态框 */}
      <AddModal
        onCancel={() => setAddVisible(false)}
        visible={addVisible}
        onTotalChange={(total) => {
          setTotal(total);
        }}
      ></AddModal>
      {/* 修改模态框 */}
      <EditModal
        onCancel={() => setEditVisible(false)}
        visible={editVisible}
        id={curEditId}
        onFetchData={() => fetchData()}
      ></EditModal>

      <div className={styles['category_searchbar']}>
        <div>
          <Button type="primary" onClick={() => setAddVisible(true)}>
            {t['categories.addCategory']}
          </Button>
        </div>
        <div>
          <Input
            style={{ width: 250, marginRight: '10px' }}
            allowClear
            placeholder={t['categories.search.placeholder']}
          />
          <Button type="primary">查询</Button>
        </div>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        data={data}
        loading={loading}
        tableLayoutFixed
        onChange={(pagination) => {
          setPage(pagination.current);
        }}
        pagination={{ total, current: page, pageSize, simple: true }}
      />
    </Card>
  );
}

export default PopularContent;
