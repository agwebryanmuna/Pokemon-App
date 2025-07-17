import PokemonList from "@/components/PokemonList";
import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <main>
      <section>
      {/*  Search form  */}
        <SearchForm/>
      </section>
      
      <section className={'min-h-[91vh]'}>
        <PokemonList/>
      </section>
    </main>
  );
}
