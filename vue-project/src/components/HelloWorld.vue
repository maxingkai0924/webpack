<template>
  <div class="hello">
     <button @click="btnSub">-</button>
     <span>{{count}}</span>
     <span>{{showNum}}</span>
     <button @click="btnAdd">+</button>
     <button @click="btnAddAsync">+</button>
     <div class="input">
       <el-input type="text"  @keyup.enter.native='onKeyup' v-model="val"/>
     </div>
     <transition-group appear
        enter-active-class="animated fadeInDown"
        leave-active-class="animated fadeOutUp"
        tag="ul"
     >
       <li v-for="item in list" @click="del(item)" :key='item.id'>{{item.fruits}}</li>
     </transition-group>
     <div class="btn"><el-button type='primary' @click='btnShow'>显示</el-button></div>
      <div class="block">
         <span class="demonstration">显示总数</span>
         <el-pagination
           :page-size="100"
           layout="total, prev, pager, next"
           :total="1000">
         </el-pagination>
       </div>

      <p>{{$t('message.hello')}}</p>
  </div>
</template>

<script>
// mapState, mapGetters放在 computed中...mapState(['']),...mapGetters([''])
// mapMutations,mapActions放在 methods中 ...mapMutations(['']),...mapActions(['']),
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      input: '',
      val: '',
      list: [
        {
          id: 1,
          fruits: '苹果'
        },
        {
          id: 2,
          fruits: '橘子'
        },
        {
          id: 3,
          fruits: '山楂'
        },
        {
          id: 4,
          fruits: '香蕉'
        },
        {
          id: 5,
          fruits: '西瓜'
        },
        {
          id: 6,
          fruits: '红龙果'
        }
      ],
      showList: true
    }
  },
  methods: {
    ...mapMutations(['sub']),
    ...mapActions(['addAsybc']),
    btnSub () {
      if (this.count > 0) {
        this.sub(2)
      }
    },
    // commit作用就是调用 mutations定义的函数
    btnAdd () {
      // this.$store.state.count++
      this.$store.commit('add', 3)
    },
    // 执行异步的actions里面的方法 有一个api 'dispatch'专门处理actions里面的函数
    btnAddAsync () {
      // this.$store.dispatch('addAsybc', 2);
      this.addAsybc(2)
    },
    btnShow () {
      this.showList = !this.showList
    },
    onKeyup () {
      let obj = {
        id: Number(this.list.length) + 1,
        fruits: this.val
      }
      if (this.val.trim()) {
        this.list.push(obj)
      } else {
        alert('请输入')
      }
      this.val = ''
    },
    del (item) {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].id === item.id) {
          this.list.splice(i, 1)
        }
      }
    }
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['showNum'])
  },
  mounted () {
    this.$i18n.locale = 'en'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
    h1, h2 {
        font-weight: normal;
    }
    .input{
      width:40%;
      margin:10px auto;
    }
    .btn{
      width:40%;
      margin:10px auto;
      /deep/ .el-button{
        width: 100%;
      }
    }
    ul {
        list-style-type: none;
        padding: 0;
        width:50%;
        margin:0 auto;
        li {
          margin: 10px 10px;
          padding:10px 0;
          border:1px dashed #303133;
          cursor:pointer;
        }
        a {
            color: #42b983;
        }
    }

</style>
