import React from 'react'
import {Link} from "react-router-dom"
import {Typography, Card, CardContent, CardMedia} from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from '../utils/constant'

const VideoCard = ({video}) => {
    console.log(video);
  return (
    <Card sx={{
        width:{
            md:'320px',
            xs:'100%',
            sm:'358px'
        },
        boxShadow:'none',
        borderRadius:0
    }}>
        <Link to={video.id.videoId ? `/video/${video.id.videoId}`: demoVideoUrl}>
            <CardMedia image={video?.snippet?.thumbnails?.high?.url} alt={video?.snippet?.title} sx={{
                width:{
                    sx:'100%',
                    sm:'358px'
                }, height:180
            }}/>
        </Link>
        <CardContent sx={{
            backgroundColor:"#1e1e1e",
            height:"106px"
        }}>
            <Link to={video.id.videoId ? `/video/${video.id.videoId}`: demoVideoUrl}>
                <Typography variant='subtitle1' fontWeight="bold" color="#FFF">
                    {video?.snippet?.title.slice(0,60) || demoVideoTitle.slice(0,60)}
                </Typography>
            </Link>
            <Link to={video?.snippet?.channelId ? `/video/${video?.snippet?.channelId}`: demoChannelUrl}>
                <Typography variant='subtitle2' fontWeight="bold" color="gray">
                    {video?.snippet?.channelTitle || demoChannelTitle}
                    <CheckCircle sx={{
                        fontSize:12,
                        color:'gray',
                        ml:'5px'
                    }}/>
                </Typography>
            </Link>
        </CardContent>
    </Card>
  )
}

export default VideoCard