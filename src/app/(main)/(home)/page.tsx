import Navbar from "@/components/navbar";
import BillBoard from "./billboard";
import Trending from "./trending";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <BillBoard />
      <div className="pb-48">
        <Trending />
      </div>
    </div>
  );
}
