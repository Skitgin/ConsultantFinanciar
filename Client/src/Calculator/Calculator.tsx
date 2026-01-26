import { Box, Button, Divider, FormControl, MenuItem, Select, Typography, type SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'
import NumberField from './NumberField'
import IndexLineChart from './IndexLineChart';
import type { DataPoint } from './DataPoint';

export default function Calculator() {
    const [forDisplay, SetForDisplay] = useState("");
    const [DisplayedSum, SetDisplayedSum] = useState("");
    const [dataPoints, SetDataPoints] = useState<DataPoint[]>([]);
    // const [sumaFinala, SetSumaFinala] = useState<number | null>(null);
    //const [nuamrTotaldeLuni,SetNrTotLuni]=useState<number|null>(null);
    const [r, setR] = useState<number | null>(null);
    const [plataLunara, SetPlataLunara] = useState<number | null>(null);
    const [sumaInitiala, SetSumaInitiala] = useState<number | null>(null);
    const [perioadaDeEconomisire, SetPerioadaDeEconomisire] = useState<number | null>(null);
    const [perioadaDeCapitalizare, SetPerioadaDeCapitalizare] = useState<number | null>(null);

    const Calculeaza = (dobanda: number | null, plataLunara: number | null, sumaInitiala: number | null, perioadaDeCapitalizare: number | null, perioadaDeEconomisire: number | null) => {
        const sum = CalculeazaCuPlataLunara(dobanda, perioadaDeCapitalizare, perioadaDeEconomisire, plataLunara)
        let contributieTotala = 0;
        const displayValue = sum.toLocaleString('ro-RO', { maximumFractionDigits: 0 });
        SetDisplayedSum(displayValue)
        for (let i = 1; i <= perioadaDeEconomisire; i++) {
            const dataPoint: DataPoint = {
                name: "Year" + i,
                year: i,
                investitie: 0,
                return: 0

            };
            const sumaFinala = CalculeazaCuPlataLunara(dobanda, perioadaDeCapitalizare, i, plataLunara);
            const sumaInvestita = plataLunara * 12;
            const sumaInvestitaTotal = sumaInvestita + contributieTotala
            contributieTotala = sumaInvestitaTotal
            console.log(contributieTotala)
            dataPoint.investitie = contributieTotala;
            dataPoint.return = sumaFinala
            SetDataPoints((prev) => [...prev, dataPoint]);

        }


    }

    const CalculeazaR = (dobanda: number | null, perioadaDeCapitalizare: number | null) => {
        let result = null;
        if (dobanda !== null && perioadaDeCapitalizare !== null) {
            result = (dobanda / 100) / perioadaDeCapitalizare
            const roundedResult = Number(result.toFixed(6));
            return roundedResult

        }
        else return 0
    }

    const CalculeazaExponent = (ani: number | null, perioadaDeCapitalizare: number | null) => {
        let result = null;
        if (ani !== null && perioadaDeCapitalizare !== null) {
            result = ani * perioadaDeCapitalizare;


            return result
        }

        else return 0

    }
    const CalculeazaCuPlataLunara = (dobanda: number | null, perioadaDeCapitalizare: number | null, ani: number | null, plataLunara: number | null) => {

        if (plataLunara != null) {
            const r = CalculeazaR(dobanda, perioadaDeCapitalizare);
            const n = CalculeazaExponent(ani, perioadaDeCapitalizare);
            const paymentsPerPeriod = 12 / perioadaDeCapitalizare;
            const adjustedPMT = plataLunara * paymentsPerPeriod;
            const suma = adjustedPMT * ((Math.pow(1 + r, n) - 1) / r);
            const roundedResult = Math.round(suma);
            return roundedResult
        }
        else return

    }

    const handleChange = (event: SelectChangeEvent) => {
        SetForDisplay(event.target.value as string)
        const value = Number(event.target.value);
        SetPerioadaDeCapitalizare(value);
    };
    return (

        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", py: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center", bgcolor: "#494D5F", borderRadius: 2, flexDirection: "column", maxWidth: "600px", height: "100%", gap: 3, p: 3 }}>

                <Box borderRadius={3} sx={{ display: "flex", flexDirection: 'row', justifyContent: "center", alignContent: "center", gap: 3, mt: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography color='white' align='center'>Contributie Lunara</Typography>
                        <NumberField label="" min={0} onValueChange={(value) => SetPlataLunara(value)} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography color='white' align='center'>Sold Initial</Typography>
                        <NumberField label="" min={0} onValueChange={(value) => SetSumaInitiala(value)} />
                    </Box>

                </Box>
                <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "center", gap: 3, py: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography color='white' align='center'> Rata de Dobanda (1-14)</Typography>
                        <NumberField label="" min={1} max={14} onValueChange={(value) => setR(value)} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography color='white' align='center'>Perioada de Economisire</Typography>
                        <NumberField label="" min={0} onValueChange={(value) => SetPerioadaDeEconomisire(value)} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "center", gap: 3, py: 2, }}>
                    <Box sx={{ minWidth: 80, maxWidth: 250 }}>
                        <Typography align='center' color="white">Interval de Capitalizare</Typography>
                        <FormControl fullWidth sx={{ bgcolor: "white", borderRadius: 3 }}>
                            <Select
                                id=""
                                value={forDisplay}
                                onChange={handleChange}>
                                <MenuItem value={12}>Lunar</MenuItem>
                                <MenuItem value={1}>Anual</MenuItem>
                                <MenuItem value={4}>Trimestrial</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>
                    <Button variant='contained' sx={{ maxHeight: 50, mt: 3.5 }} onClick={() => { SetDataPoints([]); Calculeaza(r, plataLunara, sumaInitiala, perioadaDeCapitalizare, perioadaDeEconomisire) }}>Calculeaza</Button>
                </Box>
            </Box>

            <Box sx={{ display: "flex", bgcolor: '#494D5F', justifyContent: "center", alignContent: "center", flexDirection: "column", maxWidth: "600px", borderRadius: 2, }}>
                <Box sx={{ p: 2 }}><Typography align='center' variant='h4' color='white'>Rezultatele sunt gata !</Typography>

                    <Typography align='center' variant='h5' color='white'> In decursul a 10 ani vei economisi:</Typography>
                    <Typography align='center' variant='h4' color="#ffa808">{DisplayedSum} </Typography></Box>

            </Box>
            <Box sx={{ display: "flex", bgcolor: '#F7F7FF', justifyContent: "center", alignContent: "center", flexDirection: "column", maxWidth: "600px", borderRadius: 2, }}>
                <Box sx={{ p: 2 }}><IndexLineChart data={dataPoints} /></Box>
            </Box>
        </Box>

    )
}
