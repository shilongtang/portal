export default {
    state: {
        userData: null
    },
    getters:{
    
    },
    mutations:{
        setUserData(state){
        state.userData = JSON.parse(sessionStorage.getItem('userData'));
        }
    }
}