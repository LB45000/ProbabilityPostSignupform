import React, { useState } from 'react';
import './SignupForm.css';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        email,
        name,
      })
    })
    .then(() => setMessage('Thank you for signing up!'))
    .catch(error => alert(error));
    
    setEmail('');
    setName('');
  };

  return (
    <div className="signup-container">
      <h1>The Probability Post</h1>
      <p>Regress to the mean of statistical excellence - subscribe now</p>
      <form
        onSubmit={handleSubmit}
        name="newsletter-signup"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        className="signup-form"
      >
        <input type="hidden" name="form-name" value="newsletter-signup" />
        <input type="hidden" name="bot-field" />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">Subscribe</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SignupForm;
