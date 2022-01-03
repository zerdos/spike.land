  import { h, Component, render } from './preact.js?n=4943';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4943!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  