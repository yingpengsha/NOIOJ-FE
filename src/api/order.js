import request from '@/utils/request';

export function query({ limit, page }) {
  return request({
    url: '/users/order/list',
    method: 'post',
    data: {
      limit,
      page,
    },
  });
}

export function create({ packetId, price, createDate }) {
  return request({
    url: '/users/order',
    method: 'post',
    data: {
      packetId,
      price,
      createDate,
    },
  });
}
