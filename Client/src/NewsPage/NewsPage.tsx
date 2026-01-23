import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { fetchNewsList } from '../apiRequestFunctions/apiRequests';
import NewsList from './NewsList';
import { Box, Divider, Typography } from '@mui/material';

export default function NewsPage() {
  const { data: news = [] } = useQuery({
    queryFn: () => fetchNewsList(),
    queryKey: ["news"],

  });
  

  return (
        <><Typography 
                variant="h3" 
                textAlign="center"
                sx={{ p:3 ,fontWeight: 100, color: '#494D5F', fontSize: { xs: '2rem', md: '3rem' } }}
              > Știri Financiare</Typography>
         <Divider sx={{}}/>
          <Box sx={{
          width: '100%',
          p: { xs: 1, md: 3 },
          overflowX: 'hidden', // Safety net to prevent horizontal scroll


          // 1. Target NewsList's internal Box
          '& > div': {
              display: 'block !important', // CRITICAL: Kills the 'flex' row behavior
              width: '100%',
              columnCount: { xs: 1, sm: 2, md: 3 },
              columnGap: '20px',
              margin: '0 auto', // Centers the block of columns
              maxWidth: '1200px',
              // Ensure no gap property is inherited from the flex layout
              gap: '10 !important',
          },

          // 2. Target NewsCard components inside NewsList
          '& .MuiPaper-root': {
              display: 'inline-block', // Required for mosaic flow
              width: '100% !important', // Force card to fit column width
              maxWidth: 'none !important', // Removes your card's 500px limit
              marginBottom: '20px',
              breakInside: 'avoid', // Prevents cards from splitting between columns
          }
      }}>
          <NewsList newsList={news} />
      </Box></>
    
  )
}
