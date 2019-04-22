import request from '@/utils/request';

export function query() {
  return request({
    url: '/users/balance',
    method: 'get',
  });
}

export function add(balance) {
  return request({
    url: '/users/balance',
    method: 'post',
    data: {
      balance,
    },
  });
}
