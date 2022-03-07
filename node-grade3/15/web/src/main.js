import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/util/permisson";
import store from "./store";

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
  Menu,
  Col,
  Row,
  Message,
  Input,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Table,
  TableColumn,
  Select,
  Loading,
  Option,
  DatePicker
} from "element-ui";


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
Vue.use(Menu);
Vue.use(Row);
Vue.use(Input);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Loading);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
