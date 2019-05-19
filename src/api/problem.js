import request from '@/utils/request';

export function query({
  limit, page, title, tags, difficulty, type, isFree, orderBy, packetId,
}) {
  return request({
    url: '/problem/list',
    method: 'post',
    data: {
      limit,
      page,
      title,
      tags,
      difficulty,
      type,
      isFree,
      orderBy,
      packetId,
    },
  });
}

export function isHaveToBuy(id) {
  return request({
    url: '/problem',
    method: 'get',
    params: { id },
  });
}

export function queryById(id) {
  return request({
    url: '/problem/detail',
    method: 'get',
    params: {
      id,
    },
  });
}

export function upload(data) {
  return request({
    url: '/problem',
    method: 'post',
    data,
  });
}

export function update(data) {
  return request({
    url: '/problem',
    method: 'put',
    data,
  });
}

export function deleteById(id) {
  console.log(123);
  return request({
    url: '/problem',
    method: 'delete',
    params: {
      id,
    },
  });
}
