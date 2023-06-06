export async function Joke() {
  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data.joke;
  } catch (error) {
    console.error("Error al obtener el chiste:", error);
  }
}

export async function specificjoke(palabraClave) {
    if (palabraClave === "") {
      return Promise.resolve([]);
    }
  
    try {
      const response = await fetch(`https://icanhazdadjoke.com/search?term=${palabraClave}`, {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error al buscar chistes:", error);
    }
  }