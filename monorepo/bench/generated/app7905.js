  import { h, Component, render } from './preact.js?n=7905';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7905!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  