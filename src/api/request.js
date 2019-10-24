import axios from 'axios'

// create an axios instance
const service = axios.create({
    timeout: 5000, // request timeout
	headers: {
		"Content-Type":"application/json"
	}
	//headers:{"authorization":"eyJhbGciOiJIUzUxMiJ9.eyJwYXNzd29yZCI6IjExMTExMTExIiwiaG9zdCI6IjE3Mi4yMC4zNi4xNzgiLCJyZW1lbWJlck1lIjpmYWxzZSwiZXhwIjoxNTQ3NDMzNzMwLCJ1c2VySWQiOiIwMDAwMDAwMDYzYzk2NmVlMDE2M2NlMTNmNzRjMDMyYSIsIlNFQ1JFVCI6IjIwMjRmNWE1MzkyOTQ4Mjc5MjAxOTdlNGQ5YTM2ODJkIiwidXNlcm5hbWUiOiJoZXBqIn0._S5tC21mQXzyUoy5q3ygRdFTVc6X-wewDkBODBpVWFv8HixiZu75rJvnIHcaZfu7Pnzby_T6EoTZqllq2ixPmA"}
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
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
  504: '网关超时。',
};

// response interceptor
service.interceptors.response.use(
	response => {
		if(response.status == 200){
			return response.data;
		}
	},
  error => {
    console.log('err' + error) // for debug
    console.log(error.response ? codeMessage[error.response.status] : error.message)
    return Promise.reject(error)
  }
)

export default service
