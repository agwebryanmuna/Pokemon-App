import PokemonList from "@/components/PokemonList";
import SearchForm from "@/components/SearchForm";
import Filters from "@/components/Filters";

export default function Home() {
  return (
    <main>
      <section>
      {/*  Search form  */}
        <SearchForm/>
      </section>
      
      <section>
        <Filters/>
      </section>
      
      <section className={'min-h-[91vh]'}>
        <PokemonList/>
      </section>
    </main>
  );
}
