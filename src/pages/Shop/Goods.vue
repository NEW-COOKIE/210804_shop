<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="left">
        <ul ref="leftUl">
          <!-- current -->
          <li class="menu-item" v-for="(good, index) in goods"
          :key="good.name" :class="{current: currentIndex === index}" @click="selectIndex(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="right">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good) in goods" :key="good.name">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food) in good.foods"
              :key="food.names" @click="isShowFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControle :food='food' />
                  </div>
                </div>                
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <Food :food='food' ref="food"/>
    </div>
    <ShopCart />
  </div>
</template>

<script type="text/ecmascript-6">
  import Food from '@/components/Food/Food.vue'
  import ShopCart from '@/components/ShopCart/ShopCart.vue'
  import {mapState} from 'vuex';
  import BScroll from 'better-scroll';
  export default {
    
    data() {
      return {
        //1.右测滑动的Y坐标值: scroll 在滑动过程中不断变换
        scrollY: 0,

        //2.右测每个分类<li>的top值的数组:tops 第一次列表显示后不再改变
        tops: [],

        food: {}
      }
    },

    computed: {
      ...mapState({
        goods: state => state.shop.goods
      }),
      currentIndex() {
        const {scrollY, tops} = this;
        const index =  tops.findIndex((top, index) => scrollY >= top && scrollY < tops[index + 1]);
        if (index !== this.index && this.leftScroll) {
          //将新的坐标保存起来
          this.index = index;

          const li = this.$refs.leftUl.children[index];
          this.leftScroll.scrollToElement(li, 300);
        }

        return index
      }
    },

    methods: {
      //初始化滑动
      _initScroll() {
        this.leftScroll = new BScroll(this.$refs.left, {});
        this.rightScroll =  new BScroll(this.$refs.right, {
          probeType: 1
        })

        //给右边的滑动列表添加监听
        this.rightScroll.on('scrollEnd', ({y}) => {
          this.scrollY = Math.abs(y);
        })

      },

      //统计右边<li>的top值
      _initTops() {
        const tops = [];
        let top = 0;
        tops.push(top);
        const lis = Array.prototype.slice.call(this.$refs.rightUl.children);
        lis.forEach(li => {
          top += li.clientHeight;
          tops.push(top);
        });

        //更新tops数据
        this.tops = tops;
      },

      //点击分类列表 商品列表滑动到相应位置
      selectIndex(index) {
        //找到对应的top值
        const top = this.tops[index];

        //立即更新scroll目标值
        this.scrollY = top;

       //让右侧列表滑到相应位置
        if (this.rightScroll) {
          this.rightScroll.scrollTo(0, -top, 300);
        }
        
      },

      isShowFood(food) {
        this.food = food

        this.$refs.food.toggleShow()
      }
    },

    watch: {
      goods() {//goods数据跟新了
        this.$nextTick(() => {//列表数据显示
          this._initScroll();
          this._initTops();
        })
      }
    },

    components: {
      Food,
      ShopCart
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
