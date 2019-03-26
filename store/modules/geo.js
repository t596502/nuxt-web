const state = () =>({position:{}});

const mutations = {
    ['setPosition'](state,val){
        console.log(val);
        state.position = val
    }
};

const actions = {
    ['setPosition']:({commit},position)=> {
        commit('setPosition', position)
    }
};

export default {namespaced: true, state,mutations,actions}

