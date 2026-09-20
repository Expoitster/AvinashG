import Reveal from "../components/Reveal";

/**
 * Every route renders this until its content is ported from
 * design/avinash-console.html.
 *
 * It states plainly that the page is not ported rather than standing in with
 * plausible-looking copy. The project's founding constraint is that portfolio
 * content is never invented, and a half-migrated route is exactly where an
 * invented paragraph would slip in unnoticed.
 */
export default function Placeholder({ title, source }) {
  return (
    <main>
      <Reveal>
        <h1>{title}</h1>
      </Reveal>
      <Reveal delay={0.04}>
        <p>
          Not ported yet. The published version of this page is still the one
          built from <code>design/avinash-console.html</code>
          {source ? ` (${source})` : ""}.
        </p>
      </Reveal>
    </main>
  );
}
