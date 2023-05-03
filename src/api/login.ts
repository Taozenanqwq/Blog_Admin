import { request } from './request';
interface RLoginType {
  code: number;
  data: any;
  msg: string;
}

export async function login(data): Promise<RLoginType> {
  return request({
    url: '/admin/login',
    method: 'POST',
    data,
  }) as unknown as Promise<RLoginType>;
}
