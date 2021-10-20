import Vue from 'vue'

import SelectFile from './components/SelectFile.dev.vue'
import SelectFiles from './components/SelectFiles.dev.vue'
import DynamicPage from './components/DynamicPage.dev.vue'
import SelectableContent from './components/SelectableContent.dev.vue'

import './style.scss'

Vue.component('SelectFile', SelectFile)
Vue.component('SelectFiles', SelectFiles)
Vue.component('DynamicPage', DynamicPage)
Vue.component('SelectableContent', SelectableContent)

<% if (!options.customizeComponenets.includes('CreateDynamicPage')) { %>
  import CreateDynamicPage from './components/customizable/CreateDynamicPage.dev.vue'
  Vue.component('CreateDynamicPage', CreateDynamicPage)
<% } %>

<% if (!options.customizeComponenets.includes('DeleteDynamicPage')) { %>
  import DeleteDynamicPage from './components/customizable/DeleteDynamicPage.dev.vue'
  Vue.component('DeleteDynamicPage', DeleteDynamicPage)
<% } %>
