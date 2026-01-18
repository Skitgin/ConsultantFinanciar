import { Box } from '@mui/material'

type Prop = {
    imgUrl: string
}

export default function CardPartener({ imgUrl }: Prop) {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
            <img src={imgUrl} alt="partener" style={{ width: '150px' }} />
        </Box>
    )
}
