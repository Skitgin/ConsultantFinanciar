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
      sx={{ width: '100%', position: 'relative', p: 1 }}
    >
      {/* Left Navigation Arrow */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: 5,
          zIndex: 20,
          bgcolor: 'rgba(255,255,255,0.3)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' }
        }}
      >
        <ArrowBackIosNew fontSize="small" />
      </IconButton>

      {/* Display Area */}
      <Box
        sx={{
          display: 'flex',
          borderRadius: 4,
          boxShadow: 3,
          background: 'linear-gradient(0deg, #48bfe3 50%, #d65db1 90%)',
          overflow: "hidden", // Keeps the gradient inside the corners
          justifyContent: 'center',
          alignItems: 'center',
          position: "relative",
          minHeight: '600px',
          width: '100%',
        }}
      >
        {/* Optimization: We add a centered wrapper for AnimatePresence 
       to ensure the 'popLayout' absolute positioning stays centered.
    */}
        <Box sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleReviews.map((consultant: Consultant) => (
              <motion.div
                key={consultant.id}
                onTap={() => setIsPaused(true)}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0 40px', // Prevents the card from touching the absolute arrows
                }}
              >
                <Box sx={{
                  width: '100%',
                  maxWidth: '300px', // Slightly smaller to ensure it never hits the edges
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
          right: 5,
          zIndex: 20,
          bgcolor: 'rgba(255,255,255,0.3)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' }
        }}
      >
        <ArrowForwardIos fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default MobileConsultantDisplay;