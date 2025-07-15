import PokemonList from "@/components/PokemonList";
import React, { Suspense } from "react";
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <main>
      <section>
      {/*  Search form  */}
      </section>
      
      <section className={'min-h-[91vh]'}>
        <div className={'px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
          <Suspense fallback={<div className={'h-full'}><Loader/></div>}>
            <PokemonList/>
          </Suspense>
        </div>
      </section>
    </main>
  );
}
