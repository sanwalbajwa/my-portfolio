export default function Section({ label, title, children, className = "", dark = false }) {
  const theme = dark ? "bg-dark-surface text-dark-text" : "";
  return (
    <section className={`py-20 ${className} ${theme}`}>
      <div className="container">
        {label && <div className="section-label text-sm tracking-widest mb-4">{label}</div>}
        {title && <h2 className="text-3xl font-display font-semibold mb-6">{title}</h2>}
        <div>{children}</div>
      </div>
    </section>
  );
}
