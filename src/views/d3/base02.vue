<template>
  <div class="graph">
  </div>
</template>
<script>
import * as d3 from '@/assets/js/d3.min.js'
export default {
  data() {
    return {}
  },
  mounted() {
    var width = 400 // 画布的宽度
    var height = 400 // 画布的高度
    var background = '#F7F7F7' // 画布的背景色

    var svg = d3.select('.graph')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background', background)
    
    var dataSet = [ 250 , 210 , 170 , 130 , 90 ]
    var rectHeight = 25 // 每个矩形所占的像素高度(包括空白)
    
    svg.selectAll('rect') // 这里返回的是一个空的选择集，它是一种预选择。 这个预选择表示将来要操作的元素。在进行数据绑定之前，选择集中实际没有任何矩形元素
      .data(dataSet) // 通过数据集与预选择的每个矩形元素进行绑定，这样，就为每个数据项创建了一个与之关联的占位元素
      .enter() // 该代码表示进入数据集，表示选择集中的每个占位元素都与数据集的每个项进行关联
      .append('rect') // 进入 "enter" 状态后，使用 .append('rect') 创建对应数量的矩形元素
      .attr('x', 20) // 该代码设置矩形元素相对于SVG画布的x坐标。这里的值为20，表示相对于SVG画布左侧边缘的偏移量
      .attr('y', function(data, index){ // 该代码设置矩形元素相对于SVG画布的y坐标，也就是矩形元素的垂直位置。这里使用了一个函数，根据数据值确定每个矩形元素的y坐标。根据示例的数据集[ 250 , 210 , 170 , 130 , 90 ]，将会在画布上绘制一条垂直方向递减的矩形序列
        return data
      })
      .attr('width', function(d){ // 该代码设置矩形元素的宽度。这里同样使用了一个函数，根据数据值确定每个矩形元素的宽度
        return d
      })
      .attr('height', rectHeight - 2) // 该代码设置矩形元素的高度。这里使用了一个常量值rectHeight来表示每个矩形的高度，并在其基础上减去2个像素，以达到一定的间隔效果
      .style('fill', 'steelblue') // 代码设置矩形元素的填充颜色为steelblue，使得矩形呈现蓝色
  }
}
</script>