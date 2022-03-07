import Mock from 'mockjs';
import '@/mock/login';
Mock.setup({
    timeout: 1000  //设置延迟响应，模拟向后端请求数据
})