import { useState } from 'react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.subject && form.message) {
      setSubmitted(true);
    }
  };

  return (
    <div>
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We would love to hear from you. Send us a message and we will respond as soon as possible.</p>
        </div>
      </section>

      <section className="contact-main">
        <div className="container contact-main__content">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <div className="contact-info__cards">
              <div className="card contact-info__card">
                <div className="contact-info__icon">@</div>
                <h3>Email</h3>
                <p>support@shopall.com</p>
              </div>
              <div className="card contact-info__card">
                <div className="contact-info__icon">#</div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="card contact-info__card">
                <div className="contact-info__icon">*</div>
                <h3>Address</h3>
                <p>123 ShopAll Street, Commerce City, CA 90210</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h2>Send a Message</h2>
            {submitted ? (
              <div className="contact-success">
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <div className="contact-form">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={5}
                  />
                </div>
                <button className="btn-primary" onClick={handleSubmit}>Send Message</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
