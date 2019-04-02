import request from '@/utils/request';

export function query() {
  return request({
    url: '/problem/tags/list',
    method: 'get',
  });
}

export function insert({ classId, name }) {
  return request({
    url: '/problem/tags',
    method: 'post',
    data: {
      classId,
      name,
    },
  });
}

export function update({ tagId, classId, name }) {
  return request({
    url: '/problem/tags',
    method: 'put',
    data: {
      tagId,
      classId,
      name,
    },
  });
}

export function deleteById(id) {
  return request({
    url: '/problem/tags',
    method: 'delete',
    params: {
      id,
    },
  });
}
