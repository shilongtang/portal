export default {
    state: {
        userData: null
    },
    getters:{
      cityCompany(state){
        return state.userData;
      },
    },

    mutations:{
        setUserData(state, data){
          state.userData = data;
        }
    }
}
