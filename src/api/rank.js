import request from '@/utils/request';

export function query({
  nick, school, limit, page,
}) {
  return request({
    url: '/users/rank',
    method: 'post',
    data: {
      limit,
      page,
      nick,
      school,
    },
  });
}
