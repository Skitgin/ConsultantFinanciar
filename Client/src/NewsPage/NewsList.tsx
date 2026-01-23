import { Box } from "@mui/material";
import type { CleanNewsDto } from "../app/models/CleanNewsDto";
import NewsCard from "./NewsCard";
type Props = {
  newsList: CleanNewsDto[];
}

export default function NewsList({ newsList}: Props) {
 return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        gap: 3, 
        flexWrap:"wrap",
        justifyContent: "center", 
        width: '100%',
        px: { xs: 2, md: 1 },
      }}
    >
      {newsList.map((news) => (
        <NewsCard key={news.id} news={news} />
      ))}
    </Box>
  );
}