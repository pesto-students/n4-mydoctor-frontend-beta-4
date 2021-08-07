import React, { useEffect } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";

const DoctorDetails = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  let { services, reviews, qualifications, experience } = props.data;

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "services"}
        onChange={handlePanelChange("services")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            <b>Services</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul>
              {services.map((service) => (
                <li>{service.name}</li>
              ))}
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "reviews"}
        onChange={handlePanelChange("reviews")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            <b>Reviews</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul>
              {reviews.map((review) => (
                <li>
                  {"Rating :" + review.rating + " Review :" + review.review}
                </li>
              ))}
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "qualifications"}
        onChange={handlePanelChange("qualifications")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            <b>Qualifications</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul>
              {qualifications.map((qualification) => (
                <li>
                  {qualification.name +
                    ", " +
                    qualification.instituteName +
                    ", " +
                    qualification.procurementYear}
                </li>
              ))}
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "experience"}
        onChange={handlePanelChange("experience")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            <b>Experience</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul>
              {experience.map((exper) => (
                <li>
                  {exper.role +
                    " at " +
                    exper.hospitalName +
                    " for " +
                    exper.yearsWorked +
                    " years"}
                </li>
              ))}
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default DoctorDetails;
