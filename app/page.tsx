"use client";

import { FormEvent, useMemo, useState } from "react";

type Category = "Mouse" | "Keyboard" | "Bundle";

type Product = {
  id: number;
  name: string;
  category: Category;
  tagline: string;
  price: number;
  accent: string;
  badge?: string;
  specs: string[];
};

type CartLine = Product & { quantity: number };

const products: Product[] = [
  {
    id: 1,
    name: "AER—1",
    category: "Mouse",
    tagline: "Weightless control",
    price: 79,
    accent: "lime",
    badge: "Bestseller",
    specs: ["48 g", "26K sensor", "90 hr battery"],
  },
  {
    id: 2,
    name: "THRUM 75",
    category: "Keyboard",
    tagline: "A softer landing",
    price: 129,
    accent: "violet",
    badge: "New",
    specs: ["Gasket mount", "Hot-swap", "Tri-mode"],
  },
  {
    id: 3,
    name: "VEIL",
    category: "Mouse",
    tagline: "Quiet by design",
    price: 89,
    accent: "orange",
    specs: ["Silent clicks", "8K polling", "USB-C"],
  },
  {
    id: 4,
    name: "MONOLITH 98",
    category: "Keyboard",
    tagline: "Full size, refined",
    price: 149,
    accent: "blue",
    specs: ["CNC frame", "PBT keycaps", "2.4 GHz"],
  },
  {
    id: 5,
    name: "ARC MINI",
    category: "Keyboard",
    tagline: "Small board, full intent",
    price: 99,
    accent: "rose",
    specs: ["65% layout", "VIA ready", "RGB south-facing"],
  },
  {
    id: 6,
    name: "CORE DUO",
    category: "Bundle",
    tagline: "One desk. Zero friction.",
    price: 189,
    accent: "silver",
    badge: "Save $29",
    specs: ["THRUM 75", "AER—1", "Desk mat included"],
  },
];

const filters = ["All", "Mouse", "Keyboard", "Bundle"] as const;

function ProductArt({ product, hero = false }: { product: Product; hero?: boolean }) {
  const isKeyboard = product.category === "Keyboard";
  const isBundle = product.category === "Bundle";

  return (
    <div
      className={`product-art product-art--${product.accent}${hero ? " product-art--hero" : ""}`}
      aria-hidden="true"
    >
      {(isKeyboard || isBundle) && (
        <div className="keyboard-shell">
          <div className="keyboard-keys">
            {Array.from({ length: 48 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <i className="keyboard-mark">G</i>
        </div>
      )}
      {(!isKeyboard || isBundle) && (
        <div className="mouse-shell">
          <span className="mouse-split" />
          <span className="mouse-wheel" />
          <i>G</i>
        </div>
      )}
      <span className="art-glow" />
    </div>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const visibleProducts = useMemo(
    () => products.filter((product) => filter === "All" || product.category === filter),
    [filter],
  );

  const cartCount = cart.reduce((total, line) => total + line.quantity, 0);
  const cartTotal = cart.reduce((total, line) => total + line.price * line.quantity, 0);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((line) => line.id === product.id);
      return existing
        ? current.map((line) =>
            line.id === product.id ? { ...line, quantity: line.quantity + 1 } : line,
          )
        : [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const changeQuantity = (id: number, delta: number) => {
    setCart((current) =>
      current
        .map((line) =>
          line.id === id ? { ...line, quantity: line.quantity + delta } : line,
        )
        .filter((line) => line.quantity > 0),
    );
  };

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <main>
      <div className="announcement">
        <p>Free express shipping on orders over $120</p>
        <span>30-day desk test</span>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Gemirels home">
          GEMIRELS<span>®</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#shop">Shop</a>
          <a href="#story">Design</a>
          <a href="#support">Support</a>
        </nav>
        <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${cartCount} items`}>
          Cart <span>{cartCount.toString().padStart(2, "0")}</span>
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Precision peripherals / 2026</p>
          <h1>Move fast.<br />Type true.</h1>
          <p className="hero-lede">
            Performance keyboards and ultra-light mice engineered for quiet focus,
            instant response, and a desk that feels entirely yours.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#shop">Shop the collection <span>↗</span></a>
            <a className="text-link" href="#story">Our design code <span>↓</span></a>
          </div>
          <div className="hero-proof">
            <div><strong>48<small>g</small></strong><span>Lightest mouse</span></div>
            <div><strong>8<small>K</small></strong><span>Wireless polling</span></div>
            <div><strong>90<small>hr</small></strong><span>Battery life</span></div>
          </div>
        </div>

        <div className="hero-stage">
          <div className="hero-label hero-label--one"><span>01</span> CNC aluminium chassis</div>
          <div className="hero-label hero-label--two"><span>02</span> Zero-lag wireless</div>
          <ProductArt product={products[5]} hero />
          <p className="hero-model">CORE DUO <span>/ 001</span></p>
        </div>
      </section>

      <section className="ticker" aria-label="Product values">
        <div>
          <span>BUILT TO REACT</span><i>◆</i><span>MADE TO LAST</span><i>◆</i>
          <span>TUNED BY HAND</span><i>◆</i><span>BUILT TO REACT</span><i>◆</i>
          <span>MADE TO LAST</span><i>◆</i><span>TUNED BY HAND</span><i>◆</i>
        </div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> The collection</p>
            <h2>Your inputs,<br />refined.</h2>
          </div>
          <p>Every Gemirels product starts with the same question: what can we remove between intention and action?</p>
        </div>

        <div className="filters" role="group" aria-label="Filter products">
          {filters.map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
            >
              {item} <span>{item === "All" ? "06" : `0${products.filter((product) => product.category === item).length}`}</span>
            </button>
          ))}
        </div>

        <div className="product-grid">
          {visibleProducts.map((product, index) => (
            <article className="product-card" key={product.id}>
              <div className="product-visual">
                {product.badge && <span className="product-badge">{product.badge}</span>}
                <span className="product-number">0{index + 1}</span>
                <ProductArt product={product} />
                <button onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}>+</button>
              </div>
              <div className="product-info">
                <div>
                  <p>{product.category}</p>
                  <h3>{product.name}</h3>
                  <span>{product.tagline}</span>
                </div>
                <strong>${product.price}</strong>
              </div>
              <ul>
                {product.specs.map((spec) => <li key={spec}>{spec}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="design-section" id="story">
        <div className="design-copy">
          <p className="eyebrow eyebrow--light"><span /> The Gemirels standard</p>
          <h2>Less noise.<br />More signal.</h2>
          <p>
            We tune the details you notice after eight hours: the landing of each
            keystroke, the balance under your palm, and the calm of a cable-free desk.
          </p>
          <a href="#shop" className="button button--light">Explore all products <span>↗</span></a>
        </div>
        <div className="design-grid">
          <article><span>01</span><h3>Purposeful weight</h3><p>Stable where it matters. Effortless where it moves.</p></article>
          <article><span>02</span><h3>Honest materials</h3><p>Aluminium, PBT, and precise mechanical parts—nothing ornamental.</p></article>
          <article><span>03</span><h3>Measured latency</h3><p>Competitive wireless performance without the gamer theatrics.</p></article>
          <article><span>04</span><h3>Repair-minded</h3><p>Replaceable switches, cables, and skates extend every product&apos;s life.</p></article>
        </div>
      </section>

      <section className="desk-section">
        <div className="desk-title">
          <p className="eyebrow"><span /> Choose your mode</p>
          <h2>One desk.<br />Three states.</h2>
        </div>
        <div className="mode-list">
          <article><span>01</span><div><h3>Focus</h3><p>Silent switches. Warm white backlight. No distractions.</p></div><strong>WORK →</strong></article>
          <article><span>02</span><div><h3>Flow</h3><p>Low-latency wireless and precise control for creative momentum.</p></div><strong>CREATE →</strong></article>
          <article><span>03</span><div><h3>Reflex</h3><p>8K response, lightweight shells, and tactile speed on demand.</p></div><strong>PLAY →</strong></article>
        </div>
      </section>

      <section className="newsletter" id="support">
        <p className="eyebrow eyebrow--light"><span /> Desk notes / No spam</p>
        <div>
          <h2>New tools.<br />First access.</h2>
          {subscribed ? (
            <p className="success-message">You&apos;re on the list. Watch your inbox.</p>
          ) : (
            <form onSubmit={handleSubscribe}>
              <label className="sr-only" htmlFor="email">Email address</label>
              <input id="email" type="email" placeholder="EMAIL ADDRESS" required />
              <button type="submit" aria-label="Subscribe">→</button>
            </form>
          )}
        </div>
      </section>

      <footer>
        <div className="footer-brand">GEMIRELS<span>®</span></div>
        <div className="footer-links">
          <div><p>Shop</p><a href="#shop">Mice</a><a href="#shop">Keyboards</a><a href="#shop">Bundles</a></div>
          <div><p>Help</p><a href="mailto:hello@gemirels.com">Contact</a><a href="#support">Shipping</a><a href="#support">Returns</a></div>
          <div><p>Follow</p><a href="#">Instagram</a><a href="#">YouTube</a><a href="#">Discord</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Gemirels</span><span>Designed for better inputs.</span></div>
      </footer>

      {cartOpen && <button className="cart-backdrop" aria-label="Close cart" onClick={() => setCartOpen(false)} />}
      <aside className={`cart-drawer${cartOpen ? " open" : ""}`} aria-hidden={!cartOpen}>
        <div className="cart-header">
          <div><p>Your setup</p><span>{cartCount} {cartCount === 1 ? "item" : "items"}</span></div>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart">×</button>
        </div>
        <div className="cart-lines">
          {cart.length === 0 ? (
            <div className="empty-cart"><span>00</span><h3>Your desk is waiting.</h3><p>Add a keyboard, mouse, or complete setup to begin.</p><button onClick={() => setCartOpen(false)}>Browse products</button></div>
          ) : cart.map((line) => (
            <article className="cart-line" key={line.id}>
              <ProductArt product={line} />
              <div><p>{line.category}</p><h3>{line.name}</h3><span>${line.price}</span><div className="quantity"><button onClick={() => changeQuantity(line.id, -1)} aria-label={`Remove one ${line.name}`}>−</button><span>{line.quantity}</span><button onClick={() => changeQuantity(line.id, 1)} aria-label={`Add one ${line.name}`}>+</button></div></div>
            </article>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="cart-summary"><p><span>Subtotal</span><strong>${cartTotal}</strong></p><small>Taxes and shipping calculated at checkout.</small><button onClick={() => alert("Demo checkout — payment setup comes next.")}>Continue to checkout <span>→</span></button></div>
        )}
      </aside>
    </main>
  );
}
