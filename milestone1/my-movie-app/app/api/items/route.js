export async function GET(req) {
  try {
      const url = new URL(req.url);
      const type = url.searchParams.get("type"); // 'movie' or 'book'
      
      let items = [];

      if (!type || type === "movie") {
          const movies = await fetchMovies();
          items.push(...movies);
      }

      if (!type || type === "book") {
          const books = await fetchBooks();
          items.push(...books);
      }

      return new Response(JSON.stringify(items), {
          status: 200,
          headers: { "Content-Type": "application/json" }
      });

  } catch (error) {
      console.error("API Error:", error.message);
      return new Response(JSON.stringify({ error: error.message || "Failed to fetch data" }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
      });
  }
}

// Fetch movies from OMDb API
async function fetchMovies() {
  const apiKey = '53148b4b';
  const movieUrl = `http://www.omdbapi.com/?s=Batman&type=movie&apikey=${apiKey}`; // Example query

  try {
      const response = await fetch(movieUrl);
      if (!response.ok) {
          throw new Error('Failed to fetch movie data');
      }
      const data = await response.json();

      if (!data.Search || !Array.isArray(data.Search)) {
          console.error("Unexpected movie API response:", data);
          return [];
      }

      return data.Search.map(movie => ({
          id: movie.imdbID,
          title: movie.Title,
          desc: `Year: ${movie.Year}`,
          image: movie.Poster !== "N/A" ? movie.Poster : "/images/default-movie.jpg",
          type: "movie"
      }));
  } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
  }
}

// Fetch books from Open Library API
async function fetchBooks() {
  try {
      const bookRes = await fetch("https://openlibrary.org/subjects/popular.json?limit=10");
      if (!bookRes.ok) throw new Error("Failed to fetch books");

      const bookData = await bookRes.json();

      if (!bookData.works || !Array.isArray(bookData.works)) {
          console.error("Unexpected books API response:", bookData);
          return [];
      }

      return bookData.works.map(book => ({
          id: book.key,
          title: book.title,
          desc: book.authors && book.authors.length > 0 ? `Author: ${book.authors[0].name}` : "Unknown Author",
          image: book.cover_id ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` : "/images/default-book.jpg",
          type: "book"
      }));
  } catch (error) {
      console.error("Error fetching books:", error);
      return [];
  }
}
