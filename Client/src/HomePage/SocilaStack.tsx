import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Box, IconButton } from '@mui/material'
import React from 'react'
import type { Consultant } from '../app/models/Consultant';

type Prop = {
    consultant: Consultant
}

export default function SocilaStack({ consultant }: Prop) {
    let  hasLinkedIn =false
     if(consultant.linkLinkedIn)hasLinkedIn =true;
    let hasInstagram = false
     if(consultant.linkInstagram)hasInstagram=true
    let  hasFacebook = false
    if(consultant.linkFacebook)hasFacebook=true
    return (
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center", }}>
            {hasLinkedIn ? (<IconButton aria-label="linkedIn" style={{ color: 'white' }}>
                <LinkedInIcon />
            </IconButton>) : (<div />)}
           { hasInstagram? (<IconButton aria-label="Instagram" style={{ color: 'white' }}  >
                <InstagramIcon />
            </IconButton>) :(<div />)}
            {hasFacebook?(<IconButton aria-label="Facebook" style={{ color: 'white' }}  >
                <FacebookIcon />
            </IconButton>):(<div/>)}

        </Box>
    )
}
