import type { Metadata } from "next";
import Link from "next/link";
import {
  AUTHOR_SITE_URL,
  GITHUB_PROFILE_URL,
  GITHUB_SPONSORS_URL,
  PAYPAL_DONATE_URL,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "The Search for the Elixir of Youth — Alexander's Library",
  description:
    "From the Sumerian Epic of Gilgamesh and the scrolls of Alexandria to the Scientific and Information Revolutions: why the Tree of Knowledge exists.",
};

export default function AboutPage() {
  return (
    <main className="chronicle">
      <article className="chronicle-folio">
        <header className="chronicle-header">
          <p className="chronicle-kicker">Ex Libris · Bibliotheca Alexandrina</p>
          <h1>The Search for the Elixir of Youth</h1>
          <p className="chronicle-subtitle">
            From the clay tablets of Sumer and the lost scrolls of Alexandria to autonomous scientific synthesis:
            humanity&rsquo;s four-thousand-year quest to gather what is known—and weigh how strongly it is known.
          </p>

          <figure className="bookplate">
            <img
              src="/archival-library.jpg"
              alt="Ex Libris Bibliotheca Alexandrina: 17th-century style engraving showing the Tree of Knowledge inside the vaulted scroll halls of the Library of Alexandria, with an armillary sphere, astrolabe, Sumerian cuneiform tablet, and the thorny plant of youth."
              className="bookplate-img"
              width={1408}
              height={768}
              fetchPriority="high"
            />
            <figcaption>
              Fig. 1 — <em>Ex Libris Bibliotheca Alexandrina</em>: the Sumerian tablet and thorny plant of Uruk, the
              celestial instruments of natural philosophy, and the living Tree of Knowledge within the scroll halls of
              Alexandria.
            </figcaption>
          </figure>
        </header>

        <blockquote className="chronicle-epigraph">
          <p>
            &ldquo;This plant, Ur-shanabi, is the Plant of Heartbeat: by means of it a man may recapture his vitality. I
            will carry it back to Uruk-of-the-Sheepfold; I will test it upon an elder, and so prove its virtue.&rdquo;
          </p>
          <footer>— The Epic of Gilgamesh, Tablet XI (Standard Babylonian recension, c. 2100–1200 BCE)</footer>
        </blockquote>

        <section className="chronicle-chapter">
          <h2>I. Sumer, Ur &amp; the First Poem of Humanity</h2>
          <p className="dropcap">
            At the dawn of recorded literature—etched in wedge-shaped cuneiform upon clay tablets in the cities of Sumer,
            Uruk, and Ur—humanity wrote down its deepest and most enduring question. Confronted by mortality after the
            death of his companion Enkidu, the king Gilgamesh crosses the Waters of Death to seek Utnapishtim and learn
            whether nature holds a remedy against time and biological decline.
          </p>
          <p>
            Directed to the depths of the freshwater abyss (the <em>Apsu</em>), he ties heavy stones to his feet, descends
            to the floor of the sea, and plucks a thorny botanical specimen named{" "}
            <em>&ldquo;The Old Man Becomes Young Again&rdquo;</em> (<em>Šībū issahir amēlu</em>). Yet notice what the
            ancient poet records next: Gilgamesh does not swallow the plant on faith. He announces that he will bring it
            back to the walled city of Uruk to <strong>test it first</strong> and verify its effect. Before the trial can
            be made, a serpent steals the plant at a cool well—and humanity is left with the harder, longer work of
            patient observation, record-keeping, and cumulative science.
          </p>
        </section>

        <section className="chronicle-chapter">
          <h2>II. Ancient Civilisations, Initiatory Brotherhoods &amp; the Great Library</h2>
          <p>
            Across the ancient world, the search for longevity, healing, and natural law moved into temple archives and
            guarded circles. In Egypt, priests of the <em>Per Ankh</em> (the &ldquo;House of Life&rdquo;) compiled medical
            papyri such as the Edwin Smith and Ebers scrolls, pairing empirical surgical observations with incantations.
            In Greece and Magna Graecia, Pythagorean communities, Hippocratic physicians at Kos, and mystery schools kept
            mathematical, astronomical, and medical doctrines as prized inheritances. In China and India, Taoist{" "}
            <em>waidan</em> alchemists and Ayurvedic scholars catalogued hundreds of minerals and botanicals in search of
            the elixir of life—accidentally discovering gunpowder, distillation, and metallurgy along the way.
          </p>
          <p>
            Then, in the third century BCE, Alexandria attempted something unprecedented in human history: instead of
            hiding knowledge inside a secret brotherhood, the Ptolemaic Mouseion and the{" "}
            <strong>Royal Library of Alexandria</strong> sought to gather every scroll in the known world under one roof.
            Every ship docking in the harbour had its books inspected and copied; the scholar Callimachus compiled the{" "}
            <em>Pinakes</em>—a 120-scroll critical catalogue organising human thought by discipline, author, and provenance.
          </p>
        </section>

        <section className="chronicle-chapter">
          <h2>III. The Roman Empire, the Middle Ages &amp; the Custodians of Parchment</h2>
          <figure className="bookplate-inline" aria-hidden="true">
            <svg viewBox="0 0 640 120" className="bookplate-svg">
              <rect x="6" y="6" width="628" height="108" fill="none" stroke="currentColor" strokeWidth="1" />
              <line x1="20" y1="60" x2="210" y2="60" stroke="currentColor" strokeWidth="0.8" />
              <line x1="430" y1="60" x2="620" y2="60" stroke="currentColor" strokeWidth="0.8" />
              {/* Scroll and quill emblem */}
              <g transform="translate(320, 60)">
                <rect x="-70" y="-28" width="140" height="56" rx="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="-70" cy="-28" r="5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="-70" cy="28" r="5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="70" cy="-28" r="5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="70" cy="28" r="5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <text x="0" y="-4" textAnchor="middle" fontSize="11" fontFamily="serif" fontStyle="italic" fill="currentColor">
                  Custodia Librorum
                </text>
                <text x="0" y="14" textAnchor="middle" fontSize="9.5" fontFamily="serif" fill="currentColor">
                  Baghdad · Monte Cassino · Toledo · Salerno
                </text>
              </g>
            </svg>
          </figure>
          <p>
            When the great collections of antiquity fractured across centuries of war, fire, and neglect, the archive of
            humanity survived only through the devotion of scattered custodians. In the Roman Empire, Pliny the Elder
            assembled the thirty-seven books of his <em>Naturalis Historia</em>, and Galen codified clinical medicine for a
            millennium. During the Middle Ages, translators at the <em>Bayt al-Hikma</em> (House of Wisdom) in Baghdad,
            physicians like Ibn Sina (Avicenna) in his <em>Canon of Medicine</em>, monastic scribes illuminating vellum in
            cold European scriptoria, and translators in Toledo and Salerno preserved Greek, Arabic, Latin, and Sanskrit
            manuscripts line by line.
          </p>
          <p>
            Simultaneously, hermetic and alchemical circles—from Jabir ibn Hayyan to Roger Bacon and Paracelsus—kept alive
            the ancient dream of the <em>Elixir Vitae</em>: a universal medicine capable of purifying matter and prolonging
            human vigour. Yet so long as books had to be copied by hand and locked in private chests or abbey towers, two
            fatal flaws remained: a single fire could erase a century of thought, and an untested assertion written in
            fine ink looked identical to a proven truth.
          </p>
        </section>

        <section className="chronicle-chapter">
          <h2>IV. The Enlightenment &amp; the Scientific Revolution</h2>
          <p>
            Moveable type broke the monopoly of the locked scriptorium; Anyone who walked into a reading room could smell
            the linen paper, oak gall ink, and leather bindings of a shared human inheritance. With the Scientific
            Revolution and the Enlightenment—from Francis Bacon&rsquo;s <em>Novum Organum</em> and the Royal Society&rsquo;s
            motto <em>Nullius in verba</em> (&ldquo;take nobody&rsquo;s word for it&rdquo;) to Diderot and
            d&rsquo;Alembert&rsquo;s <em>Encyclopédie</em>—humanity discovered the true elixir: <strong>method</strong>.
          </p>
          <p>
            Alchemy became chemistry; astrology became astrophysics; herbal lore became randomized clinical trials,
            beginning with James Lind&rsquo;s 1747 controlled experiment aboard HMS <em>Salisbury</em>. Over the next two
            centuries, humanity learned that not all claims carry equal weight: an anecdote is not a cohort study, a
            cohort study is not a randomised trial, and a single trial is not a systematic meta-analysis.
          </p>
        </section>

        <section className="chronicle-chapter">
          <h2>V. The Information &amp; Autonomous Intelligence Revolution</h2>
          <p>
            Today we face the opposite crisis of the ancient world. The scrolls were not burned; they multiplied beyond
            human comprehension. Every year, millions of peer-reviewed papers, preprints, clinical trial registrations,
            and regulatory dossiers are added to humanity&rsquo;s archive. No physician, scientist, or citizen can read
            ten thousand papers before making a life-altering decision—and in the spaces between primary literature and the
            public, commercial hype and unverified lore flourish just as they did in the marketplaces of antiquity.
          </p>
          <p>
            Yet we now live in the Information Revolution, at the threshold of autonomous computational research. For the
            first time in history, machines can accept a question in plain English, dispatch tireless workers across the
            world&rsquo;s open scientific repositories (Europe PMC, OpenAlex, ClinicalTrials.gov, and the live web), read
            every relevant study, extract concrete claims with full provenance, and—crucially—grade every finding in
            deterministic code by the rigour of the study design behind it (<code>T1</code> through <code>T6</code>).
          </p>
          <p className="chronicle-manifesto">
            So the dream that began four thousand years ago in Uruk and took shape in the halls of Alexandria is finally
            possible: <strong>to hold all of humanity&rsquo;s scientific archive at our fingertips, organised as a living
            Tree of Knowledge</strong>—where frontier and minority ideas are preserved and labelled rather than censored,
            where marketing is separated from evidence, and where every branch belongs not to one person, but to all of
            humanity.
          </p>
          <p className="chronicle-closing">
            <em>We ask, and it shall be provided from Humanity&rsquo;s archive of knowledge.</em>
          </p>
        </section>

        <footer className="chronicle-footer">
          <div className="chronicle-cta">
            <Link href="/" className="donate-button">
              Explore the Tree of Knowledge →
            </Link>
            <a href={PAYPAL_DONATE_URL} target="_blank" rel="noopener noreferrer" className="donate-button">
              Donate via PayPal
            </a>
            <a href={GITHUB_SPONSORS_URL} target="_blank" rel="noopener noreferrer" className="support-link">
              GitHub Sponsors
            </a>
          </div>
          <p className="muted small">
            Conceived and built by Nuno Ribeiro ·{" "}
            <a href={AUTHOR_SITE_URL} target="_blank" rel="noopener noreferrer">
              nuuno.art
            </a>{" "}
            ·{" "}
            <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
              @tachyon-ops
            </a>
          </p>
        </footer>
      </article>
    </main>
  );
}
