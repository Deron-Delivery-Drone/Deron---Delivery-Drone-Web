export function OverviewModule() {
  return (
    <section className="module">
      <h2>Overview</h2>
      <div className="panel-grid">
        <article className="panel">
          <h3>Live Status</h3>
          <p>Operational view for overview domain.</p>
        </article>
        <article className="panel">
          <h3>Draft vs Active</h3>
          <p>Version-aware controls and audit-linked decisions.</p>
        </article>
      </div>
    </section>
  );
}
