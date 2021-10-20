import Vue from 'vue'

import Empty from './components/Empty.prod.vue.js'
import Passthrough from './components/Passthrough.prod.vue'
import SelectableContent from './components/SelectableContent.prod.vue'

Vue.component('DynamicPage', Passthrough) // Meant to be used in source. Replaced with Passthough
Vue.component('SelectableContent', SelectableContent) // Functional in dev and prod
Vue.component('SelectFile', Empty) // Meant to be used in source. Replaced with Empty
Vue.component('SelectFiles', Empty) // Meant to be used in source. Replaced with Empty
