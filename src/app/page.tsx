import Image from "next/image";
import { Header, Producrts, Review } from "../components";
import { OrderProvider } from "@/providers/Order.provider";

export default function Home() {
  return (
    <div className="">
      <Header />
      <main className="">
        <Review />
        <OrderProvider>
          <Producrts />
        </OrderProvider>
      </main>
    </div>
  );
}
