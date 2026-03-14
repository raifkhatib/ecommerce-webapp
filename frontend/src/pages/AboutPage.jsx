export default function AboutPage() {
  return (
    <main>
      <section className="about-hero">
        <div className="container">
          <h1>About ShopAll</h1>
          <p>Discover the story behind your favorite online store.</p>
        </div>
      </section>

      <section className="about-story">
        <div className="container about-story__content">
          <div className="about-story__text">
            <h2>Our Story</h2>
            <p>
              ShopAll started with a simple idea: make everyday shopping easier and more enjoyable.
              What began as a small catalog of essentials has grown into a trusted marketplace with
              thousands of curated picks across every major category.
            </p>
            <p>
              We listen closely to our customers, refine our collection, and partner with reliable
              brands to ensure every delivery feels effortless. From your first order to your tenth,
              we focus on speed, quality, and care.
            </p>
          </div>
          <div className="about-story__image">
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80"
              alt="ShopAll team preparing online orders"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="about-mission">
        <div className="container">
          <h2>Our Mission</h2>
          <p className="about-mission__intro">
            Build a shopping experience that feels personal, dependable, and refreshingly simple for
            every customer, every time.
          </p>
          <div className="about-mission__cards">
            <div className="card mission-card">
              <div className="mission-icon">
                <span className="mission-icon-text">★</span>
              </div>
              <h3>Quality</h3>
              <p>Curated products backed by dependable quality and consistency.</p>
            </div>
            <div className="card mission-card">
              <div className="mission-icon">
                <span className="mission-icon-text">♦</span>
              </div>
              <h3>Trust</h3>
              <p>Secure shopping, transparent policies, and reliable support.</p>
            </div>
            <div className="card mission-card">
              <div className="mission-icon">
                <span className="mission-icon-text">►</span>
              </div>
              <h3>Innovation</h3>
              <p>Modern experiences with continuous improvements that save time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <h2>Our Values</h2>
          <div className="about-values__grid">
            <div className="card feature-card">
              <div className="feature-icon">
                <span className="mission-icon-text">◎</span>
              </div>
              <h3>Customer First</h3>
              <p>Customers stay at the center of every decision we make.</p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon">
                <span className="mission-icon-text">◉</span>
              </div>
              <h3>Global Reach</h3>
              <p>Reliable delivery and broad access wherever you live.</p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon">
                <span className="mission-icon-text">◈</span>
              </div>
              <h3>Transparency</h3>
              <p>Honest pricing, clear communication, and no surprises.</p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon">
                <span className="mission-icon-text">◆</span>
              </div>
              <h3>Excellence</h3>
              <p>High standards in every order, from packing to delivery.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="container">
          <h2>ShopAll in Numbers</h2>
          <div className="stats-grid">
            <div className="card stat-card">
              <div className="stat-number">500+</div>
              <div>Products</div>
            </div>
            <div className="card stat-card">
              <div className="stat-number">10K+</div>
              <div>Customers</div>
            </div>
            <div className="card stat-card">
              <div className="stat-number">50+</div>
              <div>Categories</div>
            </div>
            <div className="card stat-card">
              <div className="stat-number">24/7</div>
              <div>Support</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
