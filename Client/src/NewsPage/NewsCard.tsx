import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import type { CleanNewsDto } from '../app/models/CleanNewsDto'
import { ReadMore } from '@mui/icons-material'

type Props = {
    news: CleanNewsDto
}

export default function NewsCard({ news }: Props) {
    return (
        <Card sx={{ width: "100%", maxWidth: "500px", display: 'flex', flexDirection: 'column', height: '100%', borderRadius:3 ,boxShadow:4}}>
            <CardHeader
                title={news.title}
            />
            <CardMedia
                component="img"
                height="auto"
                image={news.imageUrl}
                alt=""
                sx={{ maxHeight: "270px"}}
            />
            <CardContent>
                <Typography  variant="body2" sx={{ color: 'text.secondary' }}>
                    {news.description}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                <Typography variant="caption">Source: {news.source}</Typography>
                <IconButton aria-label="Citeste mai Mult" href={news.link} color="primary">
                    <Typography variant="subtitle2"> Continuă să citești..</Typography> 
                    <ReadMore />
                </IconButton>
            </CardActions>
        </Card>
    )
}
