<template>
  
    <m-card :icon="icon" :title="title" :plain1="plain1">
     
        <img :src="ii" v-if="plain1" class="hero-bar mb-3 border-bottom">
        <div class="nav jc-between">
          <div class="nav-item" :class="{active:active === i}"
          v-for="(category,i) in categories" :key="i"
          @click="$refs.list.$swiper.slideTo(i)">
            <div class="nav-link">{{category.name}}</div>
          </div>
        </div>
        <div class="pt-3">
          <swiper ref="list" :options="{autoHeight: true}"
      @slide-change="() => active = $refs.list.$swiper.realIndex">
            <swiper-slide v-for="(category, i) in categories" :key="i">
              
                <slot name="items" :category="category"></slot>
            </swiper-slide>
          </swiper>
        </div>
    </m-card>
</template>

<script>
export default {
  props:{
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true },
    plain1:{ type: Boolean},
  },
  data(){
    return {
      active:0,
      ii:require('../assets/images/898981360562721.jpg'),
      
    }
  }
    

}
</script>

<style>
.hero-bar {
  width:100%;
}
</style>
