import { createApp } from 'vue';
import App from './App.vue';
import veilkitPlugin from 'veilkit/vue';
import 'veilkit/styles.css';

const app = createApp(App);
app.use(veilkitPlugin, {
  theme: 'glass',
  animation: 'wave',
});
app.mount('#app');
