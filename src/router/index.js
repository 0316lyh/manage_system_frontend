import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import("/src/views/WelcomeView.vue"),
      children: [
        {
          path: '',
          name: 'welcome-login',
          component: () => import("/src/components/welcome/LoginPage.vue")
        },
        {
          path: 'register',
          name: 'welcome-register',
          component: () => import("/src/components/welcome/RegisterPage.vue")
        }
      ]
    },
    {
      path: '/index',
      name: 'index',
      redirect: '/index/myinfo',
      component: () => import("/src/views/IndexView.vue"),
      children: [
        {
          path: 'myinfo',
          name: 'myinfo',
          components: {
            header: () => import('/src/components/index/HeaderPage.vue'),
            menu: () => import('/src/components/index/MenuPage.vue'),
            myInfo: () => import('/src/components/index/MyInfoPage.vue')
          }
        },
        {
          path: 'change',
          name: 'change',
          components: {
            header: () => import('/src/components/index/HeaderPage.vue'),
            menu: () => import('/src/components/index/MenuPage.vue'),
            change: () => import('/src/components/index/ChangeInfoPage.vue')
          }
        },
        {
          path: 'news',
          name: 'news',
          components: {
            header: () => import('/src/components/index/HeaderPage.vue'),
            menu: () => import('/src/components/index/MenuPage.vue'),
            news: () => import('/src/components/index/NewsPage.vue')
          }

        },
        {
          path: "news/:id",
          name: 'newsDetails',
          components: {
            header: () => import('/src/components/index/HeaderPage.vue'),
            menu: () => import('/src/components/index/MenuPage.vue'),
            newsDetails: () => import('/src/components/index/NewsDetailsPage.vue')
          }
        }
      ]
    }
  ]

})

export default router
