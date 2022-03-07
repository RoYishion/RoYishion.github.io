<template>
    <div>
        <h1>Mine 我的地址和书籍</h1>
        <ul>
            <li>
                <router-link to="/Mine/mybooks">我的书籍</router-link>
            </li>
            <li>
                <router-link to="/Mine/myaddress">我的地址</router-link>
            </li>
        </ul>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>