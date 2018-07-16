import drop from './Dropdown';

const Plugin = {
    install(Vue, options = {}){
        if(Object.keys(options).length){
            if(typeof(options.position)!=='string') drop.props.position.default = options.position;
        }
        Vue.component(drop.name, drop);
    }
};

export default Plugin;