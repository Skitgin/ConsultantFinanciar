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

  const handleNext = () => setStartIndex((prev) => (prev + 1) % totalItems);
  const handlePrev = () => setStartIndex((prev) => (prev - 1 + totalItems) % totalItems);

  // Auto-play: Only runs if NOT expanded
  useEffect(() => {
    if (isExpanded) return;
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, [startIndex, isExpanded]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any, info: { offset: { x: number } }) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) handleNext();
    else if (info.offset.x > swipeThreshold) handlePrev();
  };

  return (
    <Box sx={{ width: '100%', position: 'relative', overflow: 'hidden', py:isExpanded?1:0 }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={startIndex}
          drag="x"
          dragDirectionLock
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          
          // FIX: Proper toggle logic for Tap
          onTap={() => setIsExpanded(!isExpanded)}
          
          // ANIMATION LOGIC
          initial={{ opacity: 0, x: 100, scale: 0.9 }} 
          animate={{ 
            opacity: 1, 
            x: 0, 
            // Expand to 1 (full size) if expanded, otherwise slightly smaller (0.9)
            scale: isExpanded ? 1 : 0.9,
            // Apply contrast only when expanded
            filter: isExpanded ? "contrast(1.2)" : "contrast(1)"
          }}
          exit={{ 
            opacity: 0, 
            x: -100, 
            scale: isExpanded ? 1 : 0.8 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            zIndex: isExpanded ? 10 : 1,
            touchAction: 'pan-y' // Vital for roaster scrolling
          }}
        >
        
            <ConsultantCardMobile consultant={consultants[startIndex]} />
        
        </motion.div>
      </AnimatePresence>

      {/* Pagination dots */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1.5 }}>
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