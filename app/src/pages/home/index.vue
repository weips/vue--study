<template>
  <div class="wrap" ref="wrap">
    <div class="left">
      123
    </div>
  </div>
</template>
<script>
export default {
  name: 'drag',
  directives: {
    drag: {
      inserted: function (el) {
        el.onmousedown = function (e) {
          let left
          let top
          let disx = e.pageX - el.offsetLeft
          let disy = e.pageY - el.offsetTop
          document.onmousemove = function (e) {
            left = e.pageX - disx + 'px'
            top = e.pageY - disy + 'px'
            el.style.left = left
            el.style.top = top
          }
          document.onmouseup = function (e) {
            document.onmousemove = document.onmouseup = null
          }
          e.preventDefault()
        }
      }
    }
  },
  mounted () {
    console.log(this.webix)
  }
}
</script>

<style lang="less" scoped>
.wrap {
  height: 400px;
  border: 1px solid black;
  .left {
    position: relative;
    width: 200px;
    height: 100%;
    border-right: 1px solid black;
  }
}
.drag {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background: orange;
}
</style>
