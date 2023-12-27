import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/smartops/analysis/list',
    method: 'get',
    params: query
  })
}

export function createList(data) {
  return request({
    url: '/smartops/analysis/create',
    method: 'post',
    data
  })
}

export function updateList(data) {
  return request({
    url: '/smartops/analysis/update',
    method: 'post',
    data
  })
}

export function fetchSourceTags() {
  return request({
    url: '/smartops/analysis/source_tags',
    method: 'get'
  })
}

export function fetchTargetTags() {
  return request({
    url: '/smartops/analysis/target_tags',
    method: 'get'
  })
}
