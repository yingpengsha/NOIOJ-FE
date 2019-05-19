import request from '@/utils/request';

export function isHaveToBuy(id) {
  return request({
    url: '/packet',
    method: 'get',
    params: { id },
  });
}

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

export function queryMe() {
  return request({
    url: '/packet/me',
    method: 'get',
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

export function insert({
  name, introduce, image, price,
}) {
  return request({
    url: '/packet',
    method: 'post',
    data: {
      name,
      introduce,
      image,
      price,
      originClass: 2,
    },
  });
}

export function update(data) {
  console.log(data);
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
