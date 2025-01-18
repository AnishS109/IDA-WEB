import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import AddAlertIcon from '@mui/icons-material/AddAlert';
import React, { useContext, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { DataContext } from "../../Context/DataProvider";
import axios from "axios";
import { useState } from "react"

import CloseIcon from "@mui/icons-material/Close";
import FeedbackIcon from "@mui/icons-material/Feedback";
import SendIcon from "@mui/icons-material/Send";
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import ErrorIcon from '@mui/icons-material/Error';

const Event = () => {

  const { account, role, backendUrl } = useContext(DataContext)
  const [VisitedEventData,setVisitedEventData] = useState([])
  const [addFeedBackModal, setAddFeedBackModal] = useState(false)
  const [feedBack, setFeedBack] = useState("")
  const [ServerEventData, setServerEventData] = useState({
    eventName:"",
    eventPlaceName:""
  })
  const [DetailModalData, setDetailModalData] = useState(null)
  const [eventDetailModal, setEventDetailModal] = useState(false)
  const [DataLoad, setDataLoad] = useState(false)
  const [fetchingError, setfetchingError] = useState("")
  const [SearchTerm,setSearchTerm] = useState("")

  // --------------------------------------------------------------------------------------------------
  
  const fetchVistedEventData = async() => {
    setDataLoad(true)
    const serverData = {HRName:account.name,role:role}
    
    try {
      const response = await axios.get(`${backendUrl}/HR/Visited-Events-Data`, {
        params:serverData
      })
      if(response.status === 200){
        setVisitedEventData(response.data)
      }else {
        setfetchingError(response.data.message)
      }
    } catch (error) {
      console.log(error.response.data.message);
      setfetchingError(error.response.data.message)
    }finally {
      setDataLoad(false)
    }
  }
  useEffect(() => {
    fetchVistedEventData()
  },[])

  // --------------------------------------------------------------------------------------------------

  const filteredData = VisitedEventData.filter((data) => 
  data.eventName.toLowerCase().includes(SearchTerm.toLowerCase()))

  // --------------------------------------------------------------------------------------------------
  
  const addFeedbackClick = (data) => {
    const { eventPlaceName, eventName } = data
    setAddFeedBackModal(true)
    setServerEventData({eventName,eventPlaceName })
  }
  
  // --------------------------------------------------------------------------------------------------
  
  const handleAddFeedBackModal = () => {
    setAddFeedBackModal(false)
  }

  // --------------------------------------------------------------------------------------------------

  const handleEventDetailModal = () => {
    setEventDetailModal(false)
  }

  // --------------------------------------------------------------------------------------------------
  
  const addFeedBackEvent = async() => {
    const serverData = {
      HRName:account.name,
      feedBack:feedBack,
      role:role,
      eventName:ServerEventData.eventName,
      eventPlaceName:ServerEventData.eventPlaceName
    }

    console.log(serverData)

    try {
      const response = await axios.post(`${backendUrl}/HR/Set-Event-FeedBack`, serverData)
      if(response.status === 200){
        console.log(response.data.message)
      }
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  // --------------------------------------------------------------------------------------------------

  return (
    <>

    <Box
      sx={{
      backgroundColor: '#f4f5f7',
      minHeight: '90vh',
      padding: { xs: '10px', sm: '20px 30px' }, 
  }}>

    <Box sx={{
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      marginBottom:"20px",
      flexWrap:"wrap",
      gap:"10px"
    }}>

      <Typography sx={{
        fontWeight:700,
        fontSize:{xs:"1.5rem", sm:"2rem"},
        color:"#333",
        fontFamily: 'Roboto, sans-serif',
      }}>
        ADD EVENTS
      </Typography>

      <NavLink to={"/Add/Events"} style={{textDecoration:"none"}}>
      <Button variant="contained" startIcon={<AddAlertIcon/>} sx={{
        bgcolor:"#3a98f0",
        fontWeight:"bold",
        padding:"10px 20px",
        fontSize:{xs:"14px", sm:"16px"},
        borderRadius:"8px",
        boxShadow: '0px 4px 6px rgba(58, 164, 250, 0.3)',
        "&:hover":{
          bgcolor:"#357edd"
        }
      }}>
        Event
      </Button>
      </NavLink>
    </Box>

    <Box sx={{
      textAlign:"center",
      mt:"10px",
      borderTop:"1px solid",
      borderColor:"#9999"
    }}>

      <Typography sx={{
        fontWeight:"bold",
        fontSize:{xs:"1.5rem", sm:"2rem"},
        color:"#333",
        mt:"10px",
        mb:"10px"
      }}>
        Visited Events
      </Typography>

    </Box>

    <TextField 
    fullWidth 
    label="Search by Event Name"
    value={SearchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    />
      
    {DataLoad ? (
    <Box display="flex" justifyContent="center" alignItems="center" height="300px">
      <CircularProgress />
    </Box>
    ): VisitedEventData.length > 0 ? (
      <Box sx={{
        mt:"10px",
        borderTop:"1px solid",
        borderColor:"#9999",
        overflowX:"auto"
      }}>
      <Table sx={{
        minWidth:680
      }}>
      <TableHead>
        <TableRow>
          <TableCell sx={{textAlign:'center'}}><strong>EVENT NAME</strong></TableCell>
          <TableCell sx={{textAlign:'center'}}><strong>EVENT DATE</strong></TableCell>
          <TableCell sx={{textAlign:'center'}}><strong>EVENT PLACE</strong></TableCell>
          <TableCell sx={{textAlign:'center'}}><strong>EVENT TYPE</strong></TableCell>
          <TableCell sx={{textAlign:'center'}}><strong>FEEDBACK</strong></TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {filteredData.map((data) => (
          <TableRow key={data._id} sx={{
            cursor:"pointer",
            "&:hover":{
              bgcolor:"rgb(224, 224, 224)"
            }
          }}
          onClick={() => {setDetailModalData(data)}}>
            <TableCell sx={{textAlign:'center'}} onClick={() => setEventDetailModal(true)}>{data.eventName}</TableCell>
            <TableCell sx={{textAlign:'center'}} onClick={() => setEventDetailModal(true)}>{new Date(data.eventDate).toLocaleDateString()}</TableCell>
            <TableCell sx={{textAlign:'center'}} onClick={() => setEventDetailModal(true)}>{data.eventPlaceName} ({data.eventPlace})</TableCell>
            <TableCell sx={{textAlign:'center'}} onClick={() => setEventDetailModal(true)}>{data.eventType}</TableCell>
            <TableCell   sx={{ 
              textAlign: 'center',
              maxWidth: '200px',
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap', 
            }}>{data.feedBack ? data.feedBack : (

              <Button variant="outlined" sx={{
                ':hover': {
                  variant: 'contained',
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
              onClick={() => addFeedbackClick(data)}>
                ADD feedback
              </Button>

            )}</TableCell> 
            </TableRow>
        ))}
        </TableBody>
      </Table>
      </Box>
    ):fetchingError ? (
      <Typography>
        {fetchingError}
      </Typography>
    ):(
      <Typography variant="h6" align="center" color="textSecondary" sx={{mt:"30px"}}>
        No Data Found.
      </Typography>
    )}

      {/* ------------------------------ MODAL SECTION -------------------------------- */}
      {/* ------------------------------ MODAL SECTION -------------------------------- */}
      {/* ------------------------------ MODAL SECTION -------------------------------- */}
      {/* ------------------------------ MODAL SECTION -------------------------------- */}
      {/* ------------------------------ MODAL SECTION -------------------------------- */}


      {/* --------------------------- MODAL FOR ADDING FEEDBACK ----------------------------- */}

      <Dialog
      open={addFeedBackModal}
      onClose={handleAddFeedBackModal}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "16px", 
          padding: "16px", 
          backgroundColor: "#f9f9f9", 
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)", 
        },
      }}
    >
      {/* Dialog Title with Close Button */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "#3a98f0", 
          }}
        >
          <FeedbackIcon sx={{ color: "#3a98f0", fontSize: "2rem" }} />
          Add Feedback
        </DialogTitle>
        <IconButton onClick={handleAddFeedBackModal}>
          <CloseIcon sx={{ color: "#666" }} />
        </IconButton>
      </Box>

      {/* Dialog Content */}
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px 0",
        }}
      >

        {/* Feedback TextField */}
        <TextField
          multiline
          value={feedBack}
          onChange={(e) => setFeedBack(e.target.value)}
          rows={5}
          placeholder="Write your feedback here..."
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px", 
            },
          }}
        />
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions sx={{ justifyContent: "space-between", padding: "16px" }}>
        <Button
          onClick={handleAddFeedBackModal}
          sx={{
            color: "#fff",
            backgroundColor: "#f44336",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          sx={{
            backgroundColor: "#3a98f0", 
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: "#357edd",
            },
          }}
          onClick={addFeedBackEvent}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>

    {/* --------------------------- MODAL FOR DETAIL FEEDBACK ----------------------------- */}
    {/* --------------------------- MODAL FOR DETAIL FEEDBACK ----------------------------- */}

    <Dialog
  open={eventDetailModal}
  onClose={handleEventDetailModal}
  sx={{
    '& .MuiDialog-paper': {
      borderRadius: 6,
      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
      minWidth: '40vw', // Set the minimum width to 40vw
    },
  }}
>
  <DialogTitle
    sx={{
      fontWeight: 'bold',
      fontSize: '1.5rem',
      color: '#3a98f0',
      backgroundColor: '#f4f7fb',
      padding: '20px 24px',
      borderBottom: '2px solid #e1e1e1',
    }}
    >
    Event Details
  </DialogTitle>

  <DialogContent
    sx={{
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      backgroundColor: '#f9f9f9',
    }}
    >
    {DetailModalData !== null && (
      <>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#333',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <EventIcon sx={{ color: '#3a98f0', marginRight: 1 }} />
          {DetailModalData.eventName}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#555',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <EventIcon sx={{ color: '#888', marginRight: 1 }} />
          {new Date(DetailModalData.eventDate).toLocaleDateString()}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#555',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <PlaceIcon sx={{ color: '#888', marginRight: 1 }} />
          {DetailModalData.eventPlaceName} ({DetailModalData.eventPlace})
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#555',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <EventIcon sx={{ color: '#888', marginRight: 1 }} />
          {DetailModalData.eventType}
        </Typography>

        {DetailModalData.feedBack ? (
          <Typography
            variant="body1"
            sx={{
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              marginTop: 2,
              fontSize: '1rem',
              fontWeight: 500,
            }}
          >
            <FeedbackIcon sx={{ color: '#4caf50', marginRight: 1 }} />
            {DetailModalData.feedBack}
          </Typography>
        ) : (
          <Typography
          variant="body1"
            sx={{
              color: '#888',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              marginTop: 2,
              fontSize: '1rem',
              fontWeight: 400,
            }}
          >
            <ErrorIcon sx={{ color: '#f44336', marginRight: 1 }} />
            No feedback provided
          </Typography>
        )}


      </>
    )}
  </DialogContent>
  <DialogActions sx={{mr:"10px"}}>
    <Button 
    variant="outlined" 
    sx={{
        ':hover': {
          variant: 'contained',
          backgroundColor: 'primary.main',
          color: 'white',
        },
      }} 
    onClick={handleEventDetailModal}>Close</Button>
  </DialogActions>
</Dialog>

    

    </Box>

    </>
  )
}

export default Event