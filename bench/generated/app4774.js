  import { h, Component, render } from './preact.js?n=4774';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4774!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  