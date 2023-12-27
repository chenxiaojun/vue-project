import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/smartops/problem/list',
    method: 'get',
    params: query
  })
}

// 根因分析图表
export function fetchEventMaps(data) {
  return request({
    url: '/smartops/problem/event_maps',
    method: 'post',
    data: data
  })
}

// 根因分析图表
export function fetchAnalyseAlert(data) {
  return request({
    url: '/analyse/alert',
    method: 'post',
    data: data
  })
}

