import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import AllCalling from "../Calling_Section/AllCalling"
import CallRejected from '../Calling_Section/CallRejected'
import NotPickedCall from "../Calling_Section/NotPickedCall"
import NotInterested from "../Calling_Section/NotInterested"
import CallBack from "../Calling_Section/CallBack"
import CallForwarded from "../Calling_Section/CallForwarded"
import CallRejectedInBetween from "../Calling_Section/CallRejectedInBetween"
import Interested from "../Calling_Section/Interested"
import JoinedOtherCoaching from "../Calling_Section/JoinedOtherCoaching"
import NotRequiredCourse from "../Calling_Section/NotRequiredCourse"
import WillVisit from "../Calling_Section/WillVisit"
import AlreadyPlaced from '../Calling_Section/AlreadyPlaced'
import Visited from '../Calling_Section/Visited'

const Calling = () => {

  const [selectedCategory, setSelectedCategory] = useState("All")

  return (
    <div>

      <FormControl fullWidth placeholder="Select Calling Categories" sx={{mb:"15px"}}>

      <InputLabel >
        Calling Categories
      </InputLabel>

      <Select
      name='callingCategory'
      onChange={(e) => setSelectedCategory(e.target.value)}
      >

      <MenuItem value="All">All</MenuItem>
      <MenuItem value="Call Rejected">Call Rejected</MenuItem>
      <MenuItem value="Not Picked Call">Not Picked Call</MenuItem>
      <MenuItem value="Not Interested">Not Interested</MenuItem>
      <MenuItem value="Interested">Interested</MenuItem>
      <MenuItem value="Call Forwarded">Call Forwarded</MenuItem>
      <MenuItem value="Will Visit">Will Visit</MenuItem>
      <MenuItem value="Alread Placed">Alread Placed</MenuItem>
      <MenuItem value="Not Require Any Course">Not Require Any Course</MenuItem>
      <MenuItem value="Call Back">Call Back</MenuItem>
      <MenuItem value="Joined Other Institute">Joined Other Institute</MenuItem>
      <MenuItem value="Call Rejected In Between">Call Rejected In Between</MenuItem>
      <MenuItem value="Visited">Visited</MenuItem>

      </Select>
      </FormControl>

      {selectedCategory === "All" ? 
      (
        <AllCalling/>
      ):
      selectedCategory === "Call Rejected" ? 
      (
        <CallRejected/>
      ):
      selectedCategory === "Not Picked Call" ? 
      (
        <NotPickedCall/>
      ):
      selectedCategory === "Not Interested" ? 
      (
        <NotInterested/>
      ):
      selectedCategory === "Interested" ? 
      (
        <Interested/>
      ):
      selectedCategory === "Call Forwarded" ? 
      (
        <CallForwarded/>
      ):
      selectedCategory === "Will Visit" ? 
      (
        <WillVisit/>
      ):
      selectedCategory === "Alread Placed" ? 
      (
        <AlreadyPlaced/>
      ):
      selectedCategory === "Not Require Any Course" ? 
      (
        <NotRequiredCourse/>
      ):
      selectedCategory === "Call Back" ? 
      (
        <CallBack/>
      ):
      selectedCategory === "Joined Other Institute" ? 
      (
        <JoinedOtherCoaching/>
      ):
      selectedCategory === "Call Rejected In Between" ? 
      (
        <CallRejectedInBetween/>
      ):
      selectedCategory === "Visited" ? 
      (
        <Visited/>
      ):
      (<h1>Please Select Category</h1>)
      }
      
    </div>
  )
}

export default Calling
