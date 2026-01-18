import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Stack, CardMedia } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import type { ReviewInput } from './app/models/ReviewInput';

// 1. Define your Data Type
interface Consultant {
  id: number;
  imageUrl: string;
  name: string;
  specialty: string;
}
interface SetNameProps {
  setName: React.Dispatch<React.SetStateAction<ReviewInput>>;

}



const consultants: Consultant[] = [
  { id: 1, name: "Pantea Catalin", specialty: "Consultant Financiar", imageUrl: "Cata.webp" },
  { id: 2, name: "Belei Radu Vladut ", specialty: "Consultant Financiar", imageUrl: "Vladut.webp" },
  { id: 3, name: "Cosmina Diana", specialty: "Consultant Financiar", imageUrl: "/Cosmina.jpg" },
];

export const ConsultantRoaster = ({ setName }: SetNameProps) => {
  // 2. State to track the first visible card
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 1;


  const handleName = (number: number) => {
    setName((prev) => ({
      ...prev,
      consultatnt: consultants[number].name,
    }));
  }
  useEffect(() => {
    setName((prev) => ({
      ...prev,
      consultant: consultants[startIndex].name,
    }));

  }, [setName, startIndex]);

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
    <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%', justifyContent: 'center', p: 2 }}>


      <IconButton

        onClick={handlePrev} disabled={startIndex === 0}>
        <ArrowBackIosNew />
      </IconButton>

      {/* 3. The Display Area */}
      <Box sx={{ display: 'flex', overflow: 'hidden', justifyContent: 'center', alignContent: 'center', }}>
        {consultants.slice(startIndex, startIndex + visibleCount).map((person) => (
          <Card key={person.id} sx={{ width: 250, bgcolor: "#494D5F", boxShadow: 3, userSelect: "none" }}>
            <CardMedia
              sx={{ borderRadius: 50 }}
              component="img"
              height="250"
              image={person.imageUrl}
              alt={`Profile picture of ${person.name}`}
            />
            <CardContent sx={{ bgcolor: "#494D5F" }}>
              <Typography variant="h6" color="#ffff">{person.name}</Typography>
              <Typography variant="body2" color="#ffff">
                {person.specialty}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Right Button */}
      <IconButton

        onClick={handleNext}


        disabled={startIndex + visibleCount >= consultants.length}
      >
        <ArrowForwardIos />
      </IconButton>

    </Stack>
  );
};