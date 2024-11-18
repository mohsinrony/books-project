import { useEffect, useState } from "react";
import useAxios from "../services/useAxios";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
  TextField,
} from "@mui/material";

function Books() {
  const { data, loading, get } = useAxios("http://localhost:3000");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    if (data.length === 0) {
      getBooks();
    }
  }, []);

  const booksToDisplay = searchTerm ? filteredBooks : data;

  // Use the get function from useAxios instead of axios.get
  function getBooks() {
    get("books")
      .then(response => {
        console.log(response);
        // Set filteredBooks after fetching data
        setFilteredBooks(response.data);
      })
      .catch(error => console.error(error));
  }

  // Implement search functionality
  function handleSearchInputChange(event) {
    setSearchTerm(event.target.value);
    // Update filteredBooks when the search term changes
    setFilteredBooks(data.filter(
      (book) =>
        book.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        book.author.toLowerCase().includes(event.target.value.toLowerCase())
    ));
  }
   

  return (
    <Box sx={{ mx: "auto", p: 2 }}>
      {loading && <CircularProgress />}
      {!loading && (
        <div>
          <Stack
            sx={{ justifyContent: "space-around" }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            <TextField
            label="Search Books"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchInputChange}
            sx={{ mb: 2 }}
          />

            {booksToDisplay.map((book) => (
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "15%",
                  minWidth: 200,
                }}
                key={book.name}
              >
                <CardMedia
                  sx={{ height: 250 }}
                  image={book.img}
                  title={book.name}
                />
                <Box sx={{ pt: 2, pl: 2 }}>
                  {book.genres.map((genre, i) => (
                    <Chip
                      key={i}
                      label={genre}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                  <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {book.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Box>
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    mt: "auto",
                    pl: 2,
                  }}
                >
                  <Rating
                    name="read-only"
                    value={book.stars}
                    readOnly
                    size="small"
                  />
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;

