import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Fab,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PersonService from "../../service/person.service";
import BackIcon from "@mui/icons-material/ChevronLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { red } from "@mui/material/colors";

function ViewPersonComponent() {
  // This URL has param, so we need to tell React
  const params = useParams();
  // This component will redirect using functions, so we need to tell React
  const nav = useNavigate();

  // Hooks useState
  const [_id] = useState(params._id);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const DeleteColor = red[500];

  // Using useEffect hook to request during render
  useEffect(() => {
    PersonService.getPersonById(_id).then((res) => {
      // Get person from the response
      let person = res.data;

      // Set states
      setFirstName(person.firstName);
      setLastName(person.lastName);
      setEmail(person.email);
    });
  }, [_id]);

  // Function to delete item and redirect to "/"
  const deleteItem = (_id) => {
    PersonService.deletePerson(_id).then(() => {
      // redirect
      nav("/");
    });
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 10,
        pb: 6,
      }}
    >
      <Container>
        <Fab
          sx={{
            my: -4,
            mx: -4,
          }}
          color="primary"
          href="/"
        >
          <BackIcon />
        </Fab>
        <Card>
          <CardContent>
            <Grid container>
              <Grid
                item
                justifyContent="space-between"
                direction="row"
                sx={{ width: "100%" }}
              >
                <Typography
                  variant="h4"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  Contact info
                  <Box>
                    <IconButton href={`/add/${_id}`}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => deleteItem(_id)}>
                      <DeleteIcon
                        sx={{
                          color: DeleteColor,
                        }}
                      />
                    </IconButton>
                  </Box>
                </Typography>
              </Grid>
            </Grid>
            <Divider
              sx={{
                p: 1,
              }}
            />
            <Typography variant="h6">
              {firstName} {lastName}
            </Typography>
            <Typography>{email}</Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default ViewPersonComponent;
