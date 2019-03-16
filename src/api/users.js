import request from '@/utils/request';

export function login(email, password) {
  return request({
    url: '/users/login',
    method: 'post',
    data: {
      email,
      password,
    },
  });
}

export function register(data) {
  return request({
    url: '/users/register',
    method: 'post',
    data,
  });
}

export function changePassword(oldPassword, newPassword) {
  return request({
    url: '/users/reset',
    method: 'post',
    data: {
      password: oldPassword,
      resetPassword: newPassword,
    },
  });
}

export function userInfo() {
  return request({
    url: '/users/info',
    method: 'get',
  });
}


export function updateUserInfo(info) {
  return request({
    url: '/users/modified',
    method: 'post',
    data: info,
  });
}

export function userAvator() {
  return request({
    url: '/users/upload',
    method: 'get',
  });
}

export function wallet() {
  return request({
    url: '/users/payment',
    method: 'get',
  });
}

export function payment(money) {
  return request({
    url: '/users/payment',
    method: 'post',
    data: {
      money,
    },
  });
}
