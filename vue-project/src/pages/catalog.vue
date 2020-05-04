<template>
  <div class="containe-catalogo">
    <img src="../assets/top-1.png" alt="" class="top-img">
    <div class="header">
      <ul class="nav">
        <template v-for="(item,index) in nav" >
          <li :key='index'>
            <a :href="item.url" :class="{active:item.index===currentIndex}">{{item.name}}</a>
          </li>
        </template>
      </ul>
    </div>
    <div class="center  containe">
      <router-view/>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      name: 'catalog',
      currentIndex: 0
    }
  },
  watch: {
    $route: {
      handler (val) {
        this.currentIndex = val.meta.index
      },
      immediate: true
    }
  },
  computed: {
    ...mapState(['nav'])
  },
  methods: {
    ...mapMutations(['setNavlist'])
  }
}

</script>

<style lang="scss" scoped>
  .containe-catalogo{
    background:#e9eaed;
    .top-img{
      display: block;
      height: 5px;
      width:100%;
      min-width:1200px;
    }
    .header{
      background:#2869ba;
      .nav{
        height:60px;
        width:1200px;
        margin: 0 auto;
        background: #2869ba;
        li{
          height:60px;
          float:left;
          a{
            padding: 0 30px;
            height:100%;
            line-height:60px;
            color:#fff;
            display: inline-block;
            transition:all 1s;
            &.active{
              background:rgba(0,0,0,0.1);
            }
            &:hover{
               background:rgba(0,0,0,0.1);
            }
          }
        }
      }
    }
    .center{
      min-height:800px;
      padding:20px 0;
    }
    .footer{
      height:155px;
      background:#373d41;
      border-top:5px solid #00c1de;
    }
  }
</style>
