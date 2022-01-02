  import { h, Component, render } from './preact.js?n=9415';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9415!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  