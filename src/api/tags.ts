import { request } from './request';

export async function apiGetTags() {
  return request({
    url: `/tags`,
    method: `GET`,
  });
}

export async function apiDeleteTag(id) {
  return request({
    url: `/tags`,
    method: `DELETE`,
    data: { id },
  });
}
export async function apiAddTag(tagName) {
  return request({
    url: `/tags`,
    method: `POST`,
    data: { tagName },
  });
}
