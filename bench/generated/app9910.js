  import { h, Component, render } from './preact.js?n=9910';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9910!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  