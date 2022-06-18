<template id="my-book">
  <div>
    <h2>书籍列表</h2>
    <myTable
      v-bind:table-head="bookHead"
      v-bind:table-body="books"
      v-bind:new-add="newbook"
    >
      <template v-slot:item="slotProps">
        <button type="button" @click="delBook(slotProps.item)">删除</button>
        <button
          class="button-color1"
          @click="change(slotProps.item)"
          v-show="!slotProps.item.isEdit"
        >
          编辑
        </button>
        <button
          class="button-color2"
          @click="change(slotProps.item)"
          v-show="slotProps.item.isEdit"
        >
          完成
        </button>
      </template></myTable
    >
  </div>
</template>

<template v-slot:add="slotProps">
  <input type="text" v-model="newbook.author" placeholder="请输入作者" />
  <input type="text" v-model="newbook.name" placeholder="请输入书名" />
  <input type="text" v-model="newbook.price" placeholder="请输入价格" />
  <input
    type="text"
    v-model="newbook.publishDate"
    placeholder="请输入出版日期"
  />
  <button @click="addBook()">添加</button>
</template>
</myTable>
</div>
</template>

<script>
import myTable from "../components/myTable";

export default {
  name: "mybooks",
  data() {
    return {
      bookHead: {
        author: "作者",
        name: "书名",
        price: "价格",
        publishDate: "出版日期",
      },
      newbook: {
        id: 0,
        author: "",
        name: "",
        price: "",
        publishDate: "",
        isEdit: false,
      },
      books: [
        {
          id: 1,
          author: "曹雪芹",
          name: "红楼梦",
          price: 32.0,
          publishDate: "1300-01-01",
          isEdit: false,
        },
        {
          id: 2,
          author: "施耐庵",
          name: "水浒传",
          price: 30.0,
          publishDate: "1900-01-01",
          isEdit: false,
        },
        {
          id: 3,
          author: "罗贯中",
          name: "三国演义",
          price: 24.0,
          publishDate: "1700-01-01",
          isEdit: false,
        },
        {
          id: 4,
          author: "吴承恩",
          name: "西游记",
          price: 20.0,
          publishDate: "1500-01-01",
          isEdit: false,
        },
      ],
    };
  },
  components: {
    myTable,
  },
  methods: {
    delBook(obj) {
      this.books.forEach((books, index) => {
        if (books.id == obj.id) {
          this.books.splice(index, 1);
        }
      });
    },
    change(obj) {
      this.books.forEach((book, index) => {
        if (book.id == obj.id) {
          this.books[index].isEdit = !this.books[index].isEdit;
        }
      });
    },
    addBook() {
      this.newbook.id = this.books.length + 1;
      this.books.push(this.newbook);
      this.newbook = {
        id: 0,
        author: "",
        name: "",
        price: "",
        publishDate: "",
        isEdit: false,
      };
    },
  },
};
</script>

<style>
.button-color1 {
  color: red;
}

.button-color2 {
  color: blue;
}
</style>