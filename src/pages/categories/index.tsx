import React, { useState, useEffect, useCallback } from 'react';
import { Card, Table, Link, Button, Input } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import './mock';
import styles from './style/popular-contents.module.less';
import { getCategories } from '@/api/categories';
function PopularContent() {
  const t = useLocale(locale);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCategories(page);
      setData(data.list);
      setTotal(data.total);
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
      dataIndex: 'categories',
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
      render: () => {
        return (
          <div>
            <Link>查看</Link>
            <Link>编辑</Link>
            <Link status="error">删除</Link>
          </div>
        );
      },
    },
  ];
  return (
    <Card>
      <div className={styles['category_searchbar']}>
        <div>
          <Button type="primary">{t['categories.addCategory']}</Button>
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
        pagination={{ total, current: page, pageSize: 10, simple: true }}
      />
    </Card>
  );
}

export default PopularContent;
