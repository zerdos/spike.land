  import { h, Component, render } from './preact.js?n=7764';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7764!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  