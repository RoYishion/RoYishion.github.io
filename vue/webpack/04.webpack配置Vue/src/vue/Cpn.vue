<template>
    <div>
        <h2>cpn组件的标题</h2>
        <p>cpn组件的内容</p>
        <h2>{{name}}</h2>
    </div>
</template>

<script>
    export default {
        name: 'Cpn',
        data() {
            return {
                name: 'Cpn组件的name'
            }
        }
    }
</script>