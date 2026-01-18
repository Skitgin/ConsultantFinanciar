import { useEffect, useMemo, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import type { Consultant } from '../app/models/Consultant';
import ConsultantCard from '../ConsultantCard';
import { useAfterLCP } from './useAfterLCP';


type Props = {
    consultants: Consultant[];
}

export const ConsultantDisplay = ({ consultants }: Props) => {


    const canAnimate = useAfterLCP();
    const [isPaused, setIsPaused] = useState(false);
    /*const [clickCount,SetClickCount]=useState(0);*/
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 3;
    const totalItems = consultants.length

   
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

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setStartIndex((prev) => {

                return (prev + 1) % totalItems;
            });
        }, 2500);

        return () => clearInterval(interval);
    }, [totalItems, isPaused]);



    /* const handleCardClick = (clickedId: string | number) => {
         const indexOfClickedItem = consultants.findIndex(c => c.id === clickedId);
         const newStartIndex = (indexOfClickedItem - 1 + totalItems) % totalItems;
         setStartIndex(newStartIndex);
     };*/
    const midItem = visibleReviews[1];

    return (
        <Stack direction="row" alignItems="center" spacing={6} sx={{ width: '100%', justifyContent: 'center', p: 0, mt: 2 }}>


            {/* 3. The Display Area */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 0,
                    borderRadius: 5,
                    boxShadow: 3,
                    background: 'linear-gradient(0deg,  #48bfe3 50%,  #d65db1 90%)',
                    overflow: "hidden",
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: 2,
                    position: "relative",
                    minHeight: '700px',
                    width: '100%',
                    height: "100%"

                }}>
                <AnimatePresence mode="popLayout" initial={false}>
                    {visibleReviews.map((consultant: Consultant) => {
                        const isMid = midItem?.id === consultant.id;
                        let IsHovered = false;
                        /*const isClicked = clickCount> 0 ;*/
                        return (

                            <motion.div

                                onMouseEnter={() => { setIsPaused(true); IsHovered = true; }} onMouseLeave={() => { setIsPaused(false); IsHovered = false }}
                                /* onTap={() =>{ handleCardClick(consultant.id);SetClickCount(1)}}*/
                                key={consultant.id}
                                layout
                                animate={{
                                    scale: canAnimate? (isMid ? (isPaused ? (IsHovered ? 1 : 0.9) : 1) : (IsHovered ? 1 : 0.9)) : 1,
                                    zIndex: isMid ? 10 : 1,
                                    opacity:canAnimate? (isMid ? (isPaused ? (IsHovered ? 1 : 0.8) : 1) : (IsHovered ? 1 : 0.9)):1,
                                    filter: canAnimate? isMid ? "contrast(1.2)" : "contrast(1)":"contrast(1)"
                                }}
                                whileHover={{ scale: 0.98, zIndex: 20,
                                     filter: "contrast(1.2)",
                                      opacity: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.5 }}
                            >
                                <ConsultantCard consultant={consultant} />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </Box>


        </Stack>
    );
}; export default ConsultantDisplay;