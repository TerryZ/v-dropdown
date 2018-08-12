<template>
    <transition :name="animate">
    <div :class="[dropdownClass,{'v-dropdown-embed': embed}]"
         :style="[styleSheet]"
         v-show="show">
        <slot></slot>
    </div>
    </transition>
</template>

<script>
    export default {
        name: "v-dropdown",
        props:{
            position: {
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
                callerBlur: false,
                lastCaller: null
            };
        },
        computed: {
            animate(){
                let cls = '';
                if(!this.embed){
                    cls = this.dropUp ? 'animate-up' : 'animate-down';
                }
                return cls;
            }
        },
        methods: {
            visible(state, caller){
                if(typeof(state) === 'boolean' && this.show !== state){
                    if(this.show === state) return;
                    if(!this.reOpen && this.callerBlur && state){
                        this.callerBlur = false;
                        return;
                    }

                    this.show = state;
                    let that = this;
                    this.$nextTick(()=>{
                        if(that.show && !that.embed && caller){
                            that.adjust(caller);
                            that.lastCaller = caller;
                        }
                        this.$emit('show-change', that.show);
                    });
                }
            },
            getDir(caller){
                let pos = caller.getBoundingClientRect(),gap = 5, t = 0, u = false;
                let menuPos = this.$el.getBoundingClientRect();
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
            adjust(caller){
                let pos = caller.getBoundingClientRect(), gap = 5, t = 0, l = 0;
                let box = this.$el.getBoundingClientRect();
                let info = this.getDir(caller);

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


                switch (this.position){
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
                let that = this;
                if(this.show){
                    let idx = e.path.findIndex(val=>val.className && val.className.includes(that.dropdownClass));
                    if(!this.reOpen && e.path.find(val=>val === that.lastCaller)) this.callerBlur = true;
                    if(idx === -1) this.visible(false);
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
        mounted(){
            //console.log(this.$el.style.display)
            //console.log(this.caller)
            this.MouseEventPolyfill();
            if(this.width) this.styleSheet.width = this.width + 'px';

            if(this.embed) this.visible(true);
            else{
                document.body.appendChild(this.$el)

                this.$on('show', this.visible);
                this.$on('adjust', this.adjust);
                document.addEventListener('mousedown', this.whole);
            }
        },
        destroyed(){
            if(!this.embed) {
                this.$off('show', this.visible);
                this.$off('adjust', this.adjust);
                document.removeEventListener('mousedown', this.whole);
                this.$el.remove();
            }
        }
    }
</script>

<style lang="scss" scoped>
    div.v-dropdown-container{
        border: 1px solid #D6D7D7;
        margin: 0;
        padding: 0;
        display: inline-block;
        position: absolute;
        top:0;
        left:0;
        vertical-align: middle;
        box-sizing: border-box;
        background-color: white;
        border-radius: 2px;
        box-shadow: 0 3px 12px rgba(0,0,0,0.2);
        -moz-box-shadow: 0 3px 12px rgba(0,0,0,0.2);
        -webkit-box-shadow: 0 3px 12px rgba(0,0,0,0.2);
        z-index: 3000;
        &.sm_regular { width: auto;min-width: 150px; }
        &.sm_embed { position: relative; }
        &.v-dropdown-embed {
            position: relative;
            -webkit-box-shadow: 0 1px 8px rgba(0,0,0,.15);
            box-shadow: 0 1px 8px rgba(0,0,0,.15);
            z-index: 100;
        }
    }

    .animate-down-enter-active {
        -webkit-animation: dropDownFadeInDown 300ms cubic-bezier(.23,1,.32,1);
        animation: dropDownFadeInDown 300ms cubic-bezier(.23,1,.32,1);
    }
    .animate-down-leave-active {
        -webkit-animation: dropDownFadeInDown 200ms cubic-bezier(.23,1,.32,1) reverse;
        animation: dropDownFadeInDown 200ms cubic-bezier(.23,1,.32,1) reverse;
    }

    .animate-up-enter-active {
        -webkit-animation: dropDownFadeInUp 300ms cubic-bezier(.23,1,.32,1);
        animation: dropDownFadeInUp 300ms cubic-bezier(.23,1,.32,1);
    }
    .animate-up-leave-active {
        -webkit-animation: dropDownFadeInUp 150ms cubic-bezier(.23,1,.32,1) reverse;
        animation: dropDownFadeInUp 150ms cubic-bezier(.23,1,.32,1) reverse;
    }

    @keyframes dropDownFadeInDown {
        from{ opacity: 0;transform: translate3d(0, -20px, 0); }
        to{ opacity: 1;transform: translate3d(0, 0, 0); }
    }
    @keyframes dropDownFadeInUp {
        from{ opacity: 0;transform: translate3d(0, 20px, 0); }
        to{ opacity: 1;transform: translate3d(0, 0, 0); }
    }
</style>