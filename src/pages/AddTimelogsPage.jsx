import IndraLogo from "../components/logo and images/IndraLogo";
import AddUser from "../components/form/AddUser";
import Footer from "./Footer";
import useDocument from "../hooks/useDocument";
import Header from "../components/headers/Header";
import AddTimelogs from "../components/form/AddTimeLogs";

function AddTimelogsPage() {
  useDocument("Add User | Indra Business Analyst");

  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center">
      {/* <Sidebar /> */}
      <div className="">
        <a href="/">
          {" "}
          <IndraLogo />
        </a>
      </div>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <AddTimelogs />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default AddTimelogsPage;
