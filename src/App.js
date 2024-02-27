import './App.css';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';

const finalText = "You'll hear from us soon!";

function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailSent, setEmailSent] = useState(sessionStorage.getItem("email-sent") === "true");
  const [showEmailSent, setShowEmailSent] = useState(emailSent);
  const [animateEmailSent, setAnimateEmailSent] = useState(false);

  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 1.5, duration: 0.5 } }
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setValidEmail(emailRegex.test(email));
  }, [email]);

  const sendEmail = () => {
    // TODO: Actually send email
  }

  const validateEmail = () => {
    if (validEmail) {
      console.log("Email sent!");
      sessionStorage.setItem("email-sent", true);

      setEmailSent(true);
      setEmailError(false);
      setTimeout(() => {
        setShowEmailSent(true);
      }, 500);

      setAnimateEmailSent(true);
      setTimeout(() => {
        setAnimateEmailSent(false);
      }, 500);

      sendEmail();
    } else {
      console.log("Invalid email address");

      setEmailSent(false);
      setEmailError(true);
    }
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
            className={(isHovered || emailSent) ? "material-symbols-outlined bigger-cube" : ""}
            style={{ display: 'inline-block' }}
            animate={{ rotate: (isHovered || animateEmailSent) ? 360 : 0, transition: { duration: 0.3 } }}
          >
            {(isHovered || emailSent) ? "deployed_code" : "Qb"}
          </motion.span>
        </b>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, delay: 1.5, type: 'spring', stiffness: 100 }}
        className="descriptionText"
      >
        Click the button to begin your journey with GlassQb.
      </motion.div>

      {(!isClicked && !emailSent) ? (
        <motion.button
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
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
        !showEmailSent ? (
          <AnimatePresence>
            {!emailSent && <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="inputContainer"
            >
              <motion.input
                initial={{ fontSize: "1.2rem", hieght: "18px" }}
                type="email" 
                placeholder={"Enter your email"}
                className="emailInput"
                whileHover={ email === "" ? { fontSize: "1.3rem", height: "18px" } : {} }
                onChange={(e) => setEmail(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    validateEmail();
                  }
                }}
              />
              <motion.div
                className="sendButton"
                onClick={() => {
                  setIsClicked(true);
                }}
              >
                <motion.span
                  className="material-symbols-outlined sendButton-span"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={validateEmail}
                >
                  send
                </motion.span>
              </motion.div>
            </motion.div>}
          </AnimatePresence>
        ) : (
          <motion.div
            className="emailSent"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            >
            <p
              style={{
                animation: `typewriter 1.5s steps(${finalText.length}) 1s 1 normal both, blinkTextCursor 500ms steps(${finalText.length}) infinite normal`,
                '--final-text-length': `${finalText.length*0.545}em`
              }}
            >{finalText}</p>
          </motion.div>
        )
      )}

      {emailError && isClicked ? (
      <motion.p
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="errorMessage"
      >
        Is that your email address?
      </motion.p>
      ) : (
        <p className="errorMessage transparent">&nbsp;</p>
      )}

    </div>
  );
}

export default App;
