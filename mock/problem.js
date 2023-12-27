const Mock = require('mockjs')

const data = Mock.mock({
  'items|20': [{
    'id|+1': 1,
    ip: '@ip',
    hostname: 'root-'+'@word',
    "total_number|1-20": 20,
    "level_disaster_number|1-5": 5,
    "level_high_number|1-5": 5,
    "level_average_number|1-5": 5,
    "level_warning_number|1-5": 5,
    "level_information_number|1-5": 5,
    "level_msg_number|1-5": 5,
    "children|1-10": []
  }]
})

data.items.forEach(item => {
  const count = item.total_number
  item.children = Mock.mock({
    [`list|${count}`]: [{
      'id|+1': 1,
      'eventid|1': '@integer(10000000, 99999999)',
      message: 'redis每秒操作数5分钟内增加了10000，请确认是否异常 (192.168.2.5:6377)',
      result: 'instantaneous_ops_per_sec 25433',
      'severity|1': ['level_disaster', 'level_high', 'level_average', 'level_warning', 'level_information', 'level_msg'],
      created_at: '@datetime',
    }],
  }).list
})


const eventMaps = Mock.mock({
  nodes: [
    { id: 1, ip: '@ip', message: '业务服务-创新园餐台服务异常', created_at: '2023-12-01 13:04:05', percent: 0.55 },
    { id: 2, ip: '@ip', message: '应用软件-redis服务异常', created_at: '2023-12-01 13:04:05', percent: 0.65 },
    { id: 3, ip: '@ip', message: '业务服务-物联网tomcat-...', created_at: '2023-12-01 13:05:05', percent: 0.81 },
    { id: 4, ip: '@ip', message: '业务服务-能力中台获取设备详情接口..', created_at: '2023-12-01 13:01:05', percent: 0.92 },
    { id: 5, ip: '@ip', message: '业务服务-trapper_capacity_ar..', created_at: '2023-12-01 13:07:05', percent: 0.54 },
    { id: 6, ip: '@ip', message: 'xxxxxx xx', created_at: '2023-12-01 13:02:05', percent: 0.42 },
    { id: 7, ip: '@ip', message: 'xxxxxx xx', created_at: '2023-12-01 13:09:05', percent: 0.35 },
    { id: 8, ip: '@ip', message: 'xxxxxx xx', created_at: '2023-12-01 13:03:05', percent: 0.83 }
  ],
  edges: [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 6 },
    { from: 3, to: 7 },
    { from: 3, to: 8 }
  ]
})

module.exports = [
  {
    url: '/smartops/problem/list',
    type: 'get',
    response: config => {
      const { ip, hostname, page = 1, limit = 20 } = config.query
      const items = data.items
      let mockList = items.filter(item => {
        if (ip && item.ip.indexOf(ip) < 0) return false
        if (hostname && item.hostname.indexOf(hostname) < 0) return false
        return true
      })
      
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: items.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/smartops/problem/event_maps',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: {
          items: eventMaps
        }
      }
    }
  },
  {
    url: '/analyse/alert',
    type: 'post',
    response: config => {
      return {
        "code": 20000,
        "msg": "ok",
        "data": {
          "items": {
            "nodes": [{
                "id": 75484369,
                "ip": "192.168.1.1",
                "message": "redis连接数5分钟内增加了10000，请确认是否异常 (192.168.1.1:30379)",
                "created_at": "2023-11-02 14:46:14"
              },
              {
                "id": 75484448,
                "ip": "192.168.2.2",
                "message": "日志不存在或未刷新，请及时查看  k3smater_01  ( 192.168.2.2",
                "created_at": "2023-11-02 14:51:41"
              },
              {
                "id": 75485622,
                "ip": "192.168.3.3",
                "message": "redis每秒操作数5分钟内增加了10000，请确认是否异常 (192.168.3.3:30379)",
                "created_at": "2023-11-02 16:20:05"
              },
              {
                "id": 75485963,
                "ip": "192.168.4.4",
                "message": "redis每秒操作数5分钟内增加了10000，请确认是否异常 (192.168.4.4:30379)",
                "created_at": "2023-11-02 16:44:36"
              },
              {
                "id": 75504352,
                "ip": "192.168.5.5",
                "message": "Pod日志持续30分钟未刷新",
                "created_at": "2023-11-03 15:40:11"
              },
              {
                "id": 75505910,
                "ip": "192.168.6.6",
                "message": "Pod日志持续30分钟未刷新",
                "created_at": "2023-11-03 17:37:49"
              },
              {
                "id": 75506160,
                "ip": "192.168.7.7",
                "message": "S3 服务响应时间超过1秒，端口=7480",
                "created_at": "2023-11-03 17:58:00"
              },
              {
                "id": 75506284,
                "ip": "192.168.8.8",
                "message": "Lack of available memory on server ngxsip_01",
                "created_at": "2023-11-03 18:05:50"
              },
              {
                "id": 75506920,
                "ip": "192.168.1.1",
                "message": "agent-5 CPU使用率大于80%， 请及时查看 k3smater_01 ( 192.168.1.1）",
                "created_at": "2023-11-03 18:57:55"
              },
              {
                "id": 75506921,
                "ip": "192.168.1.1",
                "message": "agent-5 CPU使用率大于90%， 请及时查看 k3smater_01 ( 192.168.1.1）",
                "created_at": "2023-11-03 18:57:55"
              },
              {
                "id": 75507490,
                "ip": "192.168.10.10",
                "message": "redis每秒操作数5分钟内增加了10000，请确认是否异常 (192.168.10.10:6377)",
                "created_at": "2023-11-03 19:34:03"
              },
              {
                "id": 75507964,
                "ip": "192.168.9.9",
                "message": "CPU Processor load is too high （每5分钟高于100%）on cooperative_03 ( 192.168.9.9 )，服务器可能出现宕机风险，请及时查看服务器！",
                "created_at": "2023-11-03 20:06:14"
              },
              {
                "id": 75514199,
                "ip": "192.168.8.8",
                "message": "磁盘IO负载超过20%持续10分钟 on sip_01 ( 192.168.8.8 )，服务器存在io异常",
                "created_at": "2023-11-04 03:42:05"
              },
              {
                "id": 75620376,
                "ip": "192.168.9.9",
                "message": "CPU Processor load is too high （持续五分钟高于80%） on cooperative_03 ( 192.168.9.9 )",
                "created_at": "2023-11-09 13:03:05"
              },
              {
                "id": 75634350,
                "ip": "192.168.5.5",
                "message": "节点CPU使用率超过 60%",
                "created_at": "2023-11-10 06:21:25"
              },
              {
                "id": 75635879,
                "ip": "192.168.4.4",
                "message": "未获取到监控数据：Kubernetes节点资源使用率 ",
                "created_at": "2023-11-10 08:12:21"
              },
              {
                "id": 75635897,
                "ip": "192.168.6.6",
                "message": "未获取到监控数据：Kubernetes节点资源使用率",
                "created_at": "2023-11-10 08:13:58"
              },
              {
                "id": 75641354,
                "ip": "192.168.10.10",
                "message": "获取熔断监控5分钟内未获取到数据，请及时查看 redis_01 ( 192.168.10.10",
                "created_at": "2023-11-10 14:27:36"
              },
              {
                "id": 75643704,
                "ip": "192.168.5.5",
                "message": "节点CPU使用率超过 80%",
                "created_at": "2023-11-10 16:48:40"
              },
              {
                "id": 75765073,
                "ip": "192.168.9.9",
                "message": "cooperative_03 ( 192.168.9.9 ) has just been restarted",
                "created_at": "2023-11-16 13:59:34"
              },
              {
                "id": 75821497,
                "ip": "192.168.9.9",
                "message": "cooperative_03 ( 192.168.9.9 ) Free disk space is less than 20% on volume /",
                "created_at": "2023-11-19 11:12:45"
              },
              {
                "id": 75988058,
                "ip": "192.168.3.3",
                "message": "Zabbix agent on k3smater_01 ( 192.168.3.3 ) is unreachable for 5 minutes",
                "created_at": "2023-11-27 14:36:47"
              },
              {
                "id": 75988559,
                "ip": "192.168.2.2",
                "message": "Zabbix agent on k3smater_01 ( 192.168.2.2 ) is unreachable for 5 minutes",
                "created_at": "2023-11-27 14:37:14"
              },
              {
                "id": 75989148,
                "ip": "192.168.1.1",
                "message": "Zabbix agent on k3smater_01 ( 192.168.1.1 ) is unreachable for 5 minutes",
                "created_at": "2023-11-27 14:37:17"
              }
            ],
            "edges": [{
                "start": 75484369,
                "end": 75485622,
                "percent": 0.99
              },
              {
                "start": 75484369,
                "end": 75506160,
                "percent": 1
              },
              {
                "start": 75484369,
                "end": 75507490,
                "percent": 1
              },
              {
                "start": 75485622,
                "end": 75485963,
                "percent": 0.97
              },
              {
                "start": 75485622,
                "end": 75506160,
                "percent": 1
              },
              {
                "start": 75485622,
                "end": 75507490,
                "percent": 1
              },
              {
                "start": 75485622,
                "end": 75635879,
                "percent": 0.97
              },
              {
                "start": 75485963,
                "end": 75485622,
                "percent": 1
              },
              {
                "start": 75485963,
                "end": 75506160,
                "percent": 1
              },
              {
                "start": 75485963,
                "end": 75507490,
                "percent": 1
              },
              {
                "start": 75504352,
                "end": 75484369,
                "percent": 1
              },
              {
                "start": 75504352,
                "end": 75485622,
                "percent": 1
              },
              {
                "start": 75504352,
                "end": 75506160,
                "percent": 1
              },
              {
                "start": 75504352,
                "end": 75507490,
                "percent": 1
              },
              {
                "start": 75505910,
                "end": 75484369,
                "percent": 1
              },
              {
                "start": 75505910,
                "end": 75485622,
                "percent": 1
              },
              {
                "start": 75505910,
                "end": 75506160,
                "percent": 1
              },
              {
                "start": 75507490,
                "end": 75485622,
                "percent": 1
              },
              {
                "start": 75507490,
                "end": 75485963,
                "percent": 0.95
              },
              {
                "start": 75507490,
                "end": 75506160,
                "percent": 1
              },
              {
                "start": 75507490,
                "end": 75635879,
                "percent": 0.95
              },
              {
                "start": 75634350,
                "end": 75484369,
                "percent": 1
              },
              {
                "start": 75634350,
                "end": 75485622,
                "percent": 1
              },
              {
                "start": 75634350,
                "end": 75506160,
                "percent": 1
              },
              {
                "start": 75634350,
                "end": 75507490,
                "percent": 1
              },
              {
                "start": 75635879,
                "end": 75485622,
                "percent": 1
              },
              {
                "start": 75635879,
                "end": 75506160,
                "percent": 1
              },
              {
                "start": 75635879,
                "end": 75507490,
                "percent": 1
              },
              {
                "start": 75635897,
                "end": 75484369,
                "percent": 1
              },
              {
                "start": 75635897,
                "end": 75485622,
                "percent": 1
              },
              {
                "start": 75635897,
                "end": 75506160,
                "percent": 1
              },
              {
                "start": 75643704,
                "end": 75484369,
                "percent": 1
              },
              {
                "start": 75643704,
                "end": 75485622,
                "percent": 1
              },
              {
                "start": 75643704,
                "end": 75506160,
                "percent": 1
              },
              {
                "start": 75643704,
                "end": 75507490,
                "percent": 1
              }
            ]
          }
        }
      }
    }
  }
]