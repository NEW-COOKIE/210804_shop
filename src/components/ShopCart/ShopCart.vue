<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShop">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totaleCound > 0}">
              <i class="iconfont icon-cart" :class="{highlight: totaleCound > 0}"></i>
            </div>
            <div class="num" v-show="totaleCound > 0">{{totaleCound}}</div>
          </div>
          <div class="price" :class="{highlight: totalePrice > 0}">￥{{totalePrice}}</div>
          <div class="desc">另需配送费￥{{info.minPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payCall">
            {{payText}}
          </div>
        </div>
      </div>

      <div class="shopcart-list" v-show="listShop">
        <div class="list-header" >
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearCart">清空</span>
        </div>
        <div class="list-content" ref="foodList">
          <ul>
            <li class="food" v-for="(food) in cartFoods" :key='food.name'>
              <span class="name">{{food.name}}</span>
              <div class="price"><span>￥{{food.price}}</span></div>
              <div class="cartcontrol-wrapper">
                <CartControle :food='food' />
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
      <div class="list-mask" v-show="listShop" @click="toggleShop"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {MessageBox} from 'mint-ui'
  import {mapState, mapGetters} from 'vuex'
  import BScroll from 'better-scroll'
  import {CLEAR_CART} from '@/vuex/mutations_types.js'
  export default {
    data() {
      return {
        isShow: false
      }
    },

    computed: {
      ...mapState({
        cartFoods: state => state.shop.cartFoods,
        info: state => state.shop.info
      }),

      //获取购物数量、总价格
      ...mapGetters(['totaleCound', 'totalePrice']),

      //设置结账按钮样式
      payCall() {
        const {totalePrice} = this;
        const {minPrice} = this.info;
        return minPrice > totalePrice ? 'not-enough' : 'enough'
      },

      payText() {
        const {totalePrice} = this;
        const {minPrice} = this.info;
        if (totalePrice === 0) {
          return `满${minPrice}元起送`
        }else if (minPrice > totalePrice) {
          return `还差${minPrice - totalePrice}元起送`
        }else {
          return '结账'
        }
      },

      listShop() {
        //如果没有购物数量 直接隐藏
        if (this.totaleCound === 0) {
          this.isShow = false
        }

        /*
        问题：如果创建了多个scroll 会导致事件多次调用
        解决：让scroll只创建一次
        单一对象模式
        1创建前 判断对象存不存在
        2创建后 存储对象
         */
        if (this.isShow) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.foodList, {
              click: true
              })
            }else {
              this.scroll.refresh()
            }
          })
        }

        return this.isShow
      }

    },

    methods: {
      //购物数量小于0 点击购物车无效
      toggleShop() {
        if (this.totaleCound > 0) {
          this.isShow = !this.isShow
        }
      },

      clearCart() {
        MessageBox.confirm('是否清除').then(
          () => {
            this.$store.commit(CLEAR_CART)
          }
        )
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'

  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: $green
            .icon-cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      &.move-enter-active, &.move-leave-active
        transition all .5s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateY(0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: opacity 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>
