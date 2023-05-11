import { request } from './request';

export async function getCategories(page) {
  return request({
    url: `/categories?page=${page}&pageSize=10`,
  });
}
export async function addCategoriey(category) {
  return request({
    url: `/categories`,
    method: 'POST',
    data: { category },
  });
}
export async function editCategoriey(id, category) {
  return request({
    url: `/categories`,
    method: 'PUT',
    data: { id, category },
  });
}
export async function delCategoriey(id) {
  return request({
    url: `/categories`,
    method: 'DELETE',
    data: { id },
  });
}
