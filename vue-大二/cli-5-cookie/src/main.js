import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './mock/index'
import '@/util/permisson'

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
  Message,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Col,
  Row,
  Input,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Table,
  TableColumn,
  Loading
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
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Loading);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

new Vue({
  router,
  render: function(h) {return h(App)}
}).$mount('#app')