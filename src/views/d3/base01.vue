<template>
  <div>
    <p>Apple</p>
    <p id="second" class='bold'>Orange</p>
    <p class='bold'>Pear</p>
  </div>
</template>
<script>
import * as d3 from '@/assets/js/d3.min.js'
export default {
  data() {
    return {}
  },
  mounted() {
    /**
     * 1. 使用d3.select 或者d3.selectAll选择元素后 返回的对象，就是选择集  支持链式语法
     * d3.select 是选择所有指定元素的第一个
     * d3.selectAll 是选择指定元素的全部
     * select参数支持 css选择器  body、 .css、 #id
     */
    var p = d3.select("body")
              .selectAll("p")
    
    // 2.datum() 函数 可以绑定一个数据到选择集上
    var country = 'China'
    p.datum(country)
    p.text(function(data, index) {
      return "第" + index + "个元素绑定的值为：" + data
    })
    /**
     * 3.data() 函数，可以绑定一个数组到选择集上，数组的各项值分别与选择集各元素绑定
     * function(data, index) 无名函数，当选择集需要使用被绑定的数据，常需要这么使用。其包含两个参数，其中：
     *   data 代表数据，也就是与某元数据绑定的数据
     *   i代表索引，代表数据的索引号，从0开始
     */
    var cities = ['Hangzhou', 'AnQing', 'Suzhou']
    p.data(cities)
    p.text(function(data, index) {
      return "第" + index + "个元素绑定的值为：" + data
    })

    // 选择第一个p元素
    var p1 = d3.select('body').select('p')
    p1.style('color', 'red')

    // 选择第二个p元素 可以给想要选择的p标签增加id或者css属性来处理
    var p2 = d3.select('body').select('#second')
    p2.style('color', 'green')

    // 想选择后两个p标签，可以给后两个p标签增加css属性
    var p3 = d3.select('body').select('.bold')
    p3.style('font-weight', 'bold')

    // 删除元素
    p1.remove()
  }
}
</script>