// 统一管理接口
import { get, post } from './http'
export const apiLogin = p => post('/api/users/login', p);
export const apiUser = p => get('/api/user', p);
export const apiStock = p => get('/api/stocks', p);
export const createUser = p => post('/api/users', p);