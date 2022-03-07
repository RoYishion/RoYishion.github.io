import Vue from 'vue'
import App from './App.vue'
import router from './router'

import {
  Dialog,
  Button,
  Form,
  FormItem,
  Carousel,
  CarouselItem,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Link,
  MessageBox,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Col,
  Row,
  Message,
  Input,
} from 'element-ui';

Vue.use(Dialog);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Container);
Vue.use(Col);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Link);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Row);
Vue.use(Input);


Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;


new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')