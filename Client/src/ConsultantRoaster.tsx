import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Stack, CardMedia } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import type { ReviewInput } from './app/models/ReviewInput';
import type { Consultant } from './app/models/Consultant';

// 1. Define your Data Type
interface SetNameProps {
  setName: React.Dispatch<React.SetStateAction<ReviewInput>>;
  consultants: Consultant[]
}









export const ConsultantRoaster = ({ setName, consultants }: SetNameProps): React.ReactNode => {
  // 2. State to track the first visible card
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 1;


  const handleName = (number: number) => {
    setName((prev) => ({
      ...prev,
      consultant: consultants[number].nume,
    }));
  }
  useEffect(() => {
    if (consultants.length > 0 && consultants[startIndex])
      setName((prev) => ({
        ...prev,
        consultant: consultants[startIndex].nume,
      }));

  }, [setName, startIndex, consultants]);

  const handleNext = () => {

    // Prevent going out of bounds
    if (startIndex + visibleCount < consultants.length) {
      setStartIndex((prev) => prev + 1);
    }
    handleName(startIndex + 1);

  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
    handleName(startIndex - 1);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%', justifyContent: 'center', p: 2 }}>


        <IconButton

          onClick={handlePrev} disabled={startIndex === 0}>
          <ArrowBackIosNew />
        </IconButton>

        {/* 3. The Display Area */}
        <Box sx={{ display: 'flex', overflow: 'hidden', justifyContent: 'center', alignContent: 'center', }}>
          {consultants.slice(startIndex, startIndex + visibleCount).map((person) => {

            const DefaultImage = person.imageUrl.length < 1;
            return (
              <Card key={person.id} sx={{ width: 250, bgcolor: "#494D5F", boxShadow: 3, userSelect: "none" }}>
                <CardMedia
                  sx={{ borderRadius: 50 }}
                  component="img"
                  height="250"
                  image={DefaultImage ? '/default.png' : person.imageUrl}
                  alt={`Profile picture of ${person.nume}`}
                />
                <CardContent sx={{ bgcolor: "#494D5F" }}>
                  <Typography variant="h6" color="#ffff">{person.nume + " " + person.prenume}</Typography>
                  <Typography variant="body2" color="#ffff">
                    Consultant Financiar
                  </Typography>
                </CardContent>
              </Card>
            )
          })}
        </Box>

        {/* Right Button */}
        <IconButton

          onClick={handleNext}


          disabled={startIndex + visibleCount >= consultants.length}
        >
          <ArrowForwardIos />
        </IconButton>

      </Stack></>
  );
};