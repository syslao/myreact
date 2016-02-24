#= require jquery
#= require jquery_ujs
#= require turbolinks
#= require react
#= require react_ujs
#= require_tree ./react
#= require moment
#= require js-routes
#= require nprogress
#= require nprogress-turbolinks
#= require nprogress-ajax



$ ->
  NProgress.configure
    showSpinner: false
    ease: 'ease'
    speed: 500
