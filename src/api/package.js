import request from '@/utils/request';

export function query({
  limit, page, title, originClass, userId, status,
}) {
  return request({
    url: '/packet/list',
    method: 'post',
    data: {
      limit,
      page,
      title,
      originClass,
      userId,
      status,
    },
  });
}

export function queryById(id) {
  return request({
    url: '/packet/detail',
    method: 'get',
    params: {
      id,
    },
  });
}

export function insert(data) {
  return request({
    url: '/packet',
    method: 'post',
    data,
  });
}

export function update(data) {
  return request({
    url: '/packet',
    method: 'put',
    data,
  });
}

export function deleteById(id) {
  return request({
    url: '/packet',
    method: 'delete',
    params: {
      id,
    },
  });
}
