import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, CardMedia } from '@mui/material';
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
    const ConsName =consultants[number].nume +" "+ consultants[number].prenume
    setName((prev) => ({
      ...prev,
      consultant: ConsName,
    }));
  }
  useEffect(() => {
    if (consultants.length > 0 && consultants[startIndex])
      
      setName((prev) => ({
        ...prev,
        consultant: consultants[startIndex].nume +" "+ consultants[startIndex].prenume, 
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
  <Box sx={{ width: '100%', userSelect: "none" }}>
    {/* 1. Top Section: Arrows + Image only (Centered) */}
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      
      {/* Left Button */}
      <IconButton 
        onClick={handlePrev} 
        disabled={startIndex === 0}
        sx={{ color: 'white', '&.Mui-disabled': { opacity: 0.3 } }}
      >
        <ArrowBackIosNew fontSize="small" />
      </IconButton>

      {/* Image Container */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', maxWidth: { xs: 200, sm: 250 }, filter:'contrast(120%)' }}>
        {consultants.slice(startIndex, startIndex + visibleCount).map((person) => {
          const hasNoImage = person.imageUrl.length < 1;
          return (
            <Box key={person.id} sx={{ width: '100%' ,}}>
              <CardMedia
                component="img"
                image={hasNoImage ? '/default.png' : person.imageUrl}
                alt={person.nume}
                sx={{ 
                  border: '4px solid #f8a100',
                  borderRadius: '50%', 
                  aspectRatio: '1/1', 
                  width: '100%', 
                  objectFit: 'cover',
                  boxShadow:4
                }}
              />
            </Box>
          );
        })}
      </Box>

      {/* Right Button */}
      <IconButton 
        onClick={handleNext} 
        disabled={startIndex + visibleCount >= consultants.length}
        sx={{ color: 'white', '&.Mui-disabled': { opacity: 0.3 } }}
      >
        <ArrowForwardIos fontSize="small" />
      </IconButton>
    </Box>

    {/* 2. Bottom Section: Name and Title (Always centered below) */}
    <Box sx={{ mt: 2 ,mb:3 }}>
      {consultants.slice(startIndex, startIndex + visibleCount).map((person) => (
        <Box key={`text-${person.id}`}>
          <Typography  fontFamily= '"Gill Sans", "Gill Sans MT", Calibri, sans-serif' align='center' variant="h5" color="white" noWrap sx={{  }}>
            {`${person.nume} ${person.prenume}`}
          </Typography>
          <Typography  fontFamily= '"Gill Sans", "Gill Sans MT", Calibri, sans-serif' align='center' variant="body1" color="rgba(255,255,255,0.7)">
            Consultant Financiar
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
);
};