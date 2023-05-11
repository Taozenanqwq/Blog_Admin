import Mock from 'mockjs';
import qs from 'query-string';
import setupMock from '@/utils/setupMock';
import dayjs from 'dayjs';
setupMock({
  setup: () => {
    let { list } = Mock.mock({
      'list|100': [
        {
          '_id|8': /[a-z][A-Z][-][0-9]/,
          category: () =>
            Mock.Random.pick([
              'java',
              'javascript',
              'rust',
              'vue',
              'react',
              'react-native',
              'vue',
            ]),
          count: '@int(10, 200)',
          createdAt: () => Mock.Random.date('yyyy-MM-dd'),
          modifiedAt: () => Mock.Random.date('yyyy-MM-dd'),
        },
      ],
    });
    Mock.mock(new RegExp('/api/v1/categories'), (params) => {
      switch (params.type) {
        case 'GET':
          const { page = 1, pageSize = 10 } = qs.parseUrl(params.url)
            .query as unknown as {
            page?: number;
            pageSize?: number;
          };
          return {
            list: list.slice((page - 1) * pageSize, page * pageSize),
            total: list.length,
          };
        case 'POST':
          const { category: addCategory } = JSON.parse(params.body);
          const createdAt = dayjs().format('YYYY-MM-DD');
          const modifiedAt = dayjs().format('YYYY-MM-DD');
          const ret = Mock.mock({
            '_id|8': /[a-z][A-Z][-][0-9]/,
            category: addCategory,
            count: 0,
            createdAt,
            modifiedAt,
          });
          list.push(ret);
          console.log(list);
          return {
            msg: '分类添加成功！',
            code: 0,
            data: ret,
            total: list.length,
          };
        case 'DELETE':
          const { id: delId } = JSON.parse(params.body);
          list = list.filter((cate) => cate._id !== delId);
          return {
            msg: '分类删除成功！',
            code: 0,
            data: { id: delId },
            total: list.length,
          };
        case 'PUT':
          const { id: editId, category: editCategory } = JSON.parse(
            params.body
          );
          const cur = list.find((item) => item._id == editId);
          cur.category = editCategory;
          cur.modifiedAt = dayjs().format('YYYY-MM-DD');
          return {
            msg: '分类修改成功！',
            code: 0,
            data: cur,
            total: list.length,
          };
      }
    });

    Mock.mock(new RegExp('/api/v1/blog-categories'));
  },
});
