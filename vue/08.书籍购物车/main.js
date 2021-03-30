const app = new Vue({
    el: '#app',
    data: {
        books: [
            {
                id: 1,
                name: '《算法导论》',
                date: '2003-7',
                price: 85.00,
                count: 1
            },
            {
                id: 2,
                name: '《JavaScript基础教程》',
                date: '2006-4',
                price: 65.00,
                count: 1
            },
            {
                id: 3,
                name: '《三体》',
                date: '2013-9',
                price: 52.00,
                count: 1
            },
            {
                id: 4,
                name: '《UNIX编程艺术》',
                date: '2020-4',
                price: 55.00,
                count: 1
            }
        ]
    },
    methods:{
        // getFinalprice(price){
        //     return '$' + price.toFixed(2)
        // }
        add(index) {
            this.books[index].count ++;
        },
        sub(index) {
            this.books[index].count --;
        },
        removeClick(index) {
            this.books.splice(index, 1);
        }
    },
    computed: {
        AllPrice() {

            // 四种写法

            // let AllPrice = 0;
            // // 1.普通的for循环
            // for(let i = 0; i < this.books.length; i ++){
            //     AllPrice = AllPrice + this.books[i].count * this.books[i].price;
            // };
            // return AllPrice;

            // // 2.for(let i in this.books)
            // for(let i in this.books){
            //     AllPrice = AllPrice + this.books[i].count * this.books[i].price;
            // };
            // return AllPrice;

            // // 3.for(let book of this.books)
            // for(let book of this.books){
            //     AllPrice = AllPrice + book.count * book.price;
            // };
            // return AllPrice;

            // 4.reduce函数
            return this.books.reduce(function (preValue, book){
                return preValue + book.price * book.count
            }, 0)
        }
    },
    filters: {  //过滤器
        showPrice(price){
            return '$' + price.toFixed(2)
        }
    }
})