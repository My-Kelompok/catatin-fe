import { Sparkles } from "lucide-react";
import CustomBadge from "../common/custom-badge";
import MaxWidthWrapper from "../layout/max-width-wrapper";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="hero">
      <MaxWidthWrapper className="pt-32 pb-20 md:pt-40">
        <div className="mx-auto flex max-w-170 flex-col items-center space-y-4 px-4 text-center">
          <CustomBadge icon={Sparkles} label={"Khusus UMKM Jasa"} />
          <h1 className="text-3xl leading-tight font-bold tracking-[0.2px] md:text-5xl md:leading-[50px]">
            Catat Transaksi Semudah <br className="hidden md:block" />
            <span className="text-blue-700">Chatting dengan Teman</span>
          </h1>
          <p className="max-w-md text-sm tracking-[0.3px] text-gray-600 md:text-base">
            Lupakan pembukuan rumit. Cukup ketik &quot;Servis AC Pak Budi
            150rb&quot;, AI kami yang akan merapikan datanya untuk Anda.
          </p>
          <div className="mt-6 flex w-full flex-col items-center justify-center space-y-3 md:flex-row md:space-y-0 md:space-x-5">
            <Button
              asChild
              className="text-md w-full rounded-md bg-blue-700 px-8 py-5 text-white hover:bg-blue-800 md:w-auto"
            >
              <Link href="/auth/login">Coba Demo Sekarang</Link>
            </Button>
            <Button
              asChild
              variant={"ghost"}
              className="text-md w-full rounded-md border border-gray-300 px-8 py-5 text-gray-600 hover:bg-blue-400/10 md:w-auto"
            >
              <Link href="/auth/register">Lihat Design System</Link>
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
