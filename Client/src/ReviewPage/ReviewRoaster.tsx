import { useMemo, useState } from 'react';
import { Box, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import CardReview from './CardReview';
import type { Review } from '../app/models/Review';
import { AnimatePresence, motion } from 'motion/react';


type Props = {
  reviews: Review[];
}

export const ReviewRoaster = ({ reviews }: Props) => {


  // 2. State to track the first visible card
  //const [isPaused, setIsPaused] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [startIndex, setStartIndex] = useState(0);
  let visibleCount = 3;
  if (isMobile)visibleCount = 1;
  if (isTablet)visibleCount =1;
  const totalItems = reviews.length
  const visibleReviews = useMemo(() => {
    const endIndex = startIndex + visibleCount;
    if (endIndex <= totalItems) {
      return reviews.slice(startIndex, endIndex);
    }
    return [
      ...reviews.slice(startIndex),
      ...reviews.slice(0, endIndex % totalItems),
    ];
  }, [startIndex, reviews, totalItems,visibleCount]);




  const handleNext = () => {

    // Prevent going out of bounds

    setStartIndex((prev) => { return prev + 1 >= reviews.length ? 0 : prev + 1; });


  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%', justifyContent: 'center', p: 0 }}>


      <IconButton

        onClick={handlePrev} disabled={startIndex === 0}>
        <ArrowBackIosNew />
      </IconButton>

      {/* 3. The Display Area */}
      <Box sx={{ display: 'flex', gap: 2, overflow: "hidden", justifyContent: 'center', alignContent: 'center', p: 1, position: "relative" }}>
        <AnimatePresence mode="popLayout" initial={true}>
          {visibleReviews.map((review: Review) => (<motion.div
            // style={{ display: "contents" }}
            key={review.id}
            layout
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}><CardReview key={review.id} review={review} /></motion.div>))}
        </AnimatePresence>
      </Box>

      {/* Right Button */}
      <IconButton

        onClick={handleNext}


      // disabled={startIndex + visibleCount >= reviews.length}
      >
        <ArrowForwardIos />
      </IconButton>

    </Stack>
  );
};