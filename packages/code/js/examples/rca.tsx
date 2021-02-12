  import { motion } from 'framer-motion';

  export default () => (
    <header
      css={`
        background-color: #282c34;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        color: white;
        text-align: center;
        overflow: hidden;
      `}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          loop: Infinity,
        }}>
        <div css="font-size: calc(10px + 20vmin)">⚛️</div>
      </motion.div>
      <p>
        Hey! Try to modify the <code>code</code>.
      </p>

      <a css="color: #61dafb;" href="https://reactjs.org">
        Learn ❤️ React ❤️
      </a>
    </header>
  );
