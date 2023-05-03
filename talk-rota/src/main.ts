import { createApp } from 'vue'

import App from './App.vue'
import { useKineticUI } from "@cambridgekineticsltd/kinetic-ui";
import "@cambridgekineticsltd/kinetic-ui/dist/style.css";
import "./styles/font-awesome-6.css";

const app = createApp(App).mount('#app')

useKineticUI();