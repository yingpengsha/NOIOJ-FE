import request from '@/utils/request';

export function submitList() {
  return request({
    url: '/solution/submit',
    method: 'get',
  });
}

export function tagsList() {
  return request({
    url: '/problem/tags/statistic',
    method: 'get',
  });
}

export function classList() {
  return request({
    url: '/problem/tags/class',
    method: 'get',
  });
}
