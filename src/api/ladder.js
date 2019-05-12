import request from '@/utils/request';

export function challenge() {
  return request({
    url: '/challenge',
    method: 'post',
  });
}

export function query() {
  return request({
    url: '/challenge',
    method: 'get',
  });
}

export function rank(levelId) {
  return request({
    url: '/challenge',
    method: 'post',
    data: {
      levelId,
    },
  });
}

export function submitLog(data) {
  return request({
    url: '/challenge/solution',
    method: 'post',
    data,
  });
}
