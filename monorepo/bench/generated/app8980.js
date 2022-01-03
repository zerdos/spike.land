  import { h, Component, render } from './preact.js?n=8980';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8980!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  