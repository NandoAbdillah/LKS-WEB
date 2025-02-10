import ProductCard from "../assets/ProductCard";
import Footer from "../components/Footer";
import "../style/Home.css";

export default function Home() {
  return (
    <>
      <div className="home-layout">
        <header className="navbar">
          <div className="logo font-orbiton">ZphereStore</div>
          <nav>
            <ul className="nav-links">
              <li>
                <a href="#" className="font-audiowide">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/games" className="font-audiowide">
                  Produk
                </a>
              </li>
              <li>
                <a href="/about-us" className="font-audiowide">
                  Kontak Kami
                </a>
              </li>
              {/* <li>
              <a href="">
                <div class="profile">
                  <img src="/img/nando.png" alt="User Avatar" class="avatar" />
                  <span>Nando Abdillah</span>
                </div>
              </a>
            </li> */}
            </ul>
          </nav>
        </header>

        <a href="/games">
          <button type="button" class="btn btn-glow">
            <strong>BELI SEKARANG</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </button>
        </a>
      </div>
      <div className="bg-menu">
        <div className="product-type">
          <ProductCard
            cardName={"Playstation"}
            cardDescription={"Kami menyediakan berbagai jenis dari PlayStation"}
          />
          <ProductCard
            cardName={"PC Gaming"}
            cardDescription={
              "Kamii menyediakan spek PC yang memiliki performa gaar untuk gamine"
            }
          />
          <ProductCard
            cardName={"Accessoris"}
            cardDescription={
              "Kami menyediakan berbagai jenis aksesoris untuk gaming"
            }
          />
        </div>
      </div>
      <div className="bg-black">
        <Footer />
      </div>
    </>
  );
}
