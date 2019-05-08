import request from '@/utils/request';

export function rank({ limit, page }) {
  return request({
    url: '/contest/rank',
    method: 'post',
    data: {
      limit,
      page,
    },
  });
}

export function query(id) {
  return request({
    url: '/contest/detail',
    method: 'get',
    params: {
      id,
    },
  });
}

export function status() {
  return request({
    url: '/contest/status',
    method: 'get',
  });
}

export function history({ limit, page }) {
  return request({
    url: '/contest/record',
    method: 'post',
    data: {
      limit,
      page,
    },
  });
}

export function create() {
  return request({
    url: '/contest',
    method: 'post',
  });
}

export function queryProblem(id) {
  return request({
    url: '/contest',
    method: 'get',
    params: {
      id,
    },
  });
}

export function solution({ limit, page, contestId }) {
  return request({
    url: '/contest/solution',
    method: 'post',
    data: {
      limit,
      page,
      contestId,
    },
  });
}

export function exit(id) {
  return request({
    url: '/contest',
    method: 'delete',
    params: {
      id,
    },
  });
}

export function finish(id) {
  return request({
    url: '/contest',
    method: 'put',
    data: {
      contestId: id,
      status: 1,
    },
  });
}
