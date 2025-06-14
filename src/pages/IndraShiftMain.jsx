import React, { useEffect, useState } from "react";
import IndraLogo from "../components/logo and images/IndraLogo";
import IndraShift from "../tables/IndraShift";
import Footer from "./Footer";
import useDocument from "../hooks/useDocument";

function IndraShiftMain() {
  const [indraShift, setIndraShift] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5050/api/indra-shift")
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .then((data) => {
        setIndraShift(data);
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
        <IndraShift indraShift={indraShift} />
        {console.log("Indra persons:", indraShift)}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default IndraShiftMain;
