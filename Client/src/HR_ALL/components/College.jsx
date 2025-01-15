import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'

import College_Tech from "../sub_components/College_Tech"
import College_NonTech from "../sub_components/College_NonTech"

const College = () => {

  const [selectedOptionNon, setSelectedOption] = useState(
    sessionStorage.getItem("selectedOptionNon") || "Tech"
  )

  useEffect(() => {
    sessionStorage.setItem("selectedOptionNon", selectedOptionNon)
  },[selectedOptionNon])

  const CollegeContent = () => {
    if(selectedOptionNon === "Tech"){
      return <College_Tech/>
    }
    else if(selectedOptionNon === "Non-Tech"){
      return <College_NonTech/>
    }
  }

  return (
    <>
    <Box sx={{
      display:"flex",
    }}>

      <Button sx={{
        width:"50%",
        textAlign: "left",
        padding: { xs: 1, sm: 2 },
        margin: { xs: 0.5, sm: 1 },
        backgroundColor: selectedOptionNon === "Tech" ? "rgb(58, 164, 250)" : "#f5f5f5",
        color: selectedOptionNon === "Tech"  ? "white" : "#333",
        borderRadius: "8px",
        fontSize: { xs: "14px", sm: "16px" },
        fontWeight: "500",
        transition: "all 0.3s ease",
        boxShadow:
          selectedOptionNon === "Tech" 
            ? "0px 4px 8px rgba(58, 164, 250, 0.4)"
            : "none",
        "&:hover": {
          backgroundColor: "rgb(125, 196, 253)",
          color: "black",
          boxShadow: "0px 4px 12px rgba(58, 164, 250, 0.5)",
        },
      }}
      onClick={() => setSelectedOption("Tech")}>
        Tech
      </Button>

      <Button sx={{
        width:"50%",
        textAlign: "left",
        padding: { xs: 1, sm: 2 },
        margin: { xs: 0.5, sm: 1 },
        backgroundColor: selectedOptionNon === "Non-Tech" ? "rgb(58, 164, 250)" : "#f5f5f5",
        color: selectedOptionNon === "Non-Tech" ? "white" : "#333",
        borderRadius: "8px",
        fontSize: { xs: "14px", sm: "16px" },
        fontWeight: "500",
        transition: "all 0.3s ease",
        boxShadow:
          selectedOptionNon === "Non-Tech"
            ? "0px 4px 8px rgba(58, 164, 250, 0.4)"
            : "none",
        "&:hover": {
          backgroundColor: "rgb(125, 196, 253)",
          color: "black",
          boxShadow: "0px 4px 12px rgba(58, 164, 250, 0.5)",
        },
      }}
      onClick={() => setSelectedOption("Non-Tech")}>
        Non-Tech
      </Button>

    </Box>

    <Box>
      {CollegeContent()}
    </Box>

    </>
  )
}

export default College
