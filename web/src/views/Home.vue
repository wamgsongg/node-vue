<template>
    <div>
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide>
          <img class="w-100" src="../assets/images/7e21ae26c9cfca91953e3e3dfc51879b.jpeg" alt="" srcset="">
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/images/471bcf301b5ce177768097d30156a5b7.jpeg" alt="" srcset="">
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/images/b3d9f3b40ea5f3136adb87e05faaae63.png" alt="" srcset="">
        </swiper-slide>
        <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
      </swiper>
          <!-- 幻灯片结束 -->
      <div class="nav-icons bg-white mt-3  text-center pt-3 text-dark-1">
        <div class="d-flex flex-wrap shrink-view"
        > 
          <div class="nav-item mb-3"
          v-for="n in content" :key="n">
          <i class="sprite sprite-news"></i>
            <div class="py-2">爆料站</div>
          </div>
        </div>
        <div class="bg-light py-2 fs-sm ">
          <i class="sprite sprite-arrow mr-1" @click="changeStatus"></i>
          <i></i>
          <span>{{status}}</span> 
        </div>
      </div>
      <!-- icon结束 -->

 
      
      <m-list-card icon="menu" title="新闻资讯" :categories="newsCats">
        <template #items="{category}">
          <router-link 
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
            <span class="text-info">[{{news.categoryName}}]</span>
            <span class="px-2">|</span>
            <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
            <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
          </router-link >
        </template>
       
      </m-list-card>

      <m-list-card plain1 icon="card-hero" title="英雄列表" :categories="heroCats">
        <template #items="{category}">
          <div class="d-flex flex-wrap" style="margin:0 -0.5rem;">
            <router-link
              tag="div"
              :to="`/heroes/${hero._id}`"
             class="p-2 text-center" 
            style="width: 20%;"
            v-for="(hero,i) in category.heroList" :key="i">
              
              <img :src="hero.avatar" class="w-100">
              <div>{{hero.name}}</div>
            </router-link>
          </div>
          
        </template>
       
      </m-list-card>

 
      <m-card icon="menu" title="精彩视频"></m-card>
      <m-card icon="menu" title="图文攻略"></m-card>

    </div>
</template>


<script>
import dayjs from "dayjs"
export default {

    filters:{
      date(value) {
        return dayjs(value).format('MM/DD')
      }
    },
     data() {
      return {
        content:4,
        status:'展开',
        swiperOptions: {
          pagination: {
            el: '.pagination-home'
          },
          // Some Swiper option/callback...
        },
        
        newsCats:[],
        heroCats:[],
      };
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
     
      this.swiper.slideTo(3, 3000,false)
    
    },
    methods: {  
      changeStatus(){
        if(this.content === 4){
          this.content=10
          this.status='收起'
        }else if(this.content ===10){
          this.content=4
          this.status='展开'
        }
 
      },
      
      async fetchNewsCats(){
        const res = await this.$http.get('news/list')
        this.newsCats = res.data
      },
      async fetchHeroCats(){
        const res = await this.$http.get('heroes/list')
        this.heroCats = res.data
      },
    },
    created() {
      this.fetchNewsCats()
      this.fetchHeroCats()
    }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.pagination-home {

   .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top:1px solid $border-color;
  border-bottom:1px solid $border-color;
  .nav-item{
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n){
      border-right: none;
    }
  }
  .shrink-view{
    overflow: hidden;
  }
}
</style>