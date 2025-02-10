import Footer from "../components/Footer";
import Header from "../components/Header";
import HotGames from "../components/HotGames";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "../utils/CustomRouter";

const Home = () => {
  const { user, token } = useAuth();
  const { navigate } = useRouter();

  if (!user) {
    navigate("/signup");
  }

  return (
    <div className="">
      <header
        className="min-vh-100"
        style={{
          backgroundImage: `url('/img/header.png')`,
          backgroundSize: "cover",
        }}
      >
        <Header />

      </header>
      <HotGames />
      <Footer />
    </div>
  );
};

export default Home;
