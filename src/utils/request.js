import axios from 'axios'
import store from '@/store'
const CancelToken = axios.CancelToken
// 创建axios实例
const service = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  timeout: 50000 // 请求超时时间,
})
// request拦截器
service.interceptors.request.use(
  config => {
    let url = config.url.toLowerCase()
    // 若开启mock,且为后端接口未启用，则使用mock
    if (
      window.$config &&
      window.$config.mock &&
      !mocks.includes(url) &&
      !url.includes('.json')
    ) {
      config.url = 'mock/' + url + '.json'
      return config
    } else {
      // config.baseURL = baseurl
      return config
      // 若未登录,且不是登录接口，则取消请求
      // if (!store.getters.isLogin && url.indexOf('login') < 0) {
      //   // window.location.href = '/'
      //   config.cancelToken = new CancelToken(c => c())
      //   return config
      // } else {
      //   let token = sessionStorage.getItem('token')
      //   config.headers.Authorization = token
      //   if (config.method == 'post' && !config.data) {
      //     config.data = true
      //   }
      //   config.paramsSerializer = params => {
      //     return Qs.stringify(params, {
      //       allowDots: true
      //     })
      //   }
      //   return config
      // }
    }
  },

  function(error) {
    return Promise.reject(error)
  }
)
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}
// response 拦截器
service.interceptors.response.use(
  async response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    let url = response.config.url.toLowerCase()
    if (window.$config && window.$config.mock && url.includes('mock')) {
      let Mock = await import('mockjs')
      let data = Mock.mock(response.data)
      return data
    } else {
      const res = response.data
      if (res && res.resultCode && res.resultCode != '0') {
        // Message({
        //   message: res.resultDesc,
        //   type: 'error',
        //   duration: 5 * 1000
        // })
        return Promise.reject(res.resultDesc)
      } else {
        return response.data
      }
    }
  },
  error => {
    let url = error.config.url.toLowerCase()
    if (window.$config && window.$config.mock && !mocks.includes(url)) {
      console.error('开启了mock拦截，但未配置mockjosn', url)
    }
    let msg = error.message
    if (msg === 'Network Error') {
      msg = '连接服务器异常'
    }
    // if (
    //   error.response &&
    //   error.response.data &&
    //   process.env.VUE_APP_MOCK !== 'true'
    // ) {
    //   msg = error.response.data.error
    //   switch (error.response.status) {
    //     case 400:
    //       msg = '参数异常'
    //     case 401:
    //       msg = '登录超时或没有权限'
    //       window.sessionStorage.removeItem('token')
    //       store.dispatch('Login', false)
    //   }
    Message({
      message: error.response
        ? codeMessage[error.response.status]
        : error.message,
      type: 'error',
      duration: 2000
    })
    return Promise.reject(error)
  }
)

export default service
