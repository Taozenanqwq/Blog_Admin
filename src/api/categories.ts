import { request } from './request';

export async function getCategories(page) {
  return request({
    url: `/blog-categories?page=${page}&pageSize=10`,
  });
}
