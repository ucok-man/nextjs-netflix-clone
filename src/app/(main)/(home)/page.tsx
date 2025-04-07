import Navbar from "@/components/navbar";
import BillBoard from "./billboard";
import MyList from "./my-list";
import Trending from "./trending";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <BillBoard />
      <div className="pb-48 flex flex-col h-full max-md:gap-4">
        <Trending />
        <MyList />
      </div>
    </div>
  );
}
