  import { h, Component, render } from './preact.js?n=2013';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2013!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  