import Vue from 'vue';
import { Notyf } from 'notyf';

Vue.prototype.$notify = new Notyf({
  duration: 5000,
  dismissible: true,
  position: {
    x: 'right',
    y: 'top',
  },
  types: [
    {
      type: 'success',
      background: '#4cd137',
      icon: {
        color: '#fff',
        className: 'fal fa-fa fa-check',
        tagName: 'i',
      },
    },
    {
      type: 'error',
      background: '#e84118',
      icon: {
        color: '#fff',
        className: 'fal fa-fa fa-times',
        tagName: 'i',
      },
    },
  ],
});
