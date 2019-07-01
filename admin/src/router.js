import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router= new Router({
  mode: 'history',
  // 接口代理
  base: process.env.BASE_URL,
  routes: [
    {
      path:"",
      redirect:'/adminlogin',
    },
    {
      path: '/home',
      name: 'home',
      component: ()=>import('@/views/home')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/news')
    },
    {
      path:'/add',
      name:'add',
      component:()=>import('@/views/add')
    },
    {
      path:'/update/:id',
      name:'update',
      component:()=>import('@/views/update')
    },
    {
      path: '/addnews',
      name: 'addnews',
      component: () => import('@/views/addnews')
    },
    {
      path: '/updatenews/:id',
      name: 'updatenews',
      component: () => import('@/views/updatenews')
    },
    {
      path: '/adminlogin',
      name: 'adminlogin',
      component: () => import('@/views/adminlogin')
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if (to.path=="/adminlogin") {
      next();
  }else if(localStorage.getItem('Admin')){
      next();
  }else{
      next('/adminlogin');
  }
})

export default router;
