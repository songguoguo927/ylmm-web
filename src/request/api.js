// 统一管理接口
import { get, post } from './http'
export const apiStock = p => get('/api/stocks', p); //Home
export const apiRank = p => get('/api/rank', p); //Rank
export const apiSuperWishes = p => get('/api/super_wishs', p); //Post
export const apiProfile = p => get('/api/profile', p); //Profile
export const apiMyOrders = p => get('/api/orders', p); //Order 
export const apiMyDeals = p => get('/api/deals', p); //Deals



export const apiLogin = p => post('/api/users/login', p);
export const apiUser = p => get('/api/user', p);

export const createUser = p => post('/api/users', p);