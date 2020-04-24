<template>
  <div class="box">
    <h1>{{name}}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'home'
    }
  }
}
</script>

<style lang="scss" scoped >
  $width:6.25rem;
  $colors:red;
  $fancybox-width: 6.25rem;
  $fancybox-width: 7.25rem !default;
  @mixin borderRadios {
     border:1px solid #000;
     border-radius: 5px;
  }
  @mixin linkColors($normal,$hover,$visited) {
     color: $normal;
     &:hover { color: $hover; }
     &:visited { color: $visited; }
  }
  .box{
    width: $fancybox-width;
    height: $width;
    background: $colors;
    h1{
      font-size: 16px;
       width:$width;
       height:$width;
       background:orange;
       transform:translate($width,$width);
       @include borderRadios;
       @include  linkColors(blue, red, green)
    }
  }
</style>
