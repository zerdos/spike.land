  import { h, Component, render } from './preact.js?n=6781';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6781!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  