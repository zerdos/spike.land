  import { h, Component, render } from './preact.js?n=5163';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5163!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  