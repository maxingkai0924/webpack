<template>
  <div>{{name}}</div>
</template>

<script>
export default {
  data () {
    return {
      name: 'login'
    }
  },
  mounted () {
    console.log(22)
    this.$axios({
      method: 'get',
      url: '/sdm/back/index/getMessage',
      data: {},
      maxRedirects: 10
    }).then((res) => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped="">
</style>
