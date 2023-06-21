import React,{useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'
import {Stack, Typography, Box} from '@mui/material'
import { CheckCircle } from '@mui/icons-material'

import { fetchFromAPI } from '../utils/fetchFromApi'
import Videos from './Videos'
const VideoDetail = () => {
  const {id} = useParams()
  const [videoDetail,setVideoDetail] = useState(null)
  const [videoRelated, setVideoRelated] = useState([])
  useEffect(()=>{
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then(data=>setVideoDetail(data.items[0]))
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then(data=>setVideoRelated([data.items]))
  },[id])
  if(!videoDetail?.snippet) return 'Loading...'
  const {snippet:{title,channelId,channelTitle}, statistics:{
    viewCount, likeCount
  }} = videoDetail
  return (
    <Box minHeight="95vh">
      <Stack direction={{
        xs:'column',
        md:'row',
      }}>
        <Box flex={1}>
          <Box sx={{
            width:'100%',
            position:'sticky',
            top:'86px'
          }}>
            <ReactPlayer className="react-player" controls url={`https://www.youtube.com/watch?v=${id}`}/>
            <Typography color="#fff" variant='h5' fontWeight="bold" p={2}>
              {videoDetail.snippet.title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{
              color:"#fff"
            }} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography sx={{
                  sm:'subtitle1',
                  md:'h6',
                  color:'#fff'
                }}>
                  {channelTitle}
                  <CheckCircle sx={{
                    fontSize:'12px',
                    color:'gray',
                    ml:'5px'
                  }}/>
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant='body1' sx={{opacity:0.7}}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant='body1' sx={{opacity:0.7}}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Stack>
      <Box px={2} py={{
        md:1,xs:5
      }} justifyContent="center" alignItems="center">
        <Videos videos={videoRelated} direction="column"/>
      </Box>
    </Box>
  )
}

export default VideoDetail