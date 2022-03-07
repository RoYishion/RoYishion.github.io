<template>
    <div id="con">
        <div class="circle">
            <div>
                <span class="block"></span>
                <span>502</span>
                <span class="block"></span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #con {
        margin: 0 auto;
        width: 200px;
        height: 200px;
        position: relative;
    }

    .circle {
        width: 200px;
        height: 200px;
        border-radius: 200px;
        border: 15px solid red;
    }

    .circle > div {
        color: red;
        font: bolder 50px arial;
        position: absolute;
        top: 80px;
        left: 70px;
    }
</style>