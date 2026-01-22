import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
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
    <Box sx={{ width: '100%', position: 'relative', overflow: 'hidden', py: 6 }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={startIndex}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          // Using whileTap for a more responsive "press" feel
          onTap={() => setIsExpanded(!isExpanded)}
          
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            x: 0, 
            // The card stays big if we are in expanded mode
            scale: isExpanded ? 1.08 : 1 
          }}
          exit={{ 
            opacity: 0, 
            x: -100, 
            // The exiting card stays big if we were expanded, creating a smooth transition
            scale: isExpanded ? 1.08 : 0.9 
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
            touchAction: 'none'
          }}
        >
          <Box sx={{ 
            width: '100%', 
            maxWidth: '320px', 
            px: 2,
            filter: isExpanded ? 'drop-shadow(0px 10px 25px rgba(0,0,0,0.3))' : 'none',
            transition: 'filter 0.3s ease'
          }}>
            <ConsultantCardMobile consultant={consultants[startIndex]} />
          </Box>
        </motion.div>
      </AnimatePresence>

      {/* Status Bar: Optional hint that it's paused */}
      {isExpanded && (
        <Typography 
          variant="caption" 
          sx={{ display: 'block', textAlign: 'center', mt: 1, color: '#8458B3', fontWeight: 'bold' }}
        >
          Mod Lectură (Pauză)
        </Typography>
      )}

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