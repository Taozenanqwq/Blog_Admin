import Mock from 'mockjs';
import setupMock from '@/utils/setupMock';
import dayjs from 'dayjs';
setupMock({
  setup: () => {
    const COLORS = [
      'red',
      'orangered',
      'orange',
      'gold',
      'lime',
      'green',
      'cyan',
      'blue',
      'arcoblue',
      'purple',
      'pinkpurple',
      'magenta',
      'gray',
    ];
    let { list } = Mock.mock({
      'list|5': [
        {
          '_id|8': /[a-z][A-Z][-][0-9]/,
          tagName: () =>
            Mock.Random.pick([
              'java',
              'javascript',
              'rust',
              'vue',
              'react',
              'react-native',
              'vue',
            ]),
          color: () => Mock.Random.pick(COLORS),
        },
      ],
    });

    Mock.mock(new RegExp('/api/v1/tags'), (params) => {
      switch (params.type) {
        case 'GET':
          return {
            list,
            total: list.length,
          };
        case 'POST':
          const { tagName } = JSON.parse(params.body);
          const tag = Mock.mock({
            '_id|8': /[a-z][A-Z][-][0-9]/,
            tagName,
            color: () => Mock.Random.pick(COLORS),
          });
          return {
            msg: '标签添加成功！',
            code: 0,
            data: tag,
            total: list.length,
          };
        case 'DELETE':
          const { id } = JSON.parse(params.body);
          list = list.filter((tag) => tag._id !== id);
          return {
            msg: '分类删除成功！',
            code: 0,
            data: { id },
            total: list.length,
          };
      }
    });
  },
});
