import { useState } from 'react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setErrors({});
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
                <div className="contact-info__icon">📧</div>
                <h3>Email</h3>
                <p>support@shopall.com</p>
              </div>
              <div className="card contact-info__card">
                <div className="contact-info__icon">📞</div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="card contact-info__card">
                <div className="contact-info__icon">📍</div>
                <h3>Address</h3>
                <p>123 Commerce St, Tech City</p>
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
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
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
                  {errors.subject && <span className="error-text">{errors.subject}</span>}
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
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>
                <button type="submit" className="btn-primary">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="contact-map">
        <div className="container">
          <div className="contact-map__placeholder">
            Map Coming Soon
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
