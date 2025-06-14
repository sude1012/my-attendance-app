import logo from "/src/assets/AF_INDRA_LOG_RGB_POS.svg";
function IndraLogo() {
  return (
    <div>
      <img
        src={logo}
        alt="shows the company logo"
        className="w-72 h-20 p-6 mt-10 text-[#004254] 
        sm:w-[36rem] sm:h-[9rem] sm:p-4
        md:w-[40rem] md:h-[10rem] md:p-5"
      />
    </div>
  );
}

export default IndraLogo;
