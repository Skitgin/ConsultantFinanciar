import { Box, Button, Divider, FormControl, MenuItem, Select, Typography, useMediaQuery, useTheme, type SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'
import NumberField from './NumberField'
import IndexLineChart from './IndexLineChart';
import type { DataPoint } from './DataPoint';
import BarChartGraph from './BarChartGraph';

export default function Calculator() {
    const [forDisplay, SetForDisplay] = useState("");
    const [DisplayedSum, SetDisplayedSum] = useState("");
    const [dataPoints, SetDataPoints] = useState<DataPoint[]>([]);
    const [isCalculated, SetIsCalculated] = useState(false)
    const [r, setR] = useState<number | null>(null);
    const [plataLunara, SetPlataLunara] = useState<number | null>(null);
    const [sumaInitiala, SetSumaInitiala] = useState<number | null>(null);
    const [perioadaDeEconomisire, SetPerioadaDeEconomisire] = useState<number | null>(null);
    const [perioadaDeCapitalizare, SetPerioadaDeCapitalizare] = useState<number | null>(null);
    const [memoPerioada, SetMeoPerioada] = useState<number | null>(0)
    const [isLineGraph, SetIsLineGraph] = useState(true);
    const [isExpanded, SetIsExpanded] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    const Calculeaza = (dobanda: number | null, plataLunara: number | null, sumaInitiala: number | null, perioadaDeCapitalizare: number | null, perioadaDeEconomisire: number | null) => {

        if (plataLunara !== null && perioadaDeEconomisire !== null) {
            const sum = CalculeazaCuPlataLunara(dobanda, perioadaDeCapitalizare, perioadaDeEconomisire, plataLunara)
            let contributieTotala = 0;
            if (sum !== undefined) {
                const displayValue = sum.toLocaleString('ro-RO', { maximumFractionDigits: 0 });
                SetDisplayedSum(displayValue)
            }
            for (let i = 0; i <= perioadaDeEconomisire; i++) {
                const dataPoint: DataPoint = {
                    name: "Anul " + i,
                    year: i,
                    investitie: 0,
                    return: 0

                };
                if (i == 0) { SetDataPoints((prev) => [...prev, dataPoint]); }
                else {
                    const sumaFinala = CalculeazaCuPlataLunara(dobanda, perioadaDeCapitalizare, i, plataLunara);
                    const sumaInvestita = plataLunara * 12;
                    const sumaInvestitaTotal = sumaInvestita + contributieTotala
                    contributieTotala = sumaInvestitaTotal
                    console.log(contributieTotala)
                    dataPoint.investitie = contributieTotala;
                    dataPoint.return = sumaFinala
                    SetDataPoints((prev) => [...prev, dataPoint]);
                    SetMeoPerioada(perioadaDeEconomisire)
                    SetIsCalculated(true);
                }

            }
        }
        else {
            const sum = CalculCuSumaInitiala(dobanda, perioadaDeCapitalizare, perioadaDeEconomisire, sumaInitiala)
            const displayValue = sum.toLocaleString('ro-RO', { maximumFractionDigits: 0 });
            SetDisplayedSum(displayValue)
            SetMeoPerioada(perioadaDeEconomisire)
            if (perioadaDeEconomisire !== null) {
                for (let i = 0; i <= perioadaDeEconomisire; i++) {
                    const dataPoint: DataPoint = {
                        name: "Anul " + i,
                        year: i,
                        investitie: 100,
                        return: 0
                    }
                    if (i == 0) {
                        dataPoint.investitie = sumaInitiala;
                        dataPoint.return = sumaInitiala;
                        SetDataPoints((prev) => [...prev, dataPoint]);
                    }
                    else {
                        const sumaFinala = CalculCuSumaInitiala(dobanda, perioadaDeCapitalizare, i, sumaInitiala)
                        dataPoint.investitie = sumaInitiala;
                        dataPoint.return = sumaFinala
                        SetDataPoints((prev) => [...prev, dataPoint]);
                        SetIsCalculated(true);
                    }
                }
            }



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

        if (plataLunara != null && perioadaDeCapitalizare !== null) {
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

    const PhraseBuilder = (val: number | null) => {
        let Phrase = "";
        if (val !== null) {
            if (val > 1) {
                if (val < 20) Phrase = "a " + val + " ani"
                if (val >= 20) Phrase = "a " + val + " de ani"

            }
            else if (val == 1) Phrase = "a " + val + " an"
            return Phrase
        }
        else return ("perioadei")

    }
    const CalculCuSumaInitiala = (dobanda: number | null, perioadaDeCapitalizare: number | null, ani: number | null, sumaInitiala: number | null) => {
        if (dobanda !== null && perioadaDeCapitalizare !== null && ani !== null && sumaInitiala !== null) {
            const n = ani * perioadaDeCapitalizare;
            const r = (dobanda / 100) / perioadaDeCapitalizare;
            const sum = sumaInitiala * (Math.pow(1 + r, n));
            const roundedResult = Math.round(sum);
            return roundedResult
        }
        else return 0


    }

    const handleChange = (event: SelectChangeEvent) => {
        SetForDisplay(event.target.value as string)
        const value = Number(event.target.value);
        SetPerioadaDeCapitalizare(value);
    };
    return (


        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", alignItems: "center", }}>
            {/*Calculator*/}
            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center", bgcolor: "#494D5F", borderRadius: 2, flexDirection: "column", maxWidth: "600px", height: "100%", gap: 3, px: 3 }}>

                <Box borderRadius={3} sx={{ display: "flex", flexDirection: 'row', justifyContent: "center", alignContent: "center", gap: 3, mt: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography color='white' align='center' sx={{ display: "block", maxWidth: { xs: '100px', sm: 'none' }, margin: '0 auto' }}>Contribuție Lunară</Typography>
                        <NumberField label="" min={0} value={plataLunara} onValueChange={(value) => { SetPlataLunara(value); SetSumaInitiala(null); }} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography color='white' align='center' sx={{ display: "block", maxWidth: { xs: '50px', sm: 'none' }, margin: '0 auto' }}>Sold Inițial</Typography>
                        <NumberField label="" min={0} value={sumaInitiala} onValueChange={(value) => { SetSumaInitiala(value); SetPlataLunara(null); }} />
                    </Box>

                </Box>
                <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "center", gap: 3, py: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography color='white' align='center' sx={{ display: "block", maxWidth: { xs: '120px', sm: 'none' }, margin: '0 auto' }}> Rata De Dobândă (1-14)</Typography>
                        <NumberField required={true} label="" min={1} max={14} onValueChange={(value) => setR(value)} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography color='white' align='center' sx={{ display: "block", maxWidth: { xs: '100px', sm: 'none' }, margin: '0 auto' }}>Perioada De Economisire</Typography>
                        <NumberField required={true} label="" min={1} onValueChange={(value) => SetPerioadaDeEconomisire(value)} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "center", gap: 3, py: 2, alignContent: "center" }}>
                    <Box sx={{ minWidth: 80, maxWidth: 250, width: "100%" }}>
                        <Typography align='center' color="white" sx={{ display: "block", maxWidth: { xs: '100px', sm: 'none' }, margin: '0 auto' }}>Interval De Capitalizare</Typography>
                        <FormControl required={true} fullWidth sx={{ bgcolor: "white", borderRadius: 3 }}>
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
                    <Button variant='contained' size="large" sx={{ height: { xs: 100, sm: 50 }, maxHeight: 100, mt: 3.5, width: "100%", }} onClick={() => { SetDataPoints([]); Calculeaza(r, plataLunara, sumaInitiala, perioadaDeCapitalizare, perioadaDeEconomisire); }}>CALCULEAZĂ</Button>
                </Box>
            </Box>

            <Divider variant="middle" />

            {/*Card Prezentare Rezultate */}

            <Box sx={{ display: "flex", bgcolor: '#494D5F', justifyContent: "center", alignContent: "center", flexDirection: "column", width: "100%", maxWidth: "550px", borderRadius: 2, }}>
                {isCalculated ?

                    (<Box sx={{ px: 2 }}>

                        <Typography align='center' variant='h4' color='white'>Rezultatele sunt gata !</Typography>
                        <Typography align='center' variant='h5' color='white'> In decursul {PhraseBuilder(memoPerioada)} veți economisi:</Typography>
                        <Typography align='center' variant='h4' color="#ffa808">{DisplayedSum} Lei</Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          {isMobile?(<Box></Box>):( <Button sx={{ justifyContent: "flex-start" }} onClick={() => SetIsExpanded(!isExpanded)}>{isExpanded ? "minimize" : "expand"}</Button>)} 
                            <Box>
                                <Button sx={{ color: isLineGraph ? '#ffff' : "primary", justifyContent: "flex-end" }} onClick={() => { SetIsLineGraph(true); }}>Line</Button>
                                <Button sx={{ color: isLineGraph ? 'primary' : "#ffff", justifyContent: "flex-end" }} onClick={() => { SetIsLineGraph(false); }}>Bar</Button>
                            </Box>
                        </Box>

                    </Box>) :
                    (<Box sx={{ px: 1, py: 1 }}>

                        <Typography align='center' variant='h6' color='white'>Introdu mai sus datele investiției </Typography>
                        <Typography align='center' variant='h6' color='white'> apoi apasă "CALCULEAZĂ" pentru a simula investiția</Typography>

                    </Box>)}

            </Box>
            <Box sx={{ display: "flex", bgcolor: '#F7F7FF', justifyContent: "center", alignContent: "center", flexDirection: "column", maxWidth: "800px", borderRadius: 2, mt: 2 }}>
                {isLineGraph ? (<Box ><IndexLineChart data={dataPoints} isExpanded={isExpanded} /></Box>) : (<Box ><BarChartGraph data={dataPoints} isExpanded={isExpanded} /></Box>)}

            </Box>

        </Box>





    )
}
