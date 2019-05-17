import request from '@/utils/request';

export function query({
  limit, page, name, classId, difficulty,
}) {
  return request({
    url: '/course/list',
    method: 'post',
    data: {
      limit,
      page,
      name,
      classId,
      difficulty,
    },
  });
}

export function detail(id) {
  return request({
    url: '/course/all',
    method: 'get',
    params: {
      id,
    },
  });
}

export function detailById(id) {
  return request({
    url: '/course/detail',
    method: 'get',
    params: {
      id,
    },
  });
}

export function create({
  classId, title, difficulty, time, description, instructions, image,
}) {
  return request({
    url: '/course',
    method: 'post',
    data: {
      classId,
      title,
      difficulty,
      time,
      description,
      instructions,
      image,
    },
  });
}

export function update({
  courseId, classId, title, difficulty, time, description, instructions, image,
}) {
  return request({
    url: '/course',
    method: 'put',
    data: {
      courseId,
      classId,
      title,
      difficulty,
      time,
      description,
      instructions,
      image,
    },
  });
}

export function deleteById(id) {
  return request({
    url: '/course',
    method: 'delete',
    params: {
      id,
    },
  });
}
