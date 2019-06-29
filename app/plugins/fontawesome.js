import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { faUserFriends, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faMedium, faLinkedin, faInstagram, faFacebookSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

config.autoAddCss = false

library.add(faMedium, faLinkedin, faInstagram, faFacebookSquare, faTwitterSquare, faUserFriends, faEnvelope)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false