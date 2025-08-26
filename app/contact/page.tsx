import React from 'react'

export default function page() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out!</p>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Message:
          <textarea name="message" />
        </label>
        <button type="submit">Send</button>
      </form>
      <div>
        <h2>Our Address</h2>
        <p>123 Main St, Anytown, USA</p>
      </div>
      <div>
        <h2>Contact Information</h2>
        <p>Email: contact@tripy.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>
      
    </div>
  )
}
