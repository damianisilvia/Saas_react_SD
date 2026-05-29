import { useEffect, useRef } from 'react';
import '../styles/Loader.css';

/**
 * Full-page loading overlay.
 *
 * Props:
 *  - label   {string}   – uppercase label shown below the spinner (default: "Elaborazione in corso")
 *  - visible {boolean}  – when set to false triggers the fade-out exit animation
 */
function Loader({ label = 'Elaborazione in corso', visible = true }) {
  const overlayRef = useRef(null);

  /* Trigger CSS exit animation when visible becomes false */
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    if (!visible) {
      el.classList.add('loader-overlay--exit');
    } else {
      el.classList.remove('loader-overlay--exit');
    }
  }, [visible]);

  return (
    <div ref={overlayRef} className="loader-overlay" role="status" aria-live="polite" aria-label={label}>
      {/* Decorative tech-grid */}
      <div className="tech-bg-grid" aria-hidden="true" />

      {/* Spinner */}
      <div className="loader-spinner" aria-hidden="true">
        <div className="loader-spinner__ring" />
        <div className="loader-spinner__ring loader-spinner__ring--inner" />
        <div className="loader-spinner__core" />
      </div>

      {/* Glass card with label and progress bar */}
      <div className="loader-card">
        <span className="loader-label">{label}</span>
        <div className="loader-progress" aria-hidden="true">
          <div className="loader-progress__fill" />
        </div>
      </div>
    </div>
  );
}

export default Loader;
