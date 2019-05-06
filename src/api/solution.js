import request from '@/utils/request';

export function loadLastCode(id) {
  return request({
    url: '/solution/load',
    method: 'get',
    params: {
      id,
    },
  });
}

export function query({ limit, page, problemId }) {
  return request({
    url: '/solution/status',
    method: 'post',
    data: {
      limit,
      page,
      problemId,
    },
  });
}

export function upload(data) {
  return request({
    url: '/solution',
    method: 'post',
    data,
  });
}
