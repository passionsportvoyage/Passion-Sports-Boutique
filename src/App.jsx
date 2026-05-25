import React, { useState } from "react";

const nhlTeams = {
  Est: {
    Atlantique: [
      {
        team: "Montréal Canadiens",
        players: [
          "Nick Suzuki",
          "Cole Caufield",
          "Lane Hutson",
          "Ivan Demidov",
          "Juraj Slafkovsky",
          "Jakub Dobes",
          "Jacob Fowler",
          "Noah Dobson",
          "Josh Anderson",
          "Brendan Gallagher",
          "Alex Newhook",
          "Kirby Dach",
          "Zach Bolduc",
          "David Reinbacher",
          "Oliver Kapanen",
          "Arber Xhekaj",
          "Kaiden Guhle",
        ],
      },
      { team: "Boston Bruins", players: ["Pastrnak", "McAvoy"] },
      { team: "Toronto Maple Leafs", players: ["Matthews", "Marner"] },
      { team: "Ottawa Senators", players: ["Tkachuk", "Stutzle"] },
    ],
  },

  Ouest: {
    Pacifique: [
      { team: "Edmonton Oilers", players: ["McDavid", "Draisaitl"] },
      { team: "Vancouver Canucks", players: ["Pettersson", "Hughes"] },
      { team: "Vegas Golden Knights", players: ["Eichel", "Stone"] },
    ],
  },
};

const jerseyTypes = [
  "Chandail Domicile Régulier",
  "Chandail Extérieur Régulier",
  "Chandail Domicile 2024",
  "Chandail Extérieur 2024",
  "Chandail Alternatif",
  "Chandail Custom",
];

const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];

export default function App() {
  const [conference, setConference] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <div
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
        padding: 20,
      }}
    >
      <h1 style={{ color: "orange", fontSize: 42 }}>
        Passion Sports Boutique
      </h1>

      {!conference && (
        <div style={{ marginTop: 30 }}>
          <button
            onClick={() => setConference("Est")}
            style={buttonStyle}
          >
            Conférence Est
          </button>

          <button
            onClick={() => setConference("Ouest")}
            style={buttonStyle}
          >
            Conférence Ouest
          </button>
        </div>
      )}

      {conference && !selectedTeam && (
        <div style={{ marginTop: 30 }}>
          <button
            onClick={() => setConference(null)}
            style={backButton}
          >
            Retour
          </button>

          <h2>Conférence {conference}</h2>

          {Object.entries(nhlTeams[conference]).map(
            ([division, teams]) => (
              <div key={division}>
                <h3 style={{ color: "orange" }}>{division}</h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit,minmax(220px,1fr))",
                    gap: 20,
                  }}
                >
                  {teams.map((team) => (
                    <div
                      key={team.team}
                      style={cardStyle}
                      onClick={() => setSelectedTeam(team)}
                    >
                      <h3>{team.team}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}

      {selectedTeam && (
        <div style={{ marginTop: 30 }}>
          <button
            onClick={() => setSelectedTeam(null)}
            style={backButton}
          >
            Retour aux équipes
          </button>

          <h2>{selectedTeam.team}</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(320px,1fr))",
              gap: 25,
            }}
          >
            {jerseyTypes.map((jersey) => (
              <div key={jersey} style={cardStyle}>
                <img
                  src="https://images.unsplash.com/photo-1521412644187-c49fa049e84d"
                  alt=""
                  style={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",
                    borderRadius: 10,
                  }}
                />

                <h3 style={{ marginTop: 15 }}>{jersey}</h3>

                {jersey !== "Chandail Custom" ? (
                  <>
                    <label>Joueur</label>

                    <select style={selectStyle}>
                      {selectedTeam.players.map((player) => (
                        <option key={player}>{player}</option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    <label>Nom</label>

                    <input
                      placeholder="TREMBLAY"
                      style={inputStyle}
                    />

                    <label>Numéro</label>

                    <select style={selectStyle}>
                      {Array.from({ length: 100 }, (_, i) => (
                        <option key={i}>{i}</option>
                      ))}
                    </select>
                  </>
                )}

                <label>Grandeur</label>

                <select style={selectStyle}>
                  {sizes.map((size) => (
                    <option key={size}>{size}</option>
                  ))}
                </select>

                <button style={cartButton}>
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  background: "orange",
  color: "black",
  border: "none",
  padding: "15px 25px",
  marginRight: 15,
  borderRadius: 10,
  fontWeight: "bold",
  cursor: "pointer",
};

const backButton = {
  ...buttonStyle,
  background: "#333",
  color: "white",
};

const cardStyle = {
  background: "#151515",
  padding: 20,
  borderRadius: 15,
  cursor: "pointer",
};

const selectStyle = {
  width: "100%",
  padding: 12,
  marginTop: 8,
  marginBottom: 15,
  borderRadius: 8,
  background: "#222",
  color: "white",
  border: "1px solid #333",
};

const inputStyle = {
  width: "100%",
  padding: 12,
  marginTop: 8,
  marginBottom: 15,
  borderRadius: 8,
  background: "#222",
  color: "white",
  border: "1px solid #333",
};

const cartButton = {
  width: "100%",
  background: "orange",
  color: "black",
  border: "none",
  padding: 14,
  borderRadius: 10,
  fontWeight: "bold",
  cursor: "pointer",
};