import React, { useContext, useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { DataContext } from "../../Context/DataProvider";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Modal,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EventIcon from "@mui/icons-material/Event";
import PlaceIcon from "@mui/icons-material/Place";
import { HRDataContext } from "../../Context/HRDataProvider";

const Notification = () => {
  const { backendUrl, role, account } = useContext(DataContext);
  const { events, setEvents } = useContext(HRDataContext);

  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [confirmModalMsg, setConfirmModalMsg] = useState("")
  const [confirmModalMsgSeverity, setConfirmModalMsgSeverity] = useState("")
  const [VisitLoadModal, setVisitLoadModal] = useState(false)

  // --------------------------------------------------------------------------------------------------
  
  const fetchEventData = async () => {
    const HRName = account.name;
    const serverData = {
      role,
      HRName,
    };
    
    try {
      const response = await axios.get(`${backendUrl}/HR/Events-Data`, {
        params: serverData,
      });

      if (response.status === 200) {
        setEvents(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Failed to fetch events");
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchEventData();
  }, []);

  // --------------------------------------------------------------------------------------------------
  
  const handleVisitedClick = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  // --------------------------------------------------------------------------------------------------
  
  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };

  // --------------------------------------------------------------------------------------------------
  
  const handleConfirmVisit = async() => {
    
    setVisitLoadModal(true)
    
    const HRName = account.name
    const eventName = selectedEvent.eventName
    const serverData = {
      role,
      HRName,
      eventName
    }
    
    try {
      const response = await axios.post(`${backendUrl}/HR/Set-Event-Visited`,serverData)
      if(response.status === 200){
        setConfirmModalMsgSeverity("success")
        setConfirmModalOpen(true)
        setConfirmModalMsg(response.data.message)
      }
    } catch (error) {
      setConfirmModalMsgSeverity("error")
      setConfirmModalOpen(true)
      setConfirmModalMsg(error.response?.data?.message || "Error While Submitting")
    }finally {
      setOpenModal(false);
      setVisitLoadModal(false)
      setSelectedEvent(null);
      setTimeout(() => {
        setConfirmModalOpen(false);
      }, 1000);
    }
  };

  // --------------------------------------------------------------------------------------------------
  
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.eventDate);
    const currentDate = new Date();

    eventDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    return eventDate >= currentDate;
  });
  
  // --------------------------------------------------------------------------------------------------

  return (
    <Layout>
      <Box
        sx={{
          maxWidth: "80%",
          minHeight:"50vh",
          margin: "auto",
          padding: 2,
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >

        {loading ? (
    <Box display="flex" justifyContent="center" alignItems="center" height="300px">
      <CircularProgress />
    </Box>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <Card
              key={index}
              sx={{
                marginBottom: 3,
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
                borderRadius: 2,
                overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s"
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <EventIcon color="primary" /> {event.eventName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#555",
                    marginTop: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <PlaceIcon color="action" /> {event.eventPlaceName} (
                  {event.eventPlace})
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#555",
                    marginTop: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <EventIcon color="action" />{" "}
                  {new Date(event.eventDate).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>

              {event.eventVisited ? (
                <Button variant="contained" disabled={event.eventVisited} sx={{color:"black"}}>
                  Visited
                </Button>
                ): (
                  <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleVisitedClick(event)}
                  sx={{
                    textTransform: "none",
                    borderRadius: 20,
                    paddingX: 3,
                  }}
                >
                  Visited?
                </Button>
                )}

              </CardActions>
            </Card>
          ))
        ) : (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", color: "#888", marginTop: 3 }}
          >
            No events available.
          </Typography>
        )}

        {/*--------------- Modal -----------------------*/}
        {/*--------------- Modal -----------------------*/}
        {/*--------------- Modal -----------------------*/}

        <Modal
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: {xs:"60%", sm:"45%", md:"28%", xl:"25%"},
              maxWidth: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 3,
              borderRadius: 3,
              textAlign: "center",
            }}
          >
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              {selectedEvent
                ? `Did you visit the "${selectedEvent.eventName}" Event?`
                : "Confirm Visit"}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleModalClose}
                startIcon={<CloseIcon />}
                sx={{
                  textTransform: "none",
                  borderRadius: 20,
                  paddingX: 3,
                }}
              >
                Cancel
              </Button>
              {VisitLoadModal ? (
              <CircularProgress/>
              ): (
                <>
                <Button
                variant="contained"
                color="success"
                onClick={handleConfirmVisit}
                startIcon={<CheckCircleOutlineIcon />}
                sx={{
                  textTransform: "none",
                  borderRadius: 20,
                  paddingX: 3,
                }}
              >
                Confirm
              </Button>
              </>
              )}
            </Box>
          </Box>
        </Modal>

        <Snackbar 
        open={confirmModalOpen} 
        onClose={() => setConfirmModalMsg(false)}
        autoHideDuration={6000}>

          <Alert
          onClose={() => setConfirmModalMsg(false)}
          severity={confirmModalMsgSeverity}
          sx={{ width: '100%' }}>

            {confirmModalMsg}

          </Alert>
        </Snackbar>

      </Box>
    </Layout>
  );
};

export default Notification;
