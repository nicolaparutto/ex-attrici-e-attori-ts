type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string
}

type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality:
  | "American"
  | "British"
  | "Australian"
  | "Israeli-American"
  | "South African"
  | "French"
  | "Indian"
  | "Israeli"
  | "Spanish"
  | "South Korean"
  | "Chinese"
}

function isActress(data: unknown): data is Actress {
  return (
    typeof data === "object" && data !== null && // check: data esiste ed è un oggetto.
    "id" in data && typeof data.id === "number" && // check: id esiste ed è un numero.
    "name" in data && typeof data.name === "string" && // check: name esiste ed è una stringa.
    "birth_year" in data && typeof data.birth_year === "number" && // check: birth_year esiste ed è un numero.
    (!("death_year" in data) || "birth_year" in data && typeof data.death_year === "number") && // check: death_year, o non esiste o esiste ed è un numero.
    "biography" in data && typeof data.biography === "string" && // check: biography esiste ed è una stringa.
    "image" in data && typeof data.image === "string" && // check: image esiste ed è una stringa.
    "most_famous_movies" in data && data.most_famous_movies instanceof Array && data.most_famous_movies.length === 3 && data.most_famous_movies.every(movie => typeof movie === "string") && // check: most_famous_movies esiste, è un array, ha una lunghezza di 3 elementi e se tutti gli elementi sono stringhe.
    "awards" in data && typeof data.awards === "string" && // check: awards esiste ed è una stringa.
    "nationality" in data && typeof data.nationality === "string" // check: nationality esiste ed è una stringa.
  )
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`http://localhost:5000/actresses/${id}`);
    const data: unknown = await response.json();
    if (!isActress(data)) {
      throw new Error("Dati recuperati, ma non corrispondono alle aspettative")
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Errore durante il recupero dei dati");
      return null
    } else {
      console.error("Errore sconosciuto:", error);
      return null
    }
  }
}