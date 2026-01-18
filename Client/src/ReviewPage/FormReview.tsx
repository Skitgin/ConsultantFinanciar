import { Box, Button, Divider, Grid, Rating, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { addNewReview, fetchConsultantList } from "../apiRequestFunctions/apiRequests.ts";
import type { ReviewInput } from "../app/models/ReviewInput.ts";
import { ConsultantRoaster } from "../ConsultantRoaster.tsx";
import type { Consultant } from "../app/models/Consultant.ts";
type AddReviewProps = {
  onReviewAdded?: () => void;
}

export default function AddProduct({ onReviewAdded }: AddReviewProps) {
   const [consultants, setConsultants] = useState<Consultant[]>([]);

  const profanityList = ["Pula", "Pulă", "Cur", "Fuck", "Muie", "Cacat", "Căcat", "Fut", "Pizda", "Pizdă", "Ma-ta", "Mă-ta", "Mă-ti", "Ma-ti", "Dick", "Shit", "Fagot", "cac", "pis", "piș", "pussy", "asshole",
    "cunt", "faggot", "nigger", "bitch", "slut", "whore", "dumbass", "piss", "crap", "hell", "futu-ti", "futu-ți", "idiot", "idioți", "cretin", "cretini", "prostituata", "prostituată", "muist", "mue", "muista", "muistă", "dracu", "naiba",
    "mortii", "prost", "proasta", "proastă", "morții", "căcați", "cacati", "căcate", "pizde", "pizdei", "pule", "pulei", "puli", "proști", "prosti", "proaste", "bou", "boilor", "tampit", "tâmpit", "idiot", "coaie", "coi",
    "bulangiu", "bulangii", "bulangiule", "bulangiul", "fundaș", "fundas", "fundași", "fundasi", "poponar", "poponari", "poponare", "poponarii", "găozar", "gaozar", "găozari", "gaozari",
    "puțoi", "putoi", "puțoaie", "putoaie", "traseistă", "traseista", "traseiste", "traseist", "puță", "puta", "puțe", "pute", "găoz", "gaoz", "găoaze", "gaoaze", "buci", "bucii", "bucea",
    "laba", "labă", "lăbar", "labar", "lăbari", "labari", "pișat", "pisat", "pișatule", "pisatule", "pișate", "pisate", "fofo", "fofoloancă", "fofoloanca", "păsărică", "pasarica", "păsărele", "pasarele",
    "lindic", "lindicul", "lindicuri", "clitoris", "clitorisul",
  ];
  const [value, setValue] = React.useState<number | null>(0);
  const [form, setForm] = useState<ReviewInput>({
    nume: '',
    prenume: '',
    descriere: '',
    consultant: '',
    scor: 0,
  });
   useEffect(() => {
       fetchConsultantList().then(data => {
         setConsultants(data);
       });
     }, []);

  const filterForBadWords = (word: string) => {

    let text = word;

    profanityList.forEach((word) => {
      const regex = new RegExp(`(?<=^|[\\s])${word}(?=$|[\\s])`, "giu");
      text = text.replace(regex, "");


    });
    text = text.charAt(0).toUpperCase() + text.slice(1)
    return text

  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.name == "nume" || event.target.name == "prenume") {
      let inputValue = event.target.value;
      inputValue = filterForBadWords(inputValue)
      const sanitizedValue = inputValue.replace(/[^a-zA-Z]/g, "");
      setForm({
        ...form,
        [event.target.name]: sanitizedValue
      });
    }
    else {
      let inputValue = event.target.value;
      if (typeof inputValue === 'string') {
        inputValue = filterForBadWords(inputValue)
        setForm({
          ...form,
          [event.target.name]: inputValue
        });
      }
      else setForm({
        ...form,
        [event.target.name]: inputValue
      });
    }

  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (form.scor > 0) {
      const response = addNewReview(form)
      const review = await response
      if (review)
        alert(`Recenzia ta pentru  ` + review.consultant + ` a fost creată!`);

      else { alert('Error ecountered while creating product'); }
    }
    else { alert('Va rugam sa acordati un rating'); }

    if (onReviewAdded) {
      onReviewAdded();
    }
    setForm({
      nume: '',
      prenume: '',
      descriere: '',
      consultant: '',
      scor: 0,
    });
    setValue(0);
  };

  return (
    <>
      <Grid container spacing={3} maxWidth='lg' sx={{ mx: 'auto', justifyContent: "center", alignContent: "center", bgcolor: "", userSelect: "none" }}>
        <Grid size={10} padding={0}> <Box >
          <Typography variant="h3" fontWeight={"light"} sx={{ mb: 2, mt: 2, display: 'flex', justifyContent: 'center', fontWeight: "100", color: '#494D5F', userSelect: "none" }}> Opinia ta contează pentru noi!</Typography>
          <Divider />
        </Box></Grid>
        <Grid size={4} sx={{
          userSelect: "none",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>  <Box sx={{ bgcolor: "#494D5F", width: '100%', height: '100%', p: 4, borderRadius: 3, boxShadow: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', userSelect: "none" }}>
            <Typography variant='h5' align="center" sx={{ mb: 1, mt: 0, color: "#ffff", userSelect: "none" }}>Alege Consultantul Tau</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', userSelect: "none" }}><ConsultantRoaster  setName={setForm} consultants={consultants} /></Box>

          </Box>



        </Grid>
        <Grid size={6} sx={{ height: '100%', userSelect: "none" }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ height: '100%', p: 4, borderRadius: 3, boxShadow: 3, display: 'flex', flexDirection: "column", alignItems: "center", gap: 2, width: "100%", userSelect: "none" }}>
            <Box sx={{ display: "flex", alignContent: "center", justifyContent: 'space-between', gap: 1, width: "100%", borderRadius: 3, userSelect: "none" }}>
              <TextField
                required
                name="nume"
                label="Nume"
                value={form.nume}
                onChange={handleChange}
                sx={{ mt: 2, bgcolor: "white", flexGrow: 1, borderRadius: 1, }}
              />
              <TextField
                required
                label="Prenume"
                name="prenume"
                value={form.prenume}
                onChange={handleChange}
                sx={{ mt: 2, bgcolor: "white", flexGrow: 1, borderRadius: 1, }}
              />
            </Box>
            <TextField
              required
              name="descriere"
              label="Cum a fost experiența ta cu consultantul tau ?"
              value={form.descriere}
              multiline
              rows={5}
              onChange={handleChange}
              sx={{ bgcolor: "white", mt: 1, mb: 2, width: "100%", borderRadius: 1, }}
            />
            <Box sx={{ alignContent: 'center', borderRadius: 3, }}>
              <Typography variant='h5' sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignContent: 'center', userSelect: "none" }}>Rating</Typography>
              <Rating
                sx={{ color: "#ffa600" }}
                name="scor"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  handleChange({
                    target: {
                      name: "scor",
                      value: newValue || 0
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  } as any);
                }}
              /></Box>
            <Divider sx={{ mt: 0 }} />

            <Button type="submit" variant="contained" size="large" sx={{ bgcolor: "#8458B3", mb: 0.5, ml: 0, display: "flex", justifyContent: "center", alignContent: "center", height: 50, width: 200 }}>Publica Recenzia</Button>
          </Box>
        </Grid>

      </Grid></>
  )
}
