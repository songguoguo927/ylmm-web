// 统一管理接口
import { get, post } from './http'
export const apiStocksMy = p => get('/api/stocks/'+p+'/my'); //某个stock与我相关的信息
export const apiStocksSelect = p => post('/api/stocks/'+p+'/select'); //已登录的用户 点击是否关注某个stock
export const apiStocksDeSelect = p => post('/api/stocks/'+p+'/deselect'); //已登录的用户 取消关注某个stock
export const apiStocksHoldingRank = p => get('/api/stocks/'+p+'/holding_rank'); //获取应援动态排行
export const apiStockSort = p => get('/api/stocks', p); //Home带分类参数
export const apiStocksCreate = p => post('/api/stocks', p); //TODO创建stock
export const apiStockCode = p => get('/api/stocks/'+p); //带code参数
export const apiStockAll = p => get('/api/stocks',p); //带参数stocksAll  表格查看所有stocks
//patch
//put
//delete 
export const apiLogin = p => post('/api/users/login', p);//用户登录
//11
export const apiLogout = p => post('/api/users/logout', p);//用户登出
// export const apiUsers = p => get('/api/users', p);//TODO
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
export const createUser = p => post('/api/users', p);//注册用户
//注册 123之后本地localStorage存入 token QeX9mSIGDKeLJMq47lrIGFy3ozeWK8M2

export const apiUser = p => get('/api/user', p);//获取当前登录的用户的一些信息//22每次新登入会存入新的token

export const apiProfile = p => get('/api/profile', p); //Profile登录的用户的资产信息
export const apiWishsget = p => get('/api/wishs', p); //许愿中的股票，出现应援动态
export const apiWishs = p => post('/api/wishs', p); //提交许愿表单
export const apiSuperWishes = p => get('/api/super_wishs', p); //Post运营公告栏的信息关于许愿
// export const apiSuperWishesPost = p => post('/api/super_wishs', p); //TODO
export const apiMyOrdersCancel = p => post('/api/orders/'+p+'/cancel'); //Order  p订单号 登录的用户取消提交的某个挂单信息
export const apiMyOrders = p => get('/api/orders/my', p); //Order 登录的用户的挂单列表

export const apiDealsStatus = p =>get('/api/orders',p)//获取某个stock的买卖方的交易动态
export const apiMyOrdersPost = p => post('/api/orders', p); //Order 登录的用户的提交买卖股份的挂单form
export const apiMyDeals = p => get('/api/deals/my', p); //Deals 登录的用户的交易列表table数据
export const apiDeals = p => get('/api/deals', p); //stock详情页的成交记录
//post
// api_deal GET    /api/deals/:id(.:format)                 api/deals#show
//                        PATCH  /api/deals/:id(.:format)                 api/deals#update
//                        PUT    /api/deals/:id(.:format)                 api/deals#update
//                        DELETE /api/deals/:id(.:format)                 api/deals#destroy
export const apiTrendsget = p => get('/api/trends', p); //行情趋势图表数据TODO
//post
// api_trend GET    /api/trends/:id(.:format)                api/trends#show
//                        PATCH  /api/trends/:id(.:format)                api/trends#update
//                        PUT    /api/trends/:id(.:format)                api/trends#update
//                        DELETE /api/trends/:id(.:format)                api/trends#destroy
export const apiRank = p => get('/api/rank', p); //Rank//获取排行榜信息

// export const apiGeetest = p => get('/api/geetest', p);//00--已经干掉惹
// 注册1返回数据{
// success: 1
// gt: "9aa0620f25265733ba5ecf05574a8458"
// challenge: "9c5acb069c478654ba166bddbf2163cb"
// new_captcha: true
// }




