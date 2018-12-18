<template>
    <transition :name="animate">
    <div :class="[dropdownClass,{'v-dropdown-embed': embed}]" :style="[styleSheet]" v-show="show">
        <slot></slot>
    </div>
    </transition>
</template>

<script>
    export default {
        name: "v-dropdown",
        props:{
            align: {
                type: String,
                default: 'left'
            },
            embed: {
                type: Boolean,
                default: false
            },
            rightClick: {
                type: Boolean,
                default: false
            },
            /**
             * when the drop-down container is already open, whether to open the drop-down container
             * again after clicking the caller
             */
            reOpen: {
                type: Boolean,
                default: false
            },
            animated: {
                type: [String, Boolean],
                default: true
            },
            /**
             * the width of drop down menu
             * min-width: 80
             */
            width: Number,
            x: Number,
            y: Number
        },
        data(){
            return {
                show: false,
                styleSheet: { top: '',left: '' },
                dropdownClass: 'v-dropdown-container',
                dropUp: false,
                lastCaller: null
            };
        },
        computed: {
            animate(){
                let cls = '';
                if(!this.embed && this.animated) cls = this.dropUp ? 'animate-up' : 'animate-down';
                if(typeof this.animated === 'string') cls = this.animated;
                return cls;
            }
        },
        methods: {
            visible(caller){
                let dir = null;
                this.$nextTick(()=>{
                    //calculation show direction(up or down) and top axis
                    if(!this.show && !this.embed && caller) {
                        dir = this.getDir(caller);
                        this.dropUp = dir.up;
                    }

                    this.show = !this.show;

                    this.$nextTick(()=>{
                        if(this.show && !this.embed && caller){
                            this.adjust(caller, dir);
                            this.lastCaller = caller;
                        }
                    });
                    this.$emit('show-change', this.show);
                });
            },
            //get container show up direction and top axis
            getDir(caller){
                let pos = caller.getBoundingClientRect(),gap = 5, t = 0, u = false, menuPos = null;

                if(this.show) menuPos = this.$el.getBoundingClientRect();
                else{
                    //change hide drop down container way from 'display:none' to 'visibility:hidden',
                    //be used for get width and height
                    this.$el.style.visibility = 'hidden';
                    this.$el.style.display = 'inline-block';
                    menuPos = this.$el.getBoundingClientRect();
                    //restore style
                    this.$el.style.visibility = 'visible';
                    this.$el.style.display = 'none';
                }

                let scrollTop = window.pageYOffset, viewHeight = document.documentElement.clientHeight;
                let srcTop = this.rightClick ? this.y : pos.top + scrollTop;

                t = this.rightClick ? this.y : pos.top + pos.height + gap + scrollTop;
                let overDown = false, overUp = false;
                //list over screen
                if((t + menuPos.height) > (scrollTop + viewHeight)) overDown = true;
                if((srcTop - gap - menuPos.height) < 0) overUp = true;

                if(!overUp && overDown){
                    t = srcTop - gap - menuPos.height;
                    u = true;
                }
                return {top: t, up: u};
            },
            adjust(caller, direction){
                let pos = caller.getBoundingClientRect(), t = 0, l = 0,
                    box = this.$el.getBoundingClientRect(),
                    info = direction && Object.keys(direction).length?direction:this.getDir(caller);

                this.dropUp = info.up;
                t = info.top;

                let scrollLeft = window.pageXOffset,
                    viewWid = document.documentElement.clientWidth,
                    wid = this.rightClick ? 0 : pos.width,
                    //align left's left
                    left = this.rightClick ? this.x : pos.left + scrollLeft,
                    //align center's left
                    center = (left + (wid / 2)) - (box.width / 2),
                    //align right's left
                    right = (left + wid) - box.width;

                switch (this.align){
                    case 'left':
                        l = (left + box.width) > (scrollLeft + viewWid) ? right : left;
                        break;
                    case 'center':
                        if((center + box.width) > (scrollLeft + viewWid)) l = right;
                        else if(right < scrollLeft) l = left;
                        else l = center;
                        break;
                    case 'right':
                        l = (right < scrollLeft) ? left : right;
                        break;
                }

                this.styleSheet.top = t + 'px';
                this.styleSheet.left = l + 'px';
            },
            whole(e){
                if(this.show){
                    let callerClick = false, idx = e.path.findIndex(val=>val.className &&
                        typeof val.className === 'string' &&
                        val.className.includes(this.dropdownClass));
                    if(!this.reOpen && e.path.find(val=>val === this.lastCaller) && !this.rightClick) callerClick = true;
                    if(idx === -1 && !callerClick) this.visible();
                }
            },
            MouseEventPolyfill(){
                if (!('path' in Event.prototype)) {
                    Object.defineProperty(Event.prototype, 'path', {
                        get() {
                            const path = [];
                            let currentElem = this.target;
                            while (currentElem) {
                                path.push(currentElem);
                                currentElem = currentElem.parentElement;
                            }
                            if (path.indexOf(window) === -1 && path.indexOf(document) === -1) path.push(document);
                            if (path.indexOf(window) === -1) path.push(window);
                            return path;
                        }
                    });
                }
            }
        },
        created(){
            this.MouseEventPolyfill();
        },
        mounted(){
            if(this.width) this.styleSheet.width = this.width + 'px';

            if(this.embed) this.visible();
            else{
                document.body.appendChild(this.$el);

                this.$on('show', this.visible);
                this.$on('adjust', this.adjust);
                document.body.addEventListener('mousedown', this.whole);
            }
        },
        destroyed(){
            if(!this.embed) {
                document.body.removeEventListener('mousedown', this.whole);
                this.$off('show', this.visible);
                this.$off('adjust', this.adjust);
                this.$el.remove();
            }
        }
    }
</script>

<style lang="scss">
    div.v-dropdown-container{
        border: 1px solid #D6D7D7;
        margin: 0;padding: 0;
        display: inline-block;
        position: absolute;top:0;left:0;
        vertical-align: middle;
        box-sizing: border-box;
        background-color: white;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        -webkit-box-shadow: 0 3px 12px rgba(0,0,0,0.2);
        -moz-box-shadow: 0 3px 12px rgba(0,0,0,0.2);
        box-shadow: 0 3px 12px rgba(0,0,0,0.2);
        z-index: 3000;
        &.v-dropdown-embed {
            position: relative;
            -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.05);
            box-shadow: 0 1px 3px rgba(0,0,0,.05);
            z-index: 100;
        }
    }

    .animate-down-enter-active {
        will-change: opacify, transform;
        -webkit-animation: dropDownFadeInDown 300ms cubic-bezier(.23,1,.32,1);
        animation: dropDownFadeInDown 300ms cubic-bezier(.23,1,.32,1);
    }
    .animate-down-leave-active {
        will-change: opacify, transform;
        -webkit-animation: dropDownFadeInDown 200ms cubic-bezier(.23,1,.32,1) reverse;
        animation: dropDownFadeInDown 200ms cubic-bezier(.23,1,.32,1) reverse;
    }

    .animate-up-enter-active {
        will-change: opacify, transform;
        -webkit-animation: dropDownFadeInUp 300ms cubic-bezier(.23,1,.32,1);
        animation: dropDownFadeInUp 300ms cubic-bezier(.23,1,.32,1);
    }
    .animate-up-leave-active {
        will-change: opacify, transform;
        -webkit-animation: dropDownFadeInUp 150ms cubic-bezier(.23,1,.32,1) reverse;
        animation: dropDownFadeInUp 150ms cubic-bezier(.23,1,.32,1) reverse;
    }

    @keyframes dropDownFadeInDown {
        from{ opacity: 0;transform: translate3d(0, -20px, 0);-webkit-transform: translate3d(0, -20px, 0); }
        to{ opacity: 1;transform: translate3d(0, 0, 0);-webkit-transform: translate3d(0, 0, 0); }
    }
    @keyframes dropDownFadeInUp {
        from{ opacity: 0;transform: translate3d(0, 20px, 0);-webkit-transform: translate3d(0, 20px, 0); }
        to{ opacity: 1;transform: translate3d(0, 0, 0);-webkit-transform: translate3d(0, 0, 0); }
    }
</style>