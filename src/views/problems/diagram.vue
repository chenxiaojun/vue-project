<template>
  <div>
    <div id="neo4jd3" />
  </div>
</template>

<script>
import * as d3 from '@/assets/js/d3.min.js'
import Neo4jd3 from '@/assets/js/neo4jd3.js'
import jsonData from './neo4jdata.json'
window.d3 = d3
window.Neo4jd3 = Neo4jd3
export default {
  data() {
    return {
      nodeData: {
        'results': [{
          'columns': ['user', 'entity'],
          'data': [{
            'graph': {
              'nodes': [{
                'id': '1',
                'labels': ['User'],
                'properties': {
                  'userId': 'eisman'
                }
              }, {
                'id': '2',
                'labels': ['Phone'],
                'properties': {
                  'value': '555-555-5555'
                }
              }, {
                'id': '3',
                'labels': ['Address'],
                'properties': {
                  'zipCode': '90210',
                  'country': 'US',
                  'city': 'Beverly Hills',
                  'state': 'CA'
                }
              }, {
                'id': '4',
                'labels': ['BirthDate'],
                'properties': {
                  'value': 1326322800000
                }
              }, {
                'id': '5',
                'labels': ['Password'],
                'properties': {
                  'value': '123456'
                }
              }, {
                'id': '6',
                'labels': ['Device'],
                'properties': {
                  'value': 'eisman'
                }
              }, {
                'id': '7',
                'labels': ['SecurityChallengeAnswer'],
                'properties': {
                  'value': 'hCxh4LItmWefWg71JiYUaxxFrCRaqQIDEoEbeqHa'
                }
              }, {
                'id': '8',
                'labels': ['Project'],
                'properties': {
                  'name': 'neo4jd3',
                  'title': 'neo4jd3.js',
                  'description': 'Neo4j graph visualization using D3.js.',
                  'url': 'https://eisman.github.io/neo4jd3'
                }
              }, {
                'id': '9',
                'labels': ['Git'],
                'properties': {
                  'url': 'https://github.com/eisman/neo4jd3'
                }
              }, {
                'id': '10',
                'labels': ['Issues'],
                'properties': {
                  'url': 'https://github.com/eisman/neo4jd3/issues'
                }
              }, {
                'id': '11',
                'labels': ['Github'],
                'properties': {
                  'url': 'https://github.com'
                }
              }, {
                'id': '12',
                'labels': ['Project'],
                'properties': {
                  'name': 'neo4j',
                  'title': 'Neo4j',
                  'description': 'Graphs for Everyone',
                  'url': 'http://neo4j.com'
                }
              }, {
                'id': '13',
                'labels': ['Project'],
                'properties': {
                  'name': 'd3',
                  'title': 'D3.js',
                  'description': 'Bring data to life with SVG, Canvas and HTML.',
                  'url': 'https://d3js.org/'
                }
              }, {
                'id': '14',
                'labels': ['Email'],
                'properties': {
                  'email': 'eeisman@gmail.com'
                }
              }, {
                'id': '15',
                'labels': ['CreditCard'],
                'properties': {
                  'number': '4916928406205705',
                  'type': 'visa'
                }
              }, {
                'id': '16',
                'labels': ['Options'],
                'properties': {}
              }, {
                'id': '17',
                'labels': ['Language'],
                'properties': {
                  'lang': 'en_us'
                }
              }, {
                'id': '18',
                'labels': ['Cookie'],
                'properties': {
                  'value': 'itgnxe0xmvb1tazaqmkpmfzg8m3ma62qskfwcexc'
                }
              }, {
                'id': '19',
                'labels': ['Ip'],
                'properties': {
                  'address': '127.0.0.1'
                }
              }, {
                'id': '20',
                'labels': ['icons'],
                'properties': {
                  'description': 'Map node labels to Font Awesome icons',
                  'type': 'object',
                  'example': {
                    'Address': 'home',
                    'BirthDate': 'birthday-cake',
                    'Password': 'asterisk',
                    'Phone': 'phone',
                    'User': 'user'
                  },
                  'deafult': '{}'
                }
              }, {
                'id': '21',
                'labels': ['zoomIn'],
                'properties': {
                  'description': 'Scroll up to zoom in.',
                  'type': 'function'
                }
              }, {
                'id': '22',
                'labels': ['zoomOut'],
                'properties': {
                  'description': 'Scroll down to zoom out.',
                  'type': 'function'
                }
              }, {
                'id': '23',
                'labels': ['zoomFit'],
                'properties': {
                  'description': 'Adjust the graph to the container once it has been loaded.',
                  'type': 'boolean',
                  'values': [true, false],
                  'default': false
                }
              }, {
                'id': '24',
                'labels': ['Api'],
                'properties': {}
              }, {
                'id': '25',
                'labels': ['Google'],
                'properties': {
                  'url': 'https://www.google.com/#q="neo4jd3"'
                }
              }],
              'relationships': [{
                'id': '1',
                'type': 'HAS_PHONE_NUMBER',
                'startNode': '1',
                'endNode': '2',
                'properties': {
                  'from': 1473581532586
                }
              }, {
                'id': '2',
                'type': 'HAS_ADDRESS',
                'startNode': '1',
                'endNode': '3',
                'properties': {
                  'from': 1473581532586
                }
              }, {
                'id': '3',
                'type': 'HAS_BIRTH_DATE',
                'startNode': '1',
                'endNode': '4',
                'properties': {
                  'from': 1473581532586
                }
              }, {
                'id': '4',
                'type': 'HAS_PASSWORD',
                'startNode': '1',
                'endNode': '5',
                'properties': {
                  'from': 1473581532586
                }
              }, {
                'id': '5',
                'type': 'USED_DEVICE',
                'startNode': '1',
                'endNode': '6',
                'properties': {
                  'from': 1473581532586
                }
              }, {
                'id': '6',
                'type': 'HAS_SECURITY_ANSWER',
                'startNode': '1',
                'endNode': '7',
                'properties': {
                  'from': 1473581532586
                }
              }, {
                'id': '7',
                'type': 'DEVELOPES',
                'startNode': '1',
                'endNode': '8',
                'properties': {
                  'from': 1470002400000
                }
              }, {
                'id': '8',
                'type': 'REPOSITORY',
                'startNode': '8',
                'endNode': '9',
                'properties': {}
              }, {
                'id': '9',
                'type': 'ISSUES',
                'startNode': '8',
                'endNode': '10',
                'properties': {}
              }, {
                'id': '10',
                'type': 'HOSTED_ON',
                'startNode': '8',
                'endNode': '11',
                'properties': {}
              }, {
                'id': '11',
                'type': 'HOSTED_ON',
                'startNode': '12',
                'endNode': '11',
                'properties': {}
              }, {
                'id': '12',
                'type': 'HOSTED_ON',
                'startNode': '13',
                'endNode': '11',
                'properties': {}
              }, {
                'id': '13',
                'type': 'HAS_EMAIL',
                'startNode': '1',
                'endNode': '14',
                'properties': {}
              }, {
                'id': '14',
                'type': 'USED_CREDIT_CARD',
                'startNode': '1',
                'endNode': '15',
                'properties': {}
              }, {
                'id': '15',
                'type': 'DEPENDS_ON',
                'startNode': '8',
                'endNode': '12',
                'properties': {}
              }, {
                'id': '16',
                'type': 'DEPENDS_ON',
                'startNode': '8',
                'endNode': '13',
                'properties': {}
              }, {
                'id': '17',
                'type': 'OPTIONS',
                'startNode': '8',
                'endNode': '16',
                'properties': {}
              }, {
                'id': '18',
                'type': 'HAS_LANGUAGE',
                'startNode': '6',
                'endNode': '17',
                'properties': {}
              }, {
                'id': '19',
                'type': 'HAS_COOKIE',
                'startNode': '6',
                'endNode': '18',
                'properties': {}
              }, {
                'id': '20',
                'type': 'HAS_IP',
                'startNode': '6',
                'endNode': '19',
                'properties': {}
              }, {
                'id': '21',
                'type': 'ICONS',
                'startNode': '16',
                'endNode': '20',
                'properties': {}
              }, {
                'id': '22',
                'type': 'ZOOM_IN',
                'startNode': '24',
                'endNode': '21',
                'properties': {}
              }, {
                'id': '23',
                'type': 'ZOOM_OUT',
                'startNode': '24',
                'endNode': '22',
                'properties': {}
              }, {
                'id': '24',
                'type': 'ZOOM_FIT',
                'startNode': '16',
                'endNode': '23',
                'properties': {}
              }, {
                'id': '25',
                'type': 'API',
                'startNode': '8',
                'endNode': '24',
                'properties': {}
              }, {
                'id': '26',
                'type': 'GOOGLE_SEARCH',
                'startNode': '8',
                'endNode': '25',
                'properties': {}
              }]
            }
          }]
        }],
        'errors': []
      },
      node: [],
      relationships: []
    }
  },
  mounted() {
    const neo4jdata = jsonData
    this.nodeData = this.transformNeo4jData(neo4jdata)
    this.init()
  },

  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      console.log('chufa  init  触发……')
      new Neo4jd3('#neo4jd3', {
        highlight: [{
          class: 'Project',
          property: 'name',
          value: 'neo4jd3'
        }, {
          class: 'User',
          property: 'userId',
          value: 'eisman'
        }],
        showLabel: true, // 修改源码，自定义的一个属性值
        icons: false,
        infoPanel: true, // 是否显示节点信息
        neo4jData: this.nodeData,
        nodeRadius: 25,
        minCollision: 60,
        // onNodeDoubleClick: function (node) {
        //   // switch (node.id) {
        //   //   case '25':
        //   //     // Google
        //   //     window.open(node.properties.url, '_blank');
        //   //     break;
        //   //   default:
        //   //     var maxNodes = 5,
        //   //       data = neo4jd3.randomD3Data(node, maxNodes);
        //   //     neo4jd3.updateWithD3Data(data);
        //   //     break;
        //   // }
        // },
        // onRelationshipDoubleClick: function (relationship) {
        //   // console.log('double click on relationship: ' + JSON.stringify(relationship));
        // },
        // onNodeMouseEnter: function (d) {
        //   // console.log('鼠标经过获取数据哦…………',d,'--------JSON.stringify(d)可获得此节点所有数据-----------',JSON.stringify(d));
        //   // this.mouseNode = d
        //   this.$emit('mouseNode', d)
        //   //  console.log(d,'xXXXXXXXXXXXXXXXXXXXXXXXXXX');
        // },
        zoomFit: true
      })
    },
    onNodeMouseEnter(d) {
      // console.log(d,'');
    },
    // 在neo4j中执行MATCH (n1)-[r]->(n2) RETURN r, n1, n2 LIMIT 25 导出关系json数据 数据转换
    transformNeo4jData(neo4jData) {
      const nodesMap = new Map()
      const relationships = []

      neo4jData.forEach(item => {
        for (const key in item) {
          if (key.startsWith('n')) {
            const node = {
              id: item[key].identity.toString(),
              labels: item[key].labels,
              properties: item[key].properties
            }
            nodesMap.set(node.id, node)
          }
        }
        if (item.hasOwnProperty('r')) {
          const relationship = {
            id: item.r.identity.toString(),
            type: item.r.type,
            startNode: item.r.start.toString(),
            endNode: item.r.end.toString(),
            properties: item.r.properties
          }
          relationships.push(relationship)
        }
      })

      const nodes = Array.from(nodesMap.values())

      const graphData = {
        nodes: nodes,
        relationships: relationships
      }

      return {
        results: [
          {
            columns: ['user', 'entity'],
            data: [
              {
                graph: graphData
              }
            ]
          }
        ],
        errors: []
      }
    }

  }
}
</script>

<style>
.neo4jd3 {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
<style scope>
.neo4jd3-graph {
  /* background-image: url("./pageBg.png"); */
  background-color: #f7f7f7;
  /* background-color: #F9FCFF; */
  background-size: cover;
  background-position: center center;
  border: 1px solid #ddd;
  border-radius: 5px;
  height: calc(100vh - 55px);
  text-align-last: left;
}
/* 右侧关联图谱占比30% */
.neo4jd3-info {
  width: 30%;
  font-size: 16px;
  padding: 10px;
  position: absolute;
  right: 0;
  top: 120px;
  /* display: none; */
}

.neo4jd3-info a {
  border: 1px solid;
  display: inline-block;
  font-size: 16px;
  line-height: 1.428571429;
  margin-left: 5px;
  margin-top: 5px;
  padding: 6px 12px;
}

.neo4jd3-info a.class {
  color: #fff;
}

.neo4jd3-info a.property {
  background-color: #fff;
  border-color: #ccc;
  color: #333;
}

.neo4jd3-info a.btn {
  margin-left: 5px;
  margin-top: 5px;
  opacity: 1;
}

.neo4jd3-info a.info {
  background-color: #a5abb6;
  border: 1px solid #9aa1ac;
  color: #fff;
}

.node.node-highlighted .ring {
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
  filter: alpha(opacity=50);
  opacity: 0.5;
  stroke: #888;
  stroke-width: 12px;
}

.node .outline {
  cursor: pointer;
  fill: #a5abb6;
  pointer-events: all;
  stroke: #9aa1ac;
  stroke-width: 2px;
}

.node .ring {
  fill: none;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  opacity: 0;
  stroke: #6ac6ff;
  stroke-width: 8px;
}

.node .text.icon {
  font-family: FontAwesome;
}

.node.selected .ring,
.node:hover .ring {
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)";
  filter: alpha(opacity=30);
  opacity: 0.3;
}

.relationship {
  cursor: default;
}

.relationship line {
  stroke: #aaa;
}

.relationship .outline {
  cursor: default;
}

.relationship .overlay {
  cursor: default;
  fill: #6ac6ff;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  opacity: 0;
}

.relationship text {
  cursor: default;
}
.relationship.selected .overlay,
.relationship:hover .overlay {
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)";
  filter: alpha(opacity=30);
  opacity: 0.3;
}
svg {
  cursor: move;
}
</style>
