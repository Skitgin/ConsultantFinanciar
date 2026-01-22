import { useEffect, useState } from 'react';
import { Box, } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import type { Consultant } from '../app/models/Consultant';
import ConsultantCardMobile from '../ConsultantCardMobile';

type Props = {
  consultants: Consultant[];
}

export const MobileConsultantDisplay = ({ consultants }: Props) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const totalItems = consultants.length;

  // 1. Navigation logic that preserves the "Expanded" state
  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % totalItems);
    // We NO LONGER set isExpanded to false here
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + totalItems) % totalItems);
    // We NO LONGER set isExpanded to false here
  };

  // 2. Auto-play logic (Stays stopped if isExpanded is true)
  useEffect(() => {
    if (isExpanded) return;

    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, [startIndex, isExpanded]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any, info: { offset: { x: number; }; }) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) handleNext();
    else if (info.offset.x > swipeThreshold) handlePrev();
  };

  return (
    <Box sx={{ width: '100%', position: 'relative', overflow: 'hidden', py: 1 }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={startIndex}
          drag="x"
          dragDirectionLock
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          onTap={() => setIsExpanded(!isExpanded)}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            zIndex: isExpanded ? 10 : 1,
            touchAction: 'pan-y' // Allows page scrolling
          }}
        >
          <Box sx={{
            width: '100%',
            maxWidth: '320px',
            px: 2,
            // THE FIX: Makes the card "transparent" to swipes
            pointerEvents: 'none',
            filter: isExpanded ? 'drop-shadow(0px 10px 25px rgba(0,0,0,0.3))' : 'none',
            transition: 'filter 0.3s ease'
          }}>
            {/* The Card Component */}
            <ConsultantCardMobile consultant={consultants[startIndex]} />
          </Box>
        </motion.div>
      </AnimatePresence>

      {/* Status Bar: Optional hint that it's paused */}
      {isExpanded}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 1.5 }}>
        {consultants.map((_, i) => (
          <Box
            key={i}
            sx={{
              width: i === startIndex ? 12 : 8,
              height: 8,
              borderRadius: 4,
              bgcolor: i === startIndex ? '#8458B3' : 'rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MobileConsultantDisplay;