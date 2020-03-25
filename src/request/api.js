// 统一管理接口
import { get, post } from './http'
export const apiStock = p => get('/api/stocks', p); //Home
export const apiStocks = p => get('/api/stocks/'+p); 
export const apiStocksHoldingRank = p => get('/api/stocks/'+p+'/holding_rank'); 
export const apiStocksMy = p => get('/api/stocks/'+p+'/my'); 
export const apiStocksSelect = p => post('/api/stocks/'+p+'/select'); 
export const apiStocksDeSelect = p => post('/api/stocks/'+p+'/deselect'); 
export const apiDealsStatus = p =>get('/api/orders',p)
export const apiRank = p => get('/api/rank', p); //Rank
export const apiSuperWishes = p => get('/api/super_wishs', p); //Post
export const apiProfile = p => get('/api/profile', p); //Profile
export const apiMyOrders = p => get('/api/orders/my', p); //Order 
export const apiMyOrdersPost = p => post('/api/orders', p); //Order 
export const apiMyOrdersdeal = p => get('/api/orders/my', p); //Order 
export const apiMyOrdersCancel = p => post('/api/orders/'+p+'/cancel'); //Order  p订单号
export const apiMyDeals = p => get('/api/deals', p); //Deals

// export const apiGeetest = p => get('/api/geetest', p);//00--已经干掉惹
// 注册1返回数据{
// success: 1
// gt: "9aa0620f25265733ba5ecf05574a8458"
// challenge: "9c5acb069c478654ba166bddbf2163cb"
// new_captcha: true
// }

export const createUser = p => post('/api/users', p);
//注册 123之后本地localStorage存入 token QeX9mSIGDKeLJMq47lrIGFy3ozeWK8M2
export const apiLogin = p => post('/api/users/login', p);
//11
export const apiLogout = p => post('/api/users/logout', p);
export const apiUser = p => get('/api/user', p);//22每次新登入会存入新的token
//3返回参数
// {
// id: 1498
// name: "test1"
// nick_name: "test1"
// balance: 1000000
// address: "087P0AMM5VJvQ6iQpY83x0HztXMa0hnqYB"
// wish_count: 0
// wish_limit: 100
// }
