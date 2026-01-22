import { useEffect, useRef, useState } from 'react';
import { Box, } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import type { Consultant } from '../app/models/Consultant';
import ConsultantCardMobile from '../ConsultantCardMobile';
import { useDragControls } from 'framer-motion';

type Props = {
  consultants: Consultant[];
}

export const MobileConsultantDisplay = ({ consultants }: Props) => {
  const dragControls = useDragControls();
  const isDragging = useRef(false);
  const [startIndex, setStartIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const totalItems = consultants.length;

  const handleNext = () => setStartIndex((prev) => (prev + 1) % totalItems);
  const handlePrev = () => setStartIndex((prev) => (prev - 1 + totalItems) % totalItems);

  // Auto-play: Only runs if NOT expanded
  useEffect(() => {
    if (isExpanded) return;
    const interval = setInterval(handleNext, 2000);
    return () => clearInterval(interval);
  }, [startIndex, isExpanded]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any, info: { offset: { x: number } }) => {

    const swipeThreshold = 25;

    if (info.offset.x < -swipeThreshold) handleNext();
    else if (info.offset.x > swipeThreshold) handlePrev();

  };

  return (
    
    <Box onScroll={()=>setIsExpanded(false)} sx={{ width: '100%', position: 'relative', overflow: 'hidden', py: 0 }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          dragControls={dragControls}
          dragListener={false}
          key={startIndex}
          drag="x"
          dragDirectionLock
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={() => isDragging.current = true}
          onDragEnd={handleDragEnd}
          onTap={()=>setIsExpanded(true)}


          // ANIMATION LOGIC
          initial={{ x: 100, scale: 0.9 }}
          animate={{
            x: 0,
            // Expand to 1 (full size) if expanded, otherwise slightly smaller (0.9)
            scale: 0.9,
            // Apply contrast only when expanded
          }}
          exit={{
            opacity: 0,
            x: -100,
            scale: 0.9
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
            touchAction: 'pan-y' // Vital for roaster scrolling
          }}
        >

          <ConsultantCardMobile consultant={consultants[startIndex]} onSwipeLeft={handleNext} onSwipeRight={handlePrev} />

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