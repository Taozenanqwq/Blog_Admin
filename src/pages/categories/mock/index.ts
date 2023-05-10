import Mock from 'mockjs';
import qs from 'query-string';
import setupMock from '@/utils/setupMock';

setupMock({
  setup: () => {
    const { list } = Mock.mock({
      'list|100': [
        {
          '_id|8': /[a-z][A-Z][-][0-9]/,
          categories: () =>
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
    Mock.mock(new RegExp('/api/v1/blog-categories'), (params) => {
      const { page = 1, pageSize = 10 } = qs.parseUrl(params.url)
        .query as unknown as {
        page?: number;
        pageSize?: number;
      };

      return {
        list: list.slice((page - 1) * pageSize, page * pageSize),
        total: list.length,
      };
    });
  },
});
