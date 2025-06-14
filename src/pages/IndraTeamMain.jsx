import React, { useEffect, useState } from "react";
import IndraLogo from "../components/logo and images/IndraLogo";
import IndraTeam from "../tables/IndraTeams";
import Footer from "./Footer";
import useDocument from "../hooks/useDocument";

function IndraTeamMain() {
  const [indraTeam, setIndraTeam] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5050/api/indra-team")
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .then((data) => {
        setIndraTeam(data);
        console.log("Indra persons data fetched:", data);
      })
      .catch((error) => {
        console.error("Error fetching Indra persons:", error);
      });
  }, []);
  useDocument("Indra Persons Monitoring | Indra Business Analyst");
  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center gap-8">
      <div className="">
        <a href="/">
          {" "}
          <IndraLogo />
        </a>
      </div>
      <div className="flex flex-col justify-center items-center">
        <IndraTeam indraTeam={indraTeam} />
        {console.log("Indra persons:", indraTeam)}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default IndraTeamMain;
