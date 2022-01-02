  import { h, Component, render } from './preact.js?n=5251';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5251!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  