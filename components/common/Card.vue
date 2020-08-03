<template>
    <li :style="`background-image: url('${getImgUrl({name: film.backdrop_path, imageSize: 0})}')`" @mouseenter="hover($event, 'in')" @mouseleave="hover($event, 'out')" class="film">
        <div class="filter"/>
        <div class="left">
            <img :alt="film.title" :src="`${getImgUrl({name: film.poster_path, imageSize: 1})}`">
        </div>
        <div class="right">
            <p class="title" v-html="film.title"/>
            <p class="date" v-html="getDate(film.release_date)"/>
        </div>
    </li>
</template>

<script>
    import {gsap} from 'gsap';
    import {imgOptions} from "../../mixins/generalMixin";
    import moment from 'moment'

    export default {
        name: "Card",
        mixins: [imgOptions],
        data() {
            return {
                anim: gsap.timeline({paused: true})
            }
        },
        mounted() {
            this.anim = gsap.timeline({paused: true})
                .to(this.$el.querySelector('.filter'), .6, {
                    x: 0
                })
                .to(this.$el.querySelector('.left img'), .5, {
                    y: 0,
                    opacity: 1
                }, "-=.4")
                .to(this.$el.querySelector('.right .title'), .2, {
                    y: 0,
                    opacity: 1
                }, "-=.2")
                .to(this.$el.querySelector('.right .date'), .2, {
                    y: 0,
                    opacity: 1
                }, "-=.1")
        },
        props: {
            film: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        methods: {
            hover(e, type) {
                if (type === 'in') {
                    this.anim.play()
                } else if (type === 'out') {
                    this.anim.reverse()
                }
            },
            getDate(date) {
                return moment(date).format('LL')
            }
        }
    }
</script>


<style lang="scss" scoped>
    li {
        display             : flex;
        width               : 50%;
        height              : 25vw;
        position            : relative;
        background-size     : cover;
        background-position : center;
        padding             : 2.5vw;
        box-sizing          : border-box;
        overflow            : hidden;
        .filter {
            content    : '';
            position   : absolute;
            left       : 0;
            top        : 0;
            width      : 100%;
            height     : 100%;
            background : linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, .8) 100%);
            transform  : translateX(-100%);
        }
        .left, .right {
            display  : flex;
            flex     : 1;
            height   : 100%;
            position : relative;
            z-index  : 5;
        }
        .left {
            img {
                height        : 100%;
                margin        : auto;
                border-radius : 10px;
                box-shadow    : 0 0 10px 0 rgba(0, 0, 0, 0.5);
                opacity       : 0;
                transform     : translateY(-20px);
            }
        }
        .right {
            flex-direction  : column;
            align-items     : center;
            justify-content : center;
            text-align      : center;
            p {
                opacity   : 0;
                transform : translateY(-20px);
            }
            .title {
                text-transform : uppercase;
                font-weight    : 700;
                letter-spacing : 1px;
            }
        }
    }
</style>
