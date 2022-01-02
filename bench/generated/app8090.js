  import { h, Component, render } from './preact.js?n=8090';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8090!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  