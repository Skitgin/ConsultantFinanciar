import { useMemo, useState } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { AnimatePresence, motion } from 'motion/react';
import CardPartener from './CardPartener';



type Prop = { parteneri: string[]; }

export const RoasterPartener = ({ parteneri }: Prop) => {


    // 2. State to track the first visible card
    //const [isPaused, setIsPaused] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 8;
    const totalItems = parteneri.length
    const visiblePartners = useMemo(() => {
        const endIndex = startIndex + visibleCount;
        if (endIndex <= totalItems) {
            return parteneri.slice(startIndex, endIndex);
        }
        return [
            ...parteneri.slice(startIndex),
            ...parteneri.slice(0, endIndex % totalItems),
        ];
    }, [startIndex, parteneri, totalItems]);




    const handleNext = () => {

        // Prevent going out of bounds

        setStartIndex((prev) => { return prev + 1 >= parteneri.length ? 0 : prev + 1; });


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
            <Box sx={{ display: 'flex', gap: 2, overflow: "hidden", justifyContent: 'center', alignContent: 'center', p: 3, position: "relative" }}>
                <AnimatePresence mode="popLayout" initial={true}>
                    {visiblePartners.map((partener: string) => (<motion.div
                        // style={{ display: "contents" }}
                        key={partener}
                        layout
                        transition={{ duration: 0.3, ease: "easeInOut" }}><CardPartener key={partener.length} imgUrl={partener} /></motion.div>))}
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
};export default RoasterPartener