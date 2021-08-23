import {
  createStore
} from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    beneficiarios: [],
    token: localStorage.getItem('token') || '',
    page: 1,
    records: null,
    per_page: null,
    buscar: false,
    search_keyword: ''
  },
  mutations: {
    add_beneficiarios(state, payload) {
      state.beneficiarios = payload.data
    },
    updateToken(state, payload) {
      state.token = payload
    },
    destroyToken(state, payload) {
      state.token = ''
    },
    incrementPage(state, payload) {
      state.page = payload
    }
  },
  actions: {

    async get_beneficiarios({
      commit,
      state
    }) {
      let vm = this
      console.log(state.page);

      axios.defaults.adapter = require('axios/lib/adapters/http')
      let url = null
      let isnum = /^\d+$/.test(state.search_keyword);
      if (isnum) {
        url = `http://localhost:8000/api/personas/?numero_adra=${state.search_keyword}&page=${state.page}`
      } else {
        url = `http://localhost:8000/api/personas/?nombre_apellido=${state.search_keyword}&page=${state.page}`
      }


      console.log(url);
      let count = 0;
      if (state.buscar) {
        console.log("en modo busqueda");
       

        await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${state.token}`,
          }
        }).then((result) => {
          console.log(result.data);
          count = 0;
          count = parseInt(result.data.count)
         

          let data = {
            "data": result.data.results
          }
          state.beneficiarios = []
          commit('add_beneficiarios', data)


        })



      } else {
        console.log("en modo general");

        await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${state.token}`,
          }
        }).then((result) => {
          console.log(result.data);
          count = 0;
          count = parseInt(result.data.count)
          let data = {
            "data": result.data.results
          }
          state.beneficiarios = []
          commit('add_beneficiarios', data)
          // console.log("despues ");

        })
      }
        console.log(count);
      state.records = Math.ceil(count / 20) 
      state.per_page = 20




    },
    // async get_beneficiario({
    //   commit,
    //   state
    // }, val) {

    //   axios.defaults.adapter = require('axios/lib/adapters/http')
    //   let url = null
    //   let isnum = /^\d+$/.test(val);
    //   if (isnum) {
    //     console.log("223");
    //     url = `http://localhost:8000/api/personas/?numero_adra=${val}`
    //   } else {
    //     console.log("2222223");
    //     url = `http://localhost:8000/api/personas/?nombre_apellido=${val}`
    //   }

    //   await axios.get(url, {
    //     headers: {
    //       'Authorization': `Bearer ${state.token}`,
    //     }
    //   }).then((result) => {
    //     console.log(result.data);
    //     // console.log(state.page);
    //     // if (state.records == 0) {
    //     //   state.records = parseInt(result.data.count)
    //     //   state.per_page = result.data.results.length
    //     // }



    //     // let data = {
    //     //   "data": result.data.results
    //     // }
    //     // commit('add_beneficiarios', data)
    //     // console.log(state.records);
    //     // console.log(state.per_page);
    //   })
    // },
    async userLogin({
      commit,
      state,
      dispatch
    }, userCredenciales) {
      return await new Promise((resolve, reject) => {
        axios.post("http://localhost:8000/api/token/", {
          username: userCredenciales.username,
          password: userCredenciales.password

        }).then((result) => {
          console.log(result.data);

          var base64Url = result.data.access.split('.')[1];
          var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));

          console.log(JSON.parse(jsonPayload));
          // return JSON.parse(jsonPayload);

          const token = result.data.access
          commit('updateToken', result.data.access)
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token

          if (state.token !== '') {
            dispatch("get_beneficiarios");

          }

          resolve(result)
        }).catch(err => {
          console.log(err);
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    userLogout({
      commit,
      getters
    }) {
      if (getters.logginIn) {
        return new Promise((resolve, reject) => {
          commit('destroyToken')
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          resolve()
        })

      }
    },
    paginate_control({
      commit,
      state,
      dispatch
    }, page) {

      commit("incrementPage", page);
      dispatch("get_beneficiarios");



    },
    filteredDataByNumeroAdra({
      state
    }, numero_adra) {
      return state.beneficiarios.filter((el) => el.numero_adra == numero_adra)


    },



  },
  getters: {
    logginIn(state) {
      return state.token !== ''
    },
    get_beneficario_data: (state) => (id) => {
      return state.beneficiarios.find(todo => todo.id === id)
    },



  },

  modules: {}
})