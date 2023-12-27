<template>
  <div>
    <div ref="networkContainer" class="networkContainer" />
    <div id="divHoverNode" class="menu" style="display: none;" />
  </div>
</template>

<script>
import { Network } from 'vis-network/standalone'
import { fetchAnalyseAlert } from '@/api/problem'

export default {
  data() {
    return {
      data: {
        nodes: [
          // 节点数据
        ],
        edges: [
          // 边缘数据
        ],
        groups: [
          // 分组数据
        ]
      },
      options: {
        // 图表选项
      },
      listLoading: false,
      eventids: this.$route.query.event_id || [],
      type: this.$route.query.type || 'analysis'
    }
  },
  mounted() {
    console.log(this.$route.query)
    this.getList().then(res => {
      this.renderGraph()
    })
  },
  methods: {
    getList() {
      this.listLoading = true
      const data = {
        event_ids: this.eventids,
        weight: 0.95
      }
      return fetchAnalyseAlert(data).then(response => {
        this.data = response.data.items
        this.setNetworkDatas()
        this.groupNodes()
        this.listLoading = false
      })
    },
    renderGraph() {
      const container = this.$refs.networkContainer
      this.options = {
        layout: {
          improvedLayout: true,
          hierarchical: false,
          randomSeed: 2
        },
        physics: {
          enabled: true,
          hierarchicalRepulsion: {
            nodeDistance: 400
          },
          solver: 'forceAtlas2Based',
          forceAtlas2Based: {
            gravitationalConstant: -200,
            centralGravity: 0.01,
            springConstant: 0.08,
            springLength: 100,
            damping: 0.4
          },
          stabilization: {
            iterations: 1000
          }
        },
        nodes: {
          widthConstraint: {
            maximum: 210,
            minimum: 210
          },
          shape: 'box',
          heightConstraint: {
            minimum: 110
          },
          borderWidth: 1,
          color: {
            background: 'white', // 设置节点背景色为白色
            border: 'black', // 设置节点边框颜色为黑色
            highlight: {
              background: 'lightblue',
              border: 'black'
            }
          }
        },
        edges: {
          arrows: 'to',
          font: {
            align: 'horizontal',
            size: 16,
            face: 'arial',
            vadjust: -16
          },
          color: {
            color: 'black',
            highlight: '#848484',
            hover: 'black',
            inherit: 'from',
            opacity: 1.0
          }
        },
        // 用于所有用户与网络的交互。处理鼠标和触摸事件以及导航按钮和弹出窗口
        interaction: {
          hover: true,
          dragNodes: true, // 是否能拖动节点
          dragView: true, // 是否能拖动画布
          multiselect: false, // 按 ctrl 多选
          selectable: true, // 是否可以点击选择
          selectConnectedEdges: true, // 选择节点后是否显示连接线
          hoverConnectedEdges: true, // 鼠标滑动节点后是否显示连接线
          zoomView: true // 是否能缩放画布
        }
      }
      const network = new Network(container, this.data, this.options)

      network.on('hoverNode', (params) => {
        // 鼠标移入事件
        const nodeId = params.node
        const ip = this.data.nodes.find(n => n.id === nodeId).ip
        const message = this.data.nodes.find(n => n.id === nodeId).message
        const date = this.data.nodes.find(n => n.id === nodeId).created_at
        const ul = '<ul>' +
              '<li>IP：' + ip + '</li>' +
              '<li>告警内容：' + message + '</li>' +
              '<li>告警时间：' + date + '</li>' +
              '</ul>'
        const divHoverNode = document.getElementById('divHoverNode')
        divHoverNode.innerHTML = ul
        divHoverNode.style.display = 'block'
        divHoverNode.style.left = params.event.layerX - 5 + 'px'
        divHoverNode.style.top = params.event.layerY + 100 + 'px'
      })

      network.on('blurNode', (params) => {
        // 鼠标移出事件
        const divHoverNode = document.getElementById('divHoverNode')
        divHoverNode.style.display = 'none'
      })
    },
    setNetworkDatas() {
      this.data.edges = this.data.edges.map(t => {
        return {
          ...t,
          from: t.start,
          to: t.end,
          label: t.percent.toString(),
          font: { color: this.matchColor(t.percent) }
        }
      })
      this.data.nodes = this.data.nodes.map((t) => {
        return {
          ...t,
          label: `${t.ip}\n\n${t.message.slice(0, 64)}`,
          message: `${t.ip}\n\n${t.message}`
        }
      })
    },
    // splitLabelAndColor(percent) {
    //   const color = this.matchColor(label)
    //   return [label.toString(), color]
    // },
    matchColor(value) {
      return value > 0.9 ? '#B81A1A'
        : value > 0.8 ? '#F64235'
          : value > 0.6 ? '#FFA05C'
            : value > 0.4 ? '#FFC960'
              : value > 0.2 ? '#95CDCD'
                : '#97AAB3'
    },
    groupNodes() {
      // 根据ip进行分组
      var groups = []
      var groupedNodes = {}
      this.data.nodes.forEach(function(node) {
        if (!groupedNodes[node.ip]) {
          groupedNodes[node.ip] = []
        }
        node.group = node.ip // 增加group字段
        groupedNodes[node.ip].push(node)
      })
      // 生成新的节点数组
      var newNodes = []
      for (var ip in groupedNodes) {
        newNodes = newNodes.concat(groupedNodes[ip])
      }
      // 生成新的groups数组
      groups = Object.keys(groupedNodes).map(function(ip) {
        return { id: ip }
      })
      this.data.groups = groups
    }
  }
}
</script>
<style scoped>
.networkContainer {
  width: 100%;
  height: calc(100vh - 55px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加轻微阴影效果 */
  border-radius: 10px; /* 添加轻微圆角 */
  background-color: #f7f7f7; /* 设置浅灰色背景 */
  overflow: hidden; /* 防止内容溢出 */
  padding: 20px; /* 添加内边距 */
}
.menu {
  width: 300px;
  position: absolute;
  background: rgba(3, 3, 3, 0.6);
  border-radius: 5px;
  left: -99999px;
  top: -999999px;
  padding: 5px 2px;
}
.menu >>> ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.menu >>> ul li {
  padding: 5px 10px;
  color: #fff;
  border-bottom: 1px solid #fff;
  font-size: 14px;
  cursor: pointer;
}
.menu >>> ul li:last-child {
  border-bottom: none;
  padding: 5px 10px 0 10px;
}
</style>
