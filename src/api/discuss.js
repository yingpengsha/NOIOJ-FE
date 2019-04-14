import request from '@/utils/request';

export function query({ limit, page, problemId }) {
  return request({
    url: '/topic/list',
    method: 'post',
    data: {
      limit,
      page,
      problemId,
    },
  });
}

export function queryById(topicId) {
  return request({
    url: '/reply/list',
    method: 'post',
    data: {
      topicId,
    },
  });
}

export function create(data) {
  return request({
    url: '/topic',
    method: 'post',
    data,
  });
}

export function reply(data) {
  return request({
    url: '/reply',
    method: 'post',
    data,
  });
}

export function update(data) {
  return request({
    url: '/topic',
    method: 'put',
    data,
  });
}

export function deleteById(id) {
  return request({
    url: '/topic',
    method: 'delete',
    params: {
      id,
    },
  });
}

export function deleteReplyById(id) {
  return request({
    url: '/reply',
    method: 'delete',
    params: {
      id,
    },
  });
}
