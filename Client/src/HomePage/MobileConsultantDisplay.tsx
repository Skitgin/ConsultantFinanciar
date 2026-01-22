import { useEffect, useMemo, useState } from 'react';
import { Box, Stack, IconButton } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';
import type { Consultant } from '../app/models/Consultant';
import ConsultantCardMobile from '../ConsultantCardMobile';

type Props = {
  consultants: Consultant[];
}

export const MobileConsultantDisplay = ({ consultants }: Props) => {
  const [isPaused, setIsPaused] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  // Hardcoded for mobile/tablet optimization
  const visibleCount = 1;
  const totalItems = consultants.length;

  const visibleReviews = useMemo(() => {
    const endIndex = startIndex + visibleCount;
    if (endIndex <= totalItems) {
      return consultants.slice(startIndex, endIndex);
    }
    return [
      ...consultants.slice(startIndex),
      ...consultants.slice(0, endIndex % totalItems),
    ];
  }, [startIndex, consultants, totalItems]);
  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % totalItems);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Slightly slower for mobile readability
    return () => clearInterval(interval);
  }, [totalItems, isPaused]);



 return (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="center"
    sx={{ 
      width: '100%', 
      position: 'relative', 
      py: 1, // Removed padding to let cards use full space
      minHeight: '500px' // Ensure the stack itself has height
    }}
  >
    {/* Left Navigation Arrow */}
    <IconButton
      onClick={handlePrev}
      sx={{
        position: 'absolute',
        left: 0, // Moved closer to the edge
        zIndex: 20,
        bgcolor: 'rgba(0,0,0,0.05)', // Subtle dark tint instead of white
        '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' }
      }}
    >
      <ArrowBackIosNew fontSize="small" />
    </IconButton>

    {/* Display Area - Background removed */}
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
        width: '100%',
        height: '100%',
        // overflow: "hidden" is removed here so cards can slide 
        // in/out without getting "cut" at the container edge
      }}
    >
      <Box sx={{ 
        position: 'relative', 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleReviews.map((consultant: Consultant) => (
            <motion.div
              key={consultant.id}
              onTap={() => setIsPaused(true)}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 10px', // Space for the card not to touch the screen edge
              }}
            >
              <Box sx={{
                width: '100%',
                maxWidth: '320px', // Match the card's native width
                display: 'flex',
                justifyContent: 'center'
              }}>
                <ConsultantCardMobile consultant={consultant} />
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
    </Box>

    {/* Right Navigation Arrow */}
    <IconButton
      onClick={handleNext}
      sx={{
        position: 'absolute',
        right: 0, // Moved closer to the edge
        zIndex: 20,
        bgcolor: 'rgba(0,0,0,0.05)',
        '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' }
      }}
    >
      <ArrowForwardIos fontSize="small" />
    </IconButton>
  </Stack>
);
};

export default MobileConsultantDisplay;