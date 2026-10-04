import Link from "next/link";

const colors = { teak: "#2E3B2A", silk: "#E8DCC0", sand: "#F5EFE2", cream: "#FDF8E9", button: "#2E5B3A" };

export default function ContributeLoginPrompt() {
  const wrap = {
    textAlign: "center",
    padding: "56px 24px",
    backgroundColor: colors.sand,
    border: "1px solid " + colors.silk,
    borderRadius: 15,
  };
  const title = {
    fontFamily: "var(--font-heading), serif",
    fontWeight: 700,
    color: colors.teak,
    margin: "0 0 12px",
    lineHeight: 1.2,
  };
  const desc = {
    fontFamily: "var(--font-body), var(--font-khmer), sans-serif",
    fontSize: 16,
    color: colors.teak + "CC",
    margin: "0 0 28px",
    lineHeight: 1.6,
    maxWidth: 560,
    marginLeft: "auto",
    marginRight: "auto",
  };
  const btn = {
    fontFamily: "var(--font-body), sans-serif",
    fontSize: 14,
    fontWeight: 600,
    color: colors.cream,
    backgroundColor: colors.button,
    border: "none",
    padding: "14px 36px",
    borderRadius: 6,
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    textDecoration: "none",
    display: "inline-block",
  };

  return (
    <section style={wrap} aria-label="Log in to contribute">
      <h2 style={title} className="contribute-title">Share your knowledge</h2>
      <p style={desc}>
        Log in to record a family remedy, natural scrub, or herbal care passed down by your family,
        elders, friends, and communities.
      </p>
      <Link href="/login" style={btn} aria-label="Log in to submit an entry">
        Log In to Contribute
      </Link>
    </section>
  );
}
