import request from '@/utils/request';

export function query(chapterId) {
  return request({
    url: '/subsection/list',
    method: 'post',
    data: {
      chapterId,
    },
  });
}

export function detail(id) {
  return request({
    url: '/subsection/detail',
    method: 'get',
    params: {
      id,
    },
  });
}

export function create({ chapterId, title, url }) {
  return request({
    url: '/subsection',
    method: 'post',
    data: {
      chapterId,
      title,
      url,
    },
  });
}

export function update({
  subsectionId, chapterId, title, url,
}) {
  return request({
    url: '/subsection',
    method: 'put',
    data: {
      subsectionId,
      chapterId,
      title,
      url,
    },
  });
}

export function deleteById(id) {
  return request({
    url: '/subsection',
    method: 'delete',
    params: {
      id,
    },
  });
}
