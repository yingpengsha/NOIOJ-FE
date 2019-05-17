import request from '@/utils/request'

export function query(courseId) {
  return request({
    url: '/course/list',
    method: 'post',
    data: {
      courseId
    }
  })
}

export function detail(id) {
  return request({
    url: '/course/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export function create({ courseId, title, description }) {
  return request({
    url: '/chapter',
    method: 'post',
    data: {
      courseId,
      title,
      description
    }
  })
}

export function update({ chapterId, courseId, title, description }) {
  return request({
    url: '/chapter',
    method: 'put',
    data: {
      chapterId,
      courseId,
      title,
      description
    }
  })
}

export function deleteById(id) {
  return request({
    url: '/chapter',
    method: 'delete',
    params: {
      id
    }
  })
}
