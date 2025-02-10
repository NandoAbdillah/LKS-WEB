import Banner from "../components/Banner";
import Header from "../components/Header";
import SpecialMenu from "../components/SpecialMenu";
import TopDoctors from "../components/TopDoctors";

export default function Home()
{
    return (
        <div>
            <Header />
            <SpecialMenu />
            <TopDoctors />
            <Banner />
        </div>
    )
}