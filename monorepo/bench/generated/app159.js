  import { h, Component, render } from './preact.js?n=159';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 159!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  