import './App.css';
import { motion } from "framer-motion";
import { useState } from 'react';

function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false); // New state to track button click
  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 1.75, duration: 0.5 } }
  };

  return (
    <div className="App">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="companyName"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <b>
          Glass
          <motion.span
            className={isHovered ? "material-symbols-outlined bigger-cube" : ""}
            style={{ display: 'inline-block' }}
            animate={{ rotate: isHovered ? 360 : 0, transition: { duration: 0.3 } }}
          >
            {isHovered ? "deployed_code" : "Qb"}
          </motion.span>
        </b>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1.5, type: 'spring', stiffness: 100 }}
        className="descriptionText"
      >
        Click the button to begin your journey with GlassQb.
      </motion.div>

      {!isClicked ? (
        <motion.button
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="ctaButton"
          onClick={() => {
            setIsClicked(true);
          }}
        >
          Get Started
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          className="inputContainer"
        >
          <input type="email" placeholder="Enter your email" className="emailInput" />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="sendButton"
            onClick={() => {
              setIsClicked(true);
            }}
          >
            <span className="material-symbols-outlined sendButton-span">send</span>
          </motion.button>

        </motion.div>
      )}
    </div>
  );
}

export default App;
