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
    "From the Sumerian Epic of Gilgamesh and the scrolls of Alexandria to the Scientific and Information Revolutions: why the Tree of Knowledge exists, with primary sources and academic citations.",
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
            <div className="bookplate-frame">
              <span className="provenance-badge provenance-ai" title="Generated with an AI image model; not a historical engraving">
                (AI) Allegorical Illustration
              </span>
              <img
                src="/archival-library.jpg"
                alt="AI-generated allegorical frontispiece in 17th-century engraving style showing the Tree of Knowledge inside the vaulted scroll halls of the Library of Alexandria, with an armillary sphere, astrolabe, Sumerian cuneiform tablet, and the thorny plant of youth."
                className="bookplate-img"
                width={1408}
                height={768}
                fetchPriority="high"
              />
            </div>
            <figcaption>
              <strong>Fig. 1 (AI)</strong> — <em>Ex Libris Bibliotheca Alexandrina</em>{" "}
              <span className="provenance-inline">(AI-generated allegorical frontispiece, 2026; not an archival artifact)</span>: a
              modern visual synthesis uniting the Sumerian cuneiform tablet and thorny plant of Uruk, the celestial
              instruments of natural philosophy, and the living Tree of Knowledge within the scroll halls of Alexandria.
              Historical artifacts and manuscripts are reproduced with full museum provenance in Figs. 2–4 below.
            </figcaption>
          </figure>
        </header>

        <blockquote className="chronicle-epigraph">
          <p>
            &ldquo;This plant, Ur-shanabi, is the Plant of Heartbeat: by means of it a man may recapture his vitality. I
            will carry it back to Uruk-of-the-Sheepfold; I will test it upon an elder, and so prove its virtue.&rdquo;
          </p>
          <footer>
            — <em>The Epic of Gilgamesh</em>, Tablet XI, lines 295–300 (Standard Babylonian recension, c. 1200 BCE; after
            Sumerian poems of Bilgames, c. 2100 BCE)
            <sup id="ref-1">
              <a href="#fn-1" className="footnote-ref" aria-label="Footnote 1">
                [1]
              </a>
            </sup>
          </footer>
        </blockquote>

        <section className="chronicle-chapter">
          <h2>I. Sumer, Ur &amp; the First Poem of Humanity</h2>
          <p className="dropcap">
            At the dawn of recorded literature—etched in wedge-shaped cuneiform upon clay tablets in the cities of Sumer,
            Uruk, and the Third Dynasty of Ur (c. 2100 BCE)—humanity wrote down its deepest and most enduring question.
            Confronted by mortality after the death of his companion Enkidu, the king Gilgamesh (Sumerian{" "}
            <em>Bilgames</em>) crosses the Waters of Death to seek Utnapishtim and learn whether nature holds a remedy
            against time and biological decline.
            <sup>
              <a href="#fn-1" className="footnote-ref" aria-label="Footnote 1">
                [1]
              </a>
            </sup>
          </p>
          <p>
            Directed to the depths of the freshwater abyss (the <em>Apsu</em>), he ties heavy stones to his feet, descends
            to the floor of the sea, and plucks a thorny botanical specimen named{" "}
            <em>&ldquo;The Old Man Becomes Young Again&rdquo;</em> (Akkadian: <em>Šībū issahir amēlu</em>). Yet notice what
            the ancient poet records next in Tablet XI: Gilgamesh does not swallow the plant on faith. He announces that he
            will bring it back to the walled city of Uruk to <strong>test it first</strong> upon an aged citizen and verify
            whether its effect is real. Before the trial can be conducted, a serpent sheds its skin at a cool well and
            steals the plant—leaving humanity with the harder, longer work of patient observation, record-keeping, and
            cumulative science.
            <sup>
              <a href="#fn-1" className="footnote-ref" aria-label="Footnote 1">
                [1]
              </a>
            </sup>
          </p>

          <figure className="archival-plate">
            <img
              src="/history/gilgamesh-tablet-xi.jpg"
              alt="Photograph of Tablet XI of the Epic of Gilgamesh (the Flood Tablet), a Neo-Assyrian clay tablet inscribed in Akkadian cuneiform from the Royal Library of Ashurbanipal at Nineveh, 7th century BCE, held in the British Museum."
              className="archival-plate-img"
              width={960}
              height={1086}
              loading="lazy"
            />
            <figcaption>
              <strong>Fig. 2 (Archival Artifact)</strong> — Tablet XI of the <em>Epic of Gilgamesh</em> (the &ldquo;Flood
              Tablet&rdquo;, recording Utnapishtim&rsquo;s immortality and the thorny Plant of Youth,{" "}
              <em>Šībū issahir amēlu</em>), Neo-Assyrian clay tablet in Akkadian cuneiform from the Royal Library of
              Ashurbanipal at Nineveh, 7th century BCE. London,{" "}
              <a
                href="https://www.britishmuseum.org/collection/object/W_K-3375"
                target="_blank"
                rel="noopener noreferrer"
              >
                The British Museum, Museum No. K.3375
              </a>{" "}
              (photograph via{" "}
              <a
                href="https://commons.wikimedia.org/wiki/File:British_Museum_Flood_Tablet.jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikimedia Commons
              </a>
              , CC BY-SA 4.0).
              <sup>
                <a href="#fn-1" className="footnote-ref" aria-label="Footnote 1">
                  [1]
                </a>
              </sup>
            </figcaption>
          </figure>
        </section>

        <section className="chronicle-chapter">
          <h2>II. Ancient Civilisations, Initiatory Brotherhoods &amp; the Great Library</h2>
          <p>
            Across the ancient world, the search for longevity, healing, and natural law moved into temple archives and
            guarded circles. In Egypt, scribes and physician-priests of the <em>Per Ankh</em> (the &ldquo;House of
            Life&rdquo;) compiled medical papyri such as the Edwin Smith and Ebers scrolls (c. 1600–1550 BCE), pairing
            empirical anatomical and surgical observations with ritual formularies.
            <sup id="ref-2">
              <a href="#fn-2" className="footnote-ref" aria-label="Footnote 2">
                [2]
              </a>
            </sup>{" "}
            In Greece and Magna Graecia, Pythagorean sodalities, Asclepiad guild-physicians at Kos and Knidos, and
            initiatory schools transmitted mathematical, astronomical, and clinical doctrines under oath.
            <sup id="ref-3">
              <a href="#fn-3" className="footnote-ref" aria-label="Footnote 3">
                [3]
              </a>
            </sup>{" "}
            In China and India, Taoist <em>waidan</em> (external alchemy) practitioners and Sanskrit{" "}
            <em>Rasāyana</em> scholars catalogued hundreds of minerals and botanicals in search of the elixir of
            life—pioneering distillation, metallurgy, and pharmacognosy along the way.
            <sup id="ref-4">
              <a href="#fn-4" className="footnote-ref" aria-label="Footnote 4">
                [4]
              </a>
            </sup>
          </p>
          <p>
            Then, in the third century BCE under the Ptolemaic dynasty, Alexandria attempted something unprecedented in
            human history: instead of sequestering knowledge inside a closed brotherhood, the <em>Mouseion</em> and the{" "}
            <strong>Royal Library of Alexandria</strong> sought to gather every scroll in the inhabited world under one
            roof. Ships docking in the Eunostos harbour had their books requisitioned and copied onto fresh papyrus; the
            poet-scholar Callimachus of Cyrene compiled the <em>Pinakes</em> (&ldquo;Tables&rdquo;)—a 120-scroll critical
            bio-bibliographical catalogue organising human thought by discipline, author, and provenance.
            <sup id="ref-5">
              <a href="#fn-5" className="footnote-ref" aria-label="Footnote 5">
                [5]
              </a>
            </sup>
          </p>

          <figure className="archival-plate">
            <img
              src="/history/alexandria-von-corven-1886.jpg"
              alt="19th-century wood engraving by O. Von Corven (1886) depicting scholars reading and cataloguing papyrus scrolls inside the Great Library of Alexandria."
              className="archival-plate-img"
              width={960}
              height={976}
              loading="lazy"
            />
            <figcaption>
              <strong>Fig. 3 (Historical Engraving, 1886)</strong> —{" "}
              <em>The Great Library of Alexandria</em>, 19th-century wood engraving after O. Von Corven, published in
              H.opp &amp; W. Sieglin, <em>Illustrierte Weltgeschichte</em> (Leipzig, 1886), depicting scholars consulting
              papyrus rolls in the Ptolemaic <em>Mouseion</em> (public domain via{" "}
              <a
                href="https://commons.wikimedia.org/wiki/File:Ancientlibraryalex.jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikimedia Commons
              </a>
              ).
              <sup>
                <a href="#fn-5" className="footnote-ref" aria-label="Footnote 5">
                  [5]
                </a>
              </sup>
            </figcaption>
          </figure>
        </section>

        <section className="chronicle-chapter">
          <h2>III. The Roman Empire, the Middle Ages &amp; the Custodians of Parchment</h2>
          <p>
            When the great collections of antiquity fractured across centuries of war, fire, and civic decay, the archive
            of humanity survived only through the devotion of scattered custodians. In the Roman Empire, Pliny the Elder
            assembled the thirty-seven books of his encyclopaedic <em>Naturalis Historia</em> (77 CE), and Galen of
            Pergamon synthesised Greek anatomy, pharmacology, and clinical method for a millennium.
            <sup id="ref-6">
              <a href="#fn-6" className="footnote-ref" aria-label="Footnote 6">
                [6]
              </a>
            </sup>{" "}
            During the Middle Ages, translators associated with the Abbasid <em>Bayt al-Hikma</em> (House of Wisdom) in
            Baghdad, physician-philosophers such as Ibn Sina (Avicenna) in his five-book <em>Al-Qānūn fī al-Ṭibb</em>{" "}
            (<em>Canon of Medicine</em>, 1025 CE), monastic scribes illuminating vellum at Vivarium and Monte Cassino, and
            multilingual translators in Toledo and Salerno preserved Greek, Arabic, Syriac, Latin, and Sanskrit manuscripts
            line by line.
            <sup id="ref-7">
              <a href="#fn-7" className="footnote-ref" aria-label="Footnote 7">
                [7]
              </a>
            </sup>
          </p>

          <figure className="archival-plate">
            <img
              src="/history/abbasid-library-1237.jpg"
              alt="Thirteenth-century Arabic manuscript illumination by Yahya ibn Mahmud al-Wasiti (1237 CE) showing scholars conversing in an Abbasid library beneath rows of shelved codices."
              className="archival-plate-img"
              width={974}
              height={989}
              loading="lazy"
            />
            <figcaption>
              <strong>Fig. 4 (Archival Manuscript Illumination, 1237 CE)</strong> — Scholars gathered in an Abbasid
              library at Basra beneath arched <em>khizānat al-kutub</em> (book-niches stacked with horizontal codices),
              painted by Yaḥyā ibn Maḥmūd al-Wāsiṭī in Baghdad (634 AH / 1237 CE) for the <em>Maqāmāt</em> of al-Ḥarīrī.
              Paris,{" "}
              <a
                href="https://gallica.bnf.fr/ark:/12148/btv1b8422965p/f20.item"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bibliothèque nationale de France, Département des Manuscrits, MS Arabe 5847, fol. 5v
              </a>{" "}
              (public domain via{" "}
              <a
                href="https://commons.wikimedia.org/wiki/File:Maqamat_hariri.jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikimedia Commons
              </a>
              ).
              <sup>
                <a href="#fn-7" className="footnote-ref" aria-label="Footnote 7">
                  [7]
                </a>
              </sup>
            </figcaption>
          </figure>

          <p>
            Simultaneously, Latin and Arabic alchemical traditions—from the Jabirian corpus and al-Rāzī to Roger Bacon,
            John of Rupescissa&rsquo;s <em>quinta essentia</em>, and Paracelsus&rsquo;s <em>iatrochemistry</em>—kept alive
            the ancient dream of the <em>Elixir Vitae</em>: a purified medicine capable of arresting corruption and
            prolonging human vigour.
            <sup id="ref-8">
              <a href="#fn-8" className="footnote-ref" aria-label="Footnote 8">
                [8]
              </a>
            </sup>{" "}
            Yet so long as books had to be copied by hand and locked in private chests or abbey towers, two fatal flaws
            remained: a single fire could erase a century of thought, and an untested assertion written in fine ink looked
            identical to a verified truth.
          </p>
        </section>

        <section className="chronicle-chapter">
          <h2>IV. The Enlightenment &amp; the Scientific Revolution</h2>
          <p>
            Moveable type broke the monopoly of the locked scriptorium; anyone who walked into a public reading room could
            smell the rag-linen paper, oak-gall ink, and calfskin bindings of a shared human inheritance. With the
            Scientific Revolution and the Enlightenment—from Francis Bacon&rsquo;s <em>Novum Organum</em> (1620) and the
            Royal Society&rsquo;s 1660 motto <em>Nullius in verba</em> (&ldquo;take nobody&rsquo;s word for it&rdquo;)
            <sup id="ref-9">
              <a href="#fn-9" className="footnote-ref" aria-label="Footnote 9">
                [9]
              </a>
            </sup>{" "}
            to Diderot and d&rsquo;Alembert&rsquo;s <em>Encyclopédie</em> (1751–1772), which explicitly mapped all human
            knowledge as an <em>Arbre Encyclopédique</em> (Tree of Knowledge)
            <sup id="ref-10">
              <a href="#fn-10" className="footnote-ref" aria-label="Footnote 10">
                [10]
              </a>
            </sup>
            —humanity discovered the true elixir: <strong>empirical method</strong>.
          </p>
          <p>
            Alchemy matured into quantitative chemistry; astrology gave way to celestial mechanics; and traditional physic
            was subjected to controlled clinical comparison, exemplified by James Lind&rsquo;s May 1747 prospective citrus
            trial aboard HMS <em>Salisbury</em>.
            <sup id="ref-11">
              <a href="#fn-11" className="footnote-ref" aria-label="Footnote 11">
                [11]
              </a>
            </sup>{" "}
            Over the next two centuries, culminating in the modern Evidence-Based Medicine hierarchy, humanity established
            a formal principle: not all claims carry equal epistemic weight. An anecdote or case report is not a cohort
            study, a cohort study is not a randomised controlled trial, and a single trial is not a systematic
            meta-analysis.
            <sup id="ref-12">
              <a href="#fn-12" className="footnote-ref" aria-label="Footnote 12">
                [12]
              </a>
            </sup>
          </p>
        </section>

        <section className="chronicle-chapter">
          <h2>V. The Information &amp; Autonomous Intelligence Revolution</h2>
          <p>
            Today we face the inverse crisis of antiquity. The scrolls were not burned; they multiplied beyond individual
            human comprehension. Every year, millions of peer-reviewed articles, preprints, clinical trial registrations,
            and regulatory assessments are added to the biomedical and scientific record. No physician, researcher, or
            citizen can read ten thousand primary papers before making a life-altering decision—and in the gap between
            primary literature and the public, commercial hype and unverified lore flourish just as they did in the
            marketplaces of the ancient world.
          </p>
          <p>
            Yet we now stand in the Information Revolution, at the threshold of autonomous computational synthesis. For the
            first time in history, machines can accept a question in plain English, dispatch tireless workers across the
            world&rsquo;s open scientific repositories (Europe PMC, OpenAlex, ClinicalTrials.gov, and the open web), read
            the primary literature, extract concrete claims with verbatim provenance, and—crucially—grade every finding in
            deterministic code by the rigour of the study design behind it (<code>T1</code> systematic reviews and
            randomised trials down to <code>T6</code> unverified commentary).
            <sup>
              <a href="#fn-12" className="footnote-ref" aria-label="Footnote 12">
                [12]
              </a>
            </sup>
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

        <section className="chronicle-references" aria-labelledby="references-heading">
          <h2 id="references-heading">Scholarly References &amp; Primary Sources</h2>
          <ol className="chronicle-footnotes">
            <li id="fn-1">
              <strong>George, A. R.</strong> (2003).{" "}
              <em>The Babylonian Gilgamesh Epic: Introduction, Critical Edition and Cuneiform Texts</em> (Vols. 1–2;
              Tablet XI, lines 278–307, pp. 720–725, recording the thorny plant <em>Šībū issahir amēlu</em> and
              Gilgamesh&rsquo;s proposed trial in Uruk). Oxford University Press. ISBN 978-0-19-814922-4. Primary cuneiform
              witness:{" "}
              <a
                href="https://www.britishmuseum.org/collection/object/W_K-3375"
                target="_blank"
                rel="noopener noreferrer"
              >
                British Museum K.3375
              </a>{" "}
              (Royal Library of Ashurbanipal, Nineveh, 7th century BCE).{" "}
              <a href="#ref-1" className="footnote-back" aria-label="Back to text for note 1">
                ↩
              </a>
            </li>
            <li id="fn-2">
              <strong>Gardiner, A. H.</strong> (1938). &ldquo;The House of Life.&rdquo;{" "}
              <em>The Journal of Egyptian Archaeology</em>, 24(2), 157–179 (
              <a href="https://doi.org/10.1177/030751333802400131" target="_blank" rel="noopener noreferrer">
                doi:10.1177/030751333802400131
              </a>
              ); see also <strong>Allen, J. P.</strong> (2005). <em>The Art of Medicine in Ancient Egypt</em> (including
              the Edwin Smith Surgical Papyrus). New York: The Metropolitan Museum of Art / Yale University Press.{" "}
              <a href="#ref-2" className="footnote-back" aria-label="Back to text for note 2">
                ↩
              </a>
            </li>
            <li id="fn-3">
              <strong>Jouanna, J.</strong> (1999). <em>Hippocrates</em> (M. B. DeBevoise, Trans.). Baltimore: Johns Hopkins
              University Press; and <strong>Zhmud, L.</strong> (2012).{" "}
              <em>Pythagoras and the Early Pythagoreans</em>. Oxford University Press (
              <a
                href="https://doi.org/10.1093/acprof:oso/9780199289318.001.0001"
                target="_blank"
                rel="noopener noreferrer"
              >
                doi:10.1093/acprof:oso/9780199289318.001.0001
              </a>
              ).{" "}
              <a href="#ref-3" className="footnote-back" aria-label="Back to text for note 3">
                ↩
              </a>
            </li>
            <li id="fn-4">
              <strong>Needham, J.</strong> (1974).{" "}
              <em>
                Science and Civilisation in China, Vol. 5: Chemistry and Chemical Technology, Part 2: Spagyrical Discovery
                and Invention: Magisteries of Gold and Immortality
              </em>
              . Cambridge University Press; and <strong>Wujastyk, D.</strong> (2003).{" "}
              <em>The Roots of Ayurveda: Selections from Sanskrit Medical Writings</em> (Caraka and Suśruta Saṃhitās on{" "}
              <em>Rasāyana</em> rejuvenation). Penguin Classics.{" "}
              <a href="#ref-4" className="footnote-back" aria-label="Back to text for note 4">
                ↩
              </a>
            </li>
            <li id="fn-5">
              <strong>MacLeod, R.</strong> (Ed.). (2000).{" "}
              <em>The Library of Alexandria: Centre of Learning in the Ancient World</em>. London: I.B. Tauris; and{" "}
              <strong>Blum, R.</strong> (1991).{" "}
              <em>Kallimachos: The Alexandrian Library and the Origins of Bibliography</em> (H. H. Wellisch, Trans.).
              University of Wisconsin Press.{" "}
              <a href="#ref-5" className="footnote-back" aria-label="Back to text for note 5">
                ↩
              </a>
            </li>
            <li id="fn-6">
              <strong>Pliny the Elder</strong> (c. 77–79 CE). <em>Naturalis Historia</em> (H. Rackham, W. H. S. Jones, &amp;
              D. E. Eichholz, Trans., 10 vols., Loeb Classical Library, Harvard University Press, 1938–1963); and{" "}
              <strong>Nutton, V.</strong> (2012). <em>Ancient Medicine</em> (2nd ed.). Routledge (
              <a href="https://doi.org/10.4324/9780203081297" target="_blank" rel="noopener noreferrer">
                doi:10.4324/9780203081297
              </a>
              ).{" "}
              <a href="#ref-6" className="footnote-back" aria-label="Back to text for note 6">
                ↩
              </a>
            </li>
            <li id="fn-7">
              <strong>Gutas, D.</strong> (1998).{" "}
              <em>
                Greek Thought, Arabic Culture: The Graeco-Arabic Translation Movement in Baghdad and Early &lsquo;Abbasid
                Society (2nd–4th/8th–10th Centuries)
              </em>
              . Routledge (
              <a href="https://doi.org/10.4324/9780203316276" target="_blank" rel="noopener noreferrer">
                doi:10.4324/9780203316276
              </a>
              ); <strong>Ibn Sīnā (Avicenna)</strong> (1025). <em>Al-Qānūn fī al-Ṭibb</em> (<em>The Canon of Medicine</em>
              ); and <strong>Reynolds, L. D., &amp; Wilson, N. G.</strong> (2013).{" "}
              <em>Scribes and Scholars: A Guide to the Transmission of Greek and Latin Literature</em> (4th ed.). Oxford
              University Press. Primary manuscript witness for Fig. 4: al-Ḥarīrī, <em>Maqāmāt</em>, illustrated by Yaḥyā ibn
              Maḥmūd al-Wāsiṭī (1237 CE),{" "}
              <a
                href="https://gallica.bnf.fr/ark:/12148/btv1b8422965p/f20.item"
                target="_blank"
                rel="noopener noreferrer"
              >
                BnF MS Arabe 5847, fol. 5v
              </a>
              .{" "}
              <a href="#ref-7" className="footnote-back" aria-label="Back to text for note 7">
                ↩
              </a>
            </li>
            <li id="fn-8">
              <strong>Principe, L. M.</strong> (2013). <em>The Secrets of Alchemy</em>. University of Chicago Press; and{" "}
              <strong>DeVun, L.</strong> (2009).{" "}
              <em>Prophecy, Alchemy, and the End of Time: John of Rupescissa in the Late Middle Ages</em>. Columbia
              University Press.{" "}
              <a href="#ref-8" className="footnote-back" aria-label="Back to text for note 8">
                ↩
              </a>
            </li>
            <li id="fn-9">
              <strong>Eisenstein, E. L.</strong> (1979).{" "}
              <em>The Printing Press as an Agent of Change: Communications and Cultural Transformations in Early-Modern Europe</em>
              . Cambridge University Press; <strong>Bacon, F.</strong> (1620). <em>Novum Organum Scientiarum</em> (London:
              John Bill); and <strong>Sprat, T.</strong> (1667).{" "}
              <em>The History of the Royal-Society of London, for the Improving of Natural Knowledge</em>.{" "}
              <a href="#ref-9" className="footnote-back" aria-label="Back to text for note 9">
                ↩
              </a>
            </li>
            <li id="fn-10">
              <strong>Diderot, D., &amp; d&rsquo;Alembert, J. le Rond</strong> (Eds.). (1751–1772).{" "}
              <em>
                Encyclopédie, ou dictionnaire raisonné des sciences, des arts et des métiers
              </em>{" "}
              (Vol. 1, <em>Discours préliminaire</em> &amp; <em>Système figuré des connaissances humaines</em>). Paris:
              Briasson, David, Le Breton, &amp; Durand.{" "}
              <a href="#ref-10" className="footnote-back" aria-label="Back to text for note 10">
                ↩
              </a>
            </li>
            <li id="fn-11">
              <strong>Lind, J.</strong> (1753).{" "}
              <em>
                A Treatise of the Scurvy. In Three Parts. Containing an Inquiry into the Nature, Causes, and Cure, of that
                Disease
              </em>{" "}
              (Part II, Chap. IV, pp. 149–153, documenting the May 1747 controlled clinical trial aboard HMS{" "}
              <em>Salisbury</em>). Edinburgh: Sands, Murray, and Cochran; see also <strong>Tröhler, U.</strong> (2003).{" "}
              <a
                href="https://www.jameslindlibrary.org/articles/james-lind-and-the-evaluation-of-clinical-treatments/"
                target="_blank"
                rel="noopener noreferrer"
              >
                &ldquo;James Lind and the evaluation of clinical treatments.&rdquo;
              </a>{" "}
              <em>James Lind Library</em>.{" "}
              <a href="#ref-11" className="footnote-back" aria-label="Back to text for note 11">
                ↩
              </a>
            </li>
            <li id="fn-12">
              <strong>Evidence-Based Medicine Working Group (Guyatt, G., Cairns, J., Churchill, D., et al.)</strong>{" "}
              (1992). &ldquo;Evidence-based medicine. A new approach to teaching the practice of medicine.&rdquo;{" "}
              <em>JAMA</em>, 268(17), 2420–2425 (
              <a href="https://doi.org/10.1001/jama.1992.03490170092032" target="_blank" rel="noopener noreferrer">
                doi:10.1001/jama.1992.03490170092032
              </a>
              ); and <strong>OCEBM Levels of Evidence Working Group (Howick, J., et al.)</strong> (2011).{" "}
              <em>The Oxford 2011 Levels of Evidence</em>. Oxford Centre for Evidence-Based Medicine.{" "}
              <a href="#ref-12" className="footnote-back" aria-label="Back to text for note 12">
                ↩
              </a>
            </li>
          </ol>
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
