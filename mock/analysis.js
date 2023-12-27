const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    'id|+1': 1,
    source_ip: '@ip',
    target_ip: '@ip',
    'source_tag|1': ['404', '405', '401', '500', '504'],
    source_msg: '业务服务-xxxxxxxxxxxxxxxxxxxxxxxx服务挂了',
    'target_tag|1': ['404', '405', '401', '500', '504'],
    target_msg: '业务服务-xxxxxxxxxxxxxxxxxxxxxxxx服务挂了',
    'percent|0.2': 0.8
  }]
})

module.exports = [
  {
    url: '/smartops/analysis/list',
    type: 'get',
    response: config => {
      const { source_ip, target_ip, source_tag, target_tag, page = 1, limit = 20 } = config.query
      const items = data.items
      console.log(config, 123, source_ip)
      let mockList = items.filter(item => {
        if (source_ip && item.source_ip.indexOf(source_ip) < 0) return false
        if (target_ip && item.target_ip.indexOf(target_ip) < 0) return false
        if (source_tag && item.source_tag !== source_tag) return false
        if (target_tag && item.target_tag !== target_tag) return false
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
    url: '/smartops/analysis/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/smartops/analysis/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/smartops/analysis/source_tags',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          items: ['404', '405', '401', '500', '504']
        }
      }
    }
  },
  {
    url: '/smartops/analysis/target_tags',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          items: ['404', '405', '401', '500', '504']
        }
      }
    }
  }
]
