import Page from "../layout/Page/page";
import React, { Component, useState } from "react";
import SearchBar from "./components/SearchBar/searchBar";
import Location from "./components/Location/location";
import Specialisation from "./components/Specialization/specialisation";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import DoctorCard from "./components/DoctorCard/doctorCard";
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Flex from "../shared/components/Flex";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadDoctors } from "../state/doctors/slice";
import { useStyles } from "./styles";

function Dashboard() {
  const classes = useStyles();
  const { doctors, pages } = useSelector((state) => state.doctors);
  const [specialization, setSpecialization] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDoctors());
  }, []);
  const onPageClick = (e, page) => {
    dispatch(loadDoctors(page));
  };
  const onSearchHandler = (searchString) => {
    dispatch(loadDoctors(1, specialization, searchString));
  };
  const onSelecteSpecialization = (selection) => {
    setSpecialization(selection);
    dispatch(loadDoctors(1, selection, ""));
  };
  return (
    <Page>
      <div className={classes.root}>
        <Flex center full>
          <img
            src={"banner.PNG"}
            alt="Banner"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </Flex>
        <div className={classes.searchSection}>
          <Specialisation onSelectSpecialization={onSelecteSpecialization} />
          <SearchBar onSearch={onSearchHandler} />
        </div>
        <Grid container className={classes.content}>
          <Grid item container xs={12} spacing={4} style={{ margin: "0" }}>
            {doctors.map((doctor) => (
              <Grid item xs={12} sm={6} md={4} key={doctor.id}>
                <DoctorCard data={doctor} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        {pages > 1 && <Flex center full className={classes.pageNation}>
          <Pagination
            count={pages}
            variant="outlined"
            color="primary"
            onChange={onPageClick}
          />
        </Flex>
        }
      </div>
    </Page>
  );
}

export default Dashboard;
