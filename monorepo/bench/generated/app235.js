  import { h, Component, render } from './preact.js?n=235';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 235!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  