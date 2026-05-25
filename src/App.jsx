import React, { useMemo, useState } from "react";
import { ArrowLeft, Globe2, Search, ShoppingCart } from "lucide-react";

const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];

const jerseyTypes = [
  { key: "home", fr: "Chandail Domicile Régulier", en: "Regular Home Jersey", price: 80 },
  { key: "away", fr: "Chandail Extérieur Régulier", en: "Regular Away Jersey", price: 80 },
  { key: "home2024", fr: "Chandail Domicile 2024", en: "2024 Home Jersey", price: 80 },
  { key: "away2024", fr: "Chandail Extérieur 2024", en: "2024 Away Jersey", price: 80 },
  { key: "alternate", fr: "Chandail Alternatif", en: "Alternate Jersey", price: 80 },
  { key: "custom", fr: "Chandail Custom", en: "Custom Jersey", price: 95 },
];

const nhlTeams = {
  Est: {
    Atlantique: [
      { team: "Boston Bruins", players: ["David Pastrnak", "Brad Marchand", "Charlie McAvoy", "Bobby Orr", "Ray Bourque"] },
      { team: "Buffalo Sabres", players: ["Tage Thompson", "Rasmus Dahlin", "Owen Power", "Dominik Hasek", "Gilbert Perreault"] },
      { team: "Detroit Red Wings", players: ["Dylan Larkin", "Lucas Raymond", "Moritz Seider", "Steve Yzerman", "Nicklas Lidstrom"] },
      { team: "Florida Panthers", players: ["Aleksander Barkov", "Matthew Tkachuk", "Sam Reinhart", "Sergei Bobrovsky", "Aaron Ekblad"] },
      { team: "Montréal Canadiens", players: ["Nick Suzuki", "Cole Caufield", "Lane Hutson", "Ivan Demidov", "Juraj Slafkovsky", "Jakub Dobes", "Jacob Fowler", "Noah Dobson", "Josh Anderson", "Brendan Gallagher", "Alex Newhook", "Kirby Dach", "Zach Bolduc", "David Reinbacher", "Oliver Kapanen", "Arber Xhekaj", "Kaiden Guhle"] },
      { team: "Ottawa Senators", players: ["Brady Tkachuk", "Tim Stutzle", "Jake Sanderson", "Thomas Chabot", "Daniel Alfredsson"] },
      { team: "Tampa Bay Lightning", players: ["Nikita Kucherov", "Brayden Point", "Victor Hedman", "Andrei Vasilevskiy", "Steven Stamkos"] },
      { team: "Toronto Maple Leafs", players: ["Auston Matthews", "Mitch Marner", "William Nylander", "John Tavares", "Mats Sundin"] },
    ],
    Métropolitaine: [
      { team: "Carolina Hurricanes", players: ["Sebastian Aho", "Andrei Svechnikov", "Jaccob Slavin", "Rod Brind'Amour", "Eric Staal"] },
      { team: "Columbus Blue Jackets", players: ["Adam Fantilli", "Zach Werenski", "Johnny Gaudreau", "Rick Nash", "Kirill Marchenko"] },
      { team: "New Jersey Devils", players: ["Jack Hughes", "Nico Hischier", "Jesper Bratt", "Dougie Hamilton", "Martin Brodeur"] },
      { team: "New York Islanders", players: ["Mathew Barzal", "Bo Horvat", "Ilya Sorokin", "Mike Bossy", "Bryan Trottier"] },
      { team: "New York Rangers", players: ["Artemi Panarin", "Mika Zibanejad", "Adam Fox", "Igor Shesterkin", "Mark Messier", "Brian Leetch"] },
      { team: "Philadelphia Flyers", players: ["Matvei Michkov", "Travis Konecny", "Owen Tippett", "Bobby Clarke", "Eric Lindros"] },
      { team: "Pittsburgh Penguins", players: ["Sidney Crosby", "Evgeni Malkin", "Kris Letang", "Jaromir Jagr", "Mario Lemieux"] },
      { team: "Washington Capitals", players: ["Alex Ovechkin", "John Carlson", "Tom Wilson", "Nicklas Backstrom", "Peter Bondra"] },
    ],
  },
  Ouest: {
    Centrale: [
      { team: "Chicago Blackhawks", players: ["Connor Bedard", "Taylor Hall", "Alex Vlasic", "Patrick Kane", "Jonathan Toews"] },
      { team: "Colorado Avalanche", players: ["Nathan MacKinnon", "Cale Makar", "Mikko Rantanen", "Joe Sakic", "Peter Forsberg", "Patrick Roy"] },
      { team: "Dallas Stars", players: ["Jason Robertson", "Miro Heiskanen", "Roope Hintz", "Jake Oettinger", "Mike Modano"] },
      { team: "Minnesota Wild", players: ["Kirill Kaprizov", "Matt Boldy", "Joel Eriksson Ek", "Brock Faber", "Marian Gaborik"] },
      { team: "Nashville Predators", players: ["Filip Forsberg", "Roman Josi", "Juuse Saros", "Ryan O'Reilly", "Shea Weber", "Pekka Rinne"] },
      { team: "St. Louis Blues", players: ["Robert Thomas", "Jordan Kyrou", "Jordan Binnington", "Brett Hull", "Alex Pietrangelo"] },
      { team: "Utah Mammoth", players: ["Logan Cooley", "Dylan Guenther", "Clayton Keller", "Mikhail Sergachev", "Connor Ingram"] },
      { team: "Winnipeg Jets", players: ["Connor Hellebuyck", "Kyle Connor", "Mark Scheifele", "Josh Morrissey", "Teemu Selanne", "Dale Hawerchuk"] },
    ],
    Pacifique: [
      { team: "Anaheim Ducks", players: ["Leo Carlsson", "Trevor Zegras", "Mason McTavish", "Cutter Gauthier", "Paul Kariya", "Teemu Selanne"] },
      { team: "Calgary Flames", players: ["Jonathan Huberdeau", "Nazem Kadri", "MacKenzie Weegar", "Dustin Wolf", "Jarome Iginla"] },
      { team: "Edmonton Oilers", players: ["Connor McDavid", "Leon Draisaitl", "Evan Bouchard", "Ryan Nugent-Hopkins", "Wayne Gretzky", "Mark Messier"] },
      { team: "Los Angeles Kings", players: ["Anze Kopitar", "Drew Doughty", "Kevin Fiala", "Quinton Byfield", "Wayne Gretzky", "Luc Robitaille"] },
      { team: "San Jose Sharks", players: ["Macklin Celebrini", "Will Smith", "William Eklund", "Logan Couture", "Joe Thornton", "Patrick Marleau"] },
      { team: "Seattle Kraken", players: ["Matty Beniers", "Jared McCann", "Vince Dunn", "Jordan Eberle", "Adam Larsson"] },
      { team: "Vancouver Canucks", players: ["Elias Pettersson", "Quinn Hughes", "J.T. Miller", "Thatcher Demko", "Pavel Bure", "Trevor Linden"] },
      { team: "Vegas Golden Knights", players: ["Jack Eichel", "Mark Stone", "Alex Pietrangelo", "William Karlsson", "Marc-Andre Fleury", "Jonathan Marchessault"] },
    ],
  },
};

const otherSports = {
  NFL: ["Kansas City Chiefs", "Buffalo Bills", "Dallas Cowboys", "Philadelphia Eagles", "San Francisco 49ers", "Green Bay Packers"],
  MLB: ["Toronto Blue Jays", "New York Yankees", "Los Angeles Dodgers", "Boston Red Sox", "New York Mets", "Montréal Expos"],
  NBA: ["Toronto Raptors", "Los Angeles Lakers", "Boston Celtics", "Chicago Bulls", "Golden State Warriors", "New York Knicks"],
  WWE: ["Roman Reigns", "Cody Rhodes", "The Rock", "John Cena", "Stone Cold", "The Undertaker"],
};

const text = {
  fr: {
    shop: "Magasiner",
    sports: "Sports",
    subtitle: "Chandails sportifs premium pour les vrais partisans.",
    hero: "Boutique bilingue de chandails LNH, NFL, MLB, NBA et WWE.",
    chooseSport: "Choisir un sport",
    east: "Conférence Est",
    west: "Conférence Ouest",
    back: "Retour",
    add: "Ajouter au panier",
    player: "Joueur",
    size: "Grandeur",
    familyName: "Nom de famille",
    number: "Numéro",
    cart: "Panier",
    empty: "Votre panier est vide.",
    home: "Accueil",
    subtotal: "Sous-total",
    customNotice: "Chandail personnalisé avec nom et numéro.",
    coming: "Structure prête : équipes, chandails, joueurs et grandeurs seront ajoutés comme pour la LNH.",
    searchTeam: "Rechercher une équipe",
  },
  en: {
    shop: "Shop",
    sports: "Sports",
    subtitle: "Premium sports jerseys for real fans.",
    hero: "Bilingual store for NHL, NFL, MLB, NBA and WWE jerseys.",
    chooseSport: "Choose a sport",
    east: "Eastern Conference",
    west: "Western Conference",
    back: "Back",
    add: "Add to cart",
    player: "Player",
    size: "Size",
    familyName: "Last name",
    number: "Number",
    cart: "Cart",
    empty: "Your cart is empty.",
    home: "Home",
    subtotal: "Subtotal",
    customNotice: "Personalized jersey with name and number.",
    coming: "Structure ready: teams, jerseys, players and sizes will be added like NHL.",
    searchTeam: "Search a team",
  },
};

function money(amount) {
  return new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(amount);
}

function allNhlTeams() {
  return Object.values(nhlTeams).flatMap((conference) => Object.values(conference).flat());
}

function runTests() {
  const teams = allNhlTeams();
  console.assert(teams.length === 32, `Expected 32 NHL teams, got ${teams.length}`);
  console.assert(jerseyTypes.length === 6, "Expected 6 jersey types");
  console.assert(jerseyTypes.some((item) => item.key === "custom"), "Expected custom jersey type");
  console.assert(sizes.includes("XXXL"), "Expected XXXL size");
  const canadiens = teams.find((item) => item.team === "Montréal Canadiens");
  console.assert(Boolean(canadiens), "Expected Montréal Canadiens");
  console.assert(canadiens.players.includes("Ivan Demidov"), "Expected Ivan Demidov for Canadiens");
}

runTests();

function TeamPage({ team, lang, t, onBack, addToCart }) {
  const [choices, setChoices] = useState({});

  function updateChoice(key, field, value) {
    setChoices((old) => ({ ...old, [key]: { ...old[key], [field]: value } }));
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button type="button" onClick={onBack} style={styles.backButton}><ArrowLeft size={18} /> {t.back}</button>
        <section style={styles.teamHero}>
          <div style={styles.kicker}>LNH / NHL</div>
          <h1 style={styles.teamTitle}>{team.team}</h1>
        </section>
        <section style={styles.jerseyGrid}>
          {jerseyTypes.map((jersey) => {
            const current = choices[jersey.key] || {};
            const selectedPlayer = current.player || team.players[0];
            const selectedSize = current.size || "L";
            const customName = current.name || "TREMBLAY";
            const customNumber = current.number || "31";
            const title = lang === "fr" ? jersey.fr : jersey.en;
            const cartName = jersey.key === "custom" ? `${title} - ${customName} #${customNumber} - ${selectedSize}` : `${title} - ${selectedPlayer} - ${selectedSize}`;

            return (
              <article key={jersey.key} style={styles.card}>
                <div style={styles.jerseyImage}><div style={styles.emoji}>🏒</div><strong>{team.team}</strong></div>
                <div style={styles.cardBody}>
                  <div style={styles.price}>{money(jersey.price)}</div>
                  <h2 style={styles.cardTitle}>{title}</h2>
                  {jersey.key === "custom" ? (
                    <div>
                      <p style={styles.muted}>{t.customNotice}</p>
                      <label style={styles.label}>{t.familyName}</label>
                      <input value={customName} maxLength={14} onChange={(event) => updateChoice(jersey.key, "name", event.target.value.toUpperCase())} style={styles.input} />
                      <label style={styles.label}>{t.number}</label>
                      <select value={customNumber} onChange={(event) => updateChoice(jersey.key, "number", event.target.value)} style={styles.input}>
                        {Array.from({ length: 100 }, (_, index) => <option key={index} value={String(index)}>{index}</option>)}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label style={styles.label}>{t.player}</label>
                      <select value={selectedPlayer} onChange={(event) => updateChoice(jersey.key, "player", event.target.value)} style={styles.input}>
                        {team.players.map((player) => <option key={player} value={player}>{player}</option>)}
                      </select>
                    </div>
                  )}
                  <label style={styles.label}>{t.size}</label>
                  <select value={selectedSize} onChange={(event) => updateChoice(jersey.key, "size", event.target.value)} style={styles.input}>
                    {sizes.map((size) => <option key={size} value={size}>{size}</option>)}
                  </select>
                  <button type="button" onClick={() => addToCart({ id: `${team.team}-${jersey.key}-${Date.now()}`, name: cartName, team: team.team, price: jersey.price })} style={styles.addButton}>{t.add}</button>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("fr");
  const [sport, setSport] = useState(null);
  const [conference, setConference] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const t = text[lang];

  const filteredConferenceTeams = useMemo(() => {
    if (!conference) return [];
    return allNhlTeams().filter((team) => team.team.toLowerCase().includes(query.toLowerCase()));
  }, [conference, query]);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  if (selectedTeam) {
    return <TeamPage team={selectedTeam} lang={lang} t={t} onBack={() => setSelectedTeam(null)} addToCart={(item) => setCart((old) => [...old, item])} />;
  }

  return (
    <div style={styles.page}>
      <div style={styles.announcement}>Affichez vos couleurs / Show your colors - Passion Sports Boutique</div>
      <header style={styles.header}>
        <button type="button" onClick={() => { setSport(null); setConference(null); }} style={styles.logoButton}>
          <div style={styles.logo}>PS</div>
          <div><div style={styles.logoText}>Passion Sports</div><div style={styles.logoSub}>Boutique</div></div>
        </button>
        <nav style={styles.nav}>
          <button type="button" onClick={() => { setSport(null); setConference(null); }} style={styles.navButton}>{t.home}</button>
          <a href="#sports" style={styles.navLink}>{t.sports}</a>
          <a href="#cart" style={styles.navLink}>{t.cart}</a>
        </nav>
        <div style={styles.headerActions}>
          <button type="button" onClick={() => setLang(lang === "fr" ? "en" : "fr")} style={styles.langButton}><Globe2 size={16} /> {lang === "fr" ? "EN" : "FR"}</button>
          <a href="#cart" style={styles.cartIcon}><ShoppingCart size={18} /> {cart.length}</a>
        </div>
      </header>

      {!sport && (
        <main>
          <section style={styles.hero}>
            <div>
              <div style={styles.badge}>LNH - NFL - MLB - NBA - WWE</div>
              <h1 style={styles.heroTitle}>Passion Sports Boutique</h1>
              <p style={styles.subtitle}>{t.subtitle}</p>
              <p style={styles.heroText}>{t.hero}</p>
              <a href="#sports" style={styles.primaryButton}>{t.shop}</a>
            </div>
            <div style={styles.heroPanel}>
              {['LNH', 'NFL', 'MLB', 'NBA'].map((item) => <div key={item} style={styles.sportTile}>{item}</div>)}
            </div>
          </section>
          <section style={styles.trustGrid}>
            {["Qualité premium", "Commande simple", "Service bilingue", "Livraison rapide"].map((item) => <div key={item} style={styles.trustCard}>{item}</div>)}
          </section>
        </main>
      )}

      <section id="sports" style={styles.section}>
        <div style={styles.sectionHeader}>
          <div><h2 style={styles.sectionTitle}>{t.chooseSport}</h2><p style={styles.muted}>Sports - conférence/ligue - équipe - chandail - joueur/grandeur.</p></div>
          {sport && <button type="button" onClick={() => { setSport(null); setConference(null); }} style={styles.secondaryButton}>{t.back}</button>}
        </div>
        <div style={styles.sportGrid}>
          {["LNH", "NFL", "MLB", "NBA", "WWE"].map((item) => (
            <button key={item} type="button" onClick={() => { setSport(item); setConference(null); }} style={sport === item ? styles.sportButtonActive : styles.sportButton}>{item}</button>
          ))}
        </div>

        {sport === "LNH" && (
          <div style={styles.conferenceArea}>
            <div style={styles.buttonRow}>
              <button type="button" onClick={() => setConference("Est")} style={conference === "Est" ? styles.choiceActive : styles.choiceButton}>{t.east}</button>
              <button type="button" onClick={() => setConference("Ouest")} style={conference === "Ouest" ? styles.choiceActive : styles.choiceButton}>{t.west}</button>
            </div>
            {conference && (
              <div>
                <label style={styles.searchBox}><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.searchTeam} style={styles.searchInput} /></label>
                <div style={styles.divisionGrid}>
                  {Object.entries(nhlTeams[conference]).map(([division, teams]) => (
                    <div key={division} style={styles.divisionCard}>
                      <h3 style={styles.divisionTitle}>Division {division}</h3>
                      <div style={styles.teamGrid}>
                        {teams.filter((team) => filteredConferenceTeams.includes(team)).map((team) => <button key={team.team} type="button" onClick={() => setSelectedTeam(team)} style={styles.teamButton}>{team.team}</button>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {sport && sport !== "LNH" && (
          <div style={styles.comingCard}>
            <h3 style={styles.divisionTitle}>{sport}</h3>
            <p style={styles.muted}>{t.coming}</p>
            <div style={styles.teamGrid}>{otherSports[sport].map((item) => <div key={item} style={styles.teamButton}>{item}</div>)}</div>
          </div>
        )}
      </section>

      <section id="cart" style={styles.section}>
        <div style={styles.cartBox}>
          <h2 style={styles.sectionTitle}>{t.cart}</h2>
          {cart.length === 0 ? <p style={styles.muted}>{t.empty}</p> : (
            <div>{cart.map((item) => <div key={item.id} style={styles.cartLine}><div><strong>{item.name}</strong><br /><span style={styles.muted}>{item.team}</span></div><strong style={styles.orange}>{money(item.price)}</strong></div>)}<div style={styles.total}>{t.subtotal}: <span style={styles.orange}>{money(subtotal)}</span></div></div>
          )}
        </div>
      </section>
      <footer style={styles.footer}>© 2026 Passion Sports Boutique - info@passionsportsboutique.com</footer>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#070707", color: "#ffffff", fontFamily: "Arial, Helvetica, sans-serif", width: "100%" },
  announcement: { background: "#f97316", color: "#111", textAlign: "center", fontWeight: 900, padding: "10px 15px" },
  header: { position: "sticky", top: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, padding: "18px 5%", background: "rgba(7,7,7,0.94)", borderBottom: "1px solid rgba(255,255,255,0.12)", flexWrap: "wrap" },
  logoButton: { display: "flex", alignItems: "center", gap: 12, background: "transparent", color: "white", border: 0, cursor: "pointer", textAlign: "left" },
  logo: { width: 48, height: 48, borderRadius: 16, display: "grid", placeItems: "center", color: "#111", fontWeight: 900, background: "linear-gradient(135deg,#fb923c,#dc2626)" },
  logoText: { fontSize: 20, fontWeight: 900 },
  logoSub: { color: "#fdba74", letterSpacing: 4, fontSize: 11, textTransform: "uppercase" },
  nav: { display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" },
  navButton: { background: "transparent", border: 0, color: "#ffffff", fontWeight: 800, cursor: "pointer" },
  navLink: { color: "#ffffff", fontWeight: 800, textDecoration: "none" },
  headerActions: { display: "flex", gap: 10, alignItems: "center" },
  langButton: { display: "flex", gap: 6, alignItems: "center", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", color: "white", background: "transparent", padding: "10px 14px", fontWeight: 800, cursor: "pointer" },
  cartIcon: { display: "flex", gap: 6, alignItems: "center", borderRadius: 999, color: "#111", background: "white", padding: "10px 14px", fontWeight: 900, textDecoration: "none" },
  hero: { display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(320px,0.9fr)", gap: 40, maxWidth: 1200, margin: "0 auto", padding: "90px 5%", alignItems: "center" },
  badge: { display: "inline-block", color: "#fed7aa", background: "rgba(249,115,22,0.13)", border: "1px solid rgba(249,115,22,0.35)", borderRadius: 999, padding: "10px 16px", fontWeight: 900 },
  heroTitle: { fontSize: "clamp(42px,7vw,78px)", lineHeight: 1, margin: "22px 0 0", fontWeight: 900, color: "#ffffff" },
  subtitle: { color: "#fdba74", fontSize: 25, fontWeight: 900, marginTop: 22 },
  heroText: { color: "rgba(255,255,255,0.7)", fontSize: 18, lineHeight: 1.7, maxWidth: 650 },
  primaryButton: { display: "inline-block", marginTop: 22, background: "#f97316", color: "#111", borderRadius: 18, padding: "16px 26px", fontWeight: 900, textDecoration: "none", fontSize: 18 },
  heroPanel: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 32, padding: 24 },
  sportTile: { display: "grid", placeItems: "center", minHeight: 145, borderRadius: 24, background: "#111", color: "#fdba74", fontSize: 38, fontWeight: 900 },
  trustGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 16, maxWidth: 1200, margin: "0 auto", padding: "26px 5%", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)" },
  trustCard: { background: "rgba(255,255,255,0.05)", borderRadius: 18, padding: 18, fontWeight: 900 },
  section: { maxWidth: 1200, margin: "0 auto", padding: "70px 5%" },
  sectionHeader: { display: "flex", alignItems: "end", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 28 },
  sectionTitle: { fontSize: 38, fontWeight: 900, margin: 0, color: "#ffffff" },
  muted: { color: "rgba(255,255,255,0.62)", lineHeight: 1.6 },
  sportGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 16 },
  sportButton: { border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "white", borderRadius: 24, padding: "34px 18px", fontSize: 30, fontWeight: 900, cursor: "pointer" },
  sportButtonActive: { border: "1px solid #fdba74", background: "#f97316", color: "#111", borderRadius: 24, padding: "34px 18px", fontSize: 30, fontWeight: 900, cursor: "pointer" },
  secondaryButton: { border: "1px solid rgba(255,255,255,0.18)", background: "transparent", color: "white", borderRadius: 16, padding: "13px 18px", fontWeight: 900, cursor: "pointer" },
  conferenceArea: { marginTop: 36 },
  buttonRow: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 },
  choiceButton: { border: 0, background: "rgba(255,255,255,0.1)", color: "white", borderRadius: 16, padding: "13px 18px", fontWeight: 900, cursor: "pointer" },
  choiceActive: { border: 0, background: "#f97316", color: "#111", borderRadius: 16, padding: "13px 18px", fontWeight: 900, cursor: "pointer" },
  searchBox: { display: "flex", gap: 10, alignItems: "center", maxWidth: 420, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", borderRadius: 18, padding: "0 14px", marginBottom: 24 },
  searchInput: { flex: 1, background: "transparent", color: "white", border: 0, outline: 0, padding: "14px 0", fontSize: 16 },
  divisionGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 22 },
  divisionCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 28, padding: 24 },
  divisionTitle: { color: "#fdba74", fontSize: 26, fontWeight: 900, marginTop: 0 },
  teamGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 12, marginTop: 18 },
  teamButton: { background: "rgba(255,255,255,0.07)", color: "white", border: 0, borderRadius: 16, padding: 16, fontWeight: 900, textAlign: "left", cursor: "pointer" },
  comingCard: { marginTop: 36, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 28, padding: 28 },
  cartBox: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 28, padding: 28 },
  cartLine: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, background: "rgba(255,255,255,0.06)", borderRadius: 18, padding: 18, marginTop: 12 },
  orange: { color: "#fdba74" },
  total: { borderTop: "1px solid rgba(255,255,255,0.12)", marginTop: 18, paddingTop: 18, textAlign: "right", fontSize: 22, fontWeight: 900 },
  footer: { borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center", color: "rgba(255,255,255,0.48)", padding: 30 },
  container: { maxWidth: 1200, margin: "0 auto", padding: "40px 5%" },
  backButton: { display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.16)", background: "transparent", color: "white", borderRadius: 18, padding: "13px 18px", fontWeight: 900, cursor: "pointer", marginBottom: 22 },
  teamHero: { background: "linear-gradient(135deg,rgba(249,115,22,0.24),rgba(255,255,255,0.04))", border: "1px solid rgba(249,115,22,0.28)", borderRadius: 32, padding: 36 },
  kicker: { color: "#fdba74", fontWeight: 900, letterSpacing: 4, fontSize: 13 },
  teamTitle: { fontSize: "clamp(38px,6vw,68px)", margin: "12px 0 0", fontWeight: 900, color: "#ffffff" },
  jerseyGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 22, marginTop: 28 },
  card: { overflow: "hidden", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 28 },
  jerseyImage: { height: 220, display: "grid", placeItems: "center", textAlign: "center", background: "linear-gradient(135deg,#1f2937,#09090b)", color: "#fdba74" },
  emoji: { fontSize: 58, marginBottom: 10 },
  cardBody: { padding: 22 },
  price: { display: "inline-block", background: "#f97316", color: "#111", borderRadius: 999, padding: "7px 11px", fontSize: 13, fontWeight: 900, marginBottom: 12 },
  cardTitle: { margin: "0 0 8px", fontSize: 22, fontWeight: 900, color: "#ffffff" },
  label: { display: "block", color: "rgba(255,255,255,0.75)", fontWeight: 900, fontSize: 14, marginTop: 16, marginBottom: 8 },
  input: { width: "100%", boxSizing: "border-box", background: "#111", color: "white", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: 14, outline: 0, fontSize: 15 },
  addButton: { width: "100%", border: 0, background: "#f97316", color: "#111", borderRadius: 16, padding: 15, fontWeight: 900, cursor: "pointer", marginTop: 20 },
};
