import Vue from "vue"

import App from "./components/App.vue"

import "./styles/index.scss"
import "bootstrap/scss/bootstrap.scss"
import "@fortawesome/fontawesome-free/js/all.js"

const app = new Vue({
  el: "#app",
  components: {
    App,
  },
})
