<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-remove2" v-if="food.cound > 0" @click.stop="updateFoodCound(false)"></div>
    </transition>
    <div class="icart-count" v-if="food.cound > 0">{{food.cound}}</div>
    <div class="iconfont icon-add" @click.stop="updateFoodCound(true)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import throttle from 'loadsh/throttle'
  export default {
    props: {
      food: Object
    },

    methods: {
      //点击添加或则减少按钮
      updateFoodCound: throttle(function(isAdd) {
        //调用updateFoodCound方法 将值传入Vuex
        this.$store.dispatch('updateFoodCound', {isAdd, food: this.food})
      }, 300)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color rgb(0, 160, 220)
    .icon-remove2
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: $green
      &.move-enter-active, &.move-leave-active
        transition all 0.5s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .icart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: $green
</style>
