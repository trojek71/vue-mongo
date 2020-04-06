import Vue from 'vue'
import App from './App.vue'
import ApolloClient from "apollo-boost"
import VueApollo from "vue-apollo"
require('dotenv').config()

Vue.config.productionTip = false

const apolloClient = new ApolloClient({
  uri: "http://192.168.1.5:4000/graphql"
  // process.env.URI
  
  
})

Vue.use(VueApollo)
    const apolloProvider = new VueApollo({
      defaultClient: apolloClient,
    })


new Vue({
  render: h => h(App),
  apolloProvider,
  
}).$mount('#app')
