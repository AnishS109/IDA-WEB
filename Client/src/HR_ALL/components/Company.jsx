import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Company_NonTech from '../sub_components/Company_NonTech'
import Company_Tech from '../sub_components/Company_Tech'

const Company = () => {

  const [selectedOptionss, setSelectedOption] = useState(
    sessionStorage.getItem("selectedOptionss") || "Tech"
  )

  useEffect(() => {
    sessionStorage.setItem("selectedOptionss", selectedOptionss)
  },[selectedOptionss])

  const CompanyContent = () => {
    if(selectedOptionss === "Non-Tech"){
      return <Company_NonTech/>
    }
    else if (selectedOptionss === "Tech"){
      return <Company_Tech/>
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
        backgroundColor: selectedOptionss === "Tech" ? "rgb(58, 164, 250)" : "#f5f5f5",
        color: selectedOptionss === "Tech"  ? "white" : "#333",
        borderRadius: "8px",
        fontSize: { xs: "14px", sm: "16px" },
        fontWeight: "500",
        transition: "all 0.3s ease",
        boxShadow:
          selectedOptionss === "Tech" 
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
        backgroundColor: selectedOptionss === "Non-Tech" ? "rgb(58, 164, 250)" : "#f5f5f5",
        color: selectedOptionss === "Non-Tech" ? "white" : "#333",
        borderRadius: "8px",
        fontSize: { xs: "14px", sm: "16px" },
        fontWeight: "500",
        transition: "all 0.3s ease",
        boxShadow:
          selectedOptionss === "Non-Tech"
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
      {CompanyContent()}
    </Box>

    </>
  )
}

export default Company
