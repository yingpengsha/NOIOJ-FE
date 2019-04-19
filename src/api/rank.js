import request from '@/utils/request';

export function query() {
  return request({
    url: '/users/rank',
    method: 'get',
  });
}
