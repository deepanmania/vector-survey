import React, { Component, useEffect } from "react";
// react plugin for creating charts
// import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
// import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
// import LocalOffer from "@material-ui/icons/LocalOffer";
// import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
// import Accessibility from "@material-ui/icons/Accessibility";
// import BugReport from "@material-ui/icons/BugReport";
// import Code from "@material-ui/icons/Code";
// import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
// import Tasks from "components/Tasks/Tasks.js";
// import CustomTabs from "components/CustomTabs/CustomTabs.js";
// import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "views/Header";
import Button from "components/CustomButtons/Button.js";

// import { bugs, website, server } from "variables/general.js";

// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart
// } from "variables/charts.js";

import "date-fns";
// core components
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import DateFnsUtils from "@date-io/date-fns";
// import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Http } from "lib";
import PieChart from "react-minimal-pie-chart";

// const keyMapper = {
//   dateOfInspection: "Date of Inspection",
//   numberOfHouses: "Number of Houses",
//   positiveHouses: "Number of Houses with breeding positive",
//   houseIndex: "Computed Indices – House Index",
//   containers: "Number of Container Inspected",
//   containerIndex: "Computed Indices - Container Index",
//   breteauIndex: "Computed Indices - Breteau Index"
// };

const formStyles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  formControl: {
    width: "100%",
    "margin-top": "27px"
  },
  padContainer: {
    padding: "0 10%"
  }
};

const useFormStyles = makeStyles(formStyles);

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const [initData, setInitData] = React.useState("");
  useEffect(() => {
    Http.getDashBoardData().then(res => {
      setInitData(res);
    });
  }, []);
  const responseMap = {
    countries: "states",
    states: "districts",
    districts: "hud",
    hud: "block",
    block: "village",
    village: "habitation",
    habitation: "street"
  };

  const handleDateChange = date => {
    setDateOfInspection(date);
  };

  const handleChange = (fn, event) => {
    console.log(fn, event);
    const targetVal = (event.target || {}).value;
    if (
      [
        "countries",
        "states",
        "districts",
        "hud",
        "block",
        "village",
        "habitation",
        "street"
      ].includes(fn)
    ) {
      console.log("!!!", fn, event);
      Http.getResponse(responseMap[fn], event.target.value).then(res => {
        // if (fn === "countries") {
        //   setCountry(targetVal);
        //   setStates(res);
        // }
        // if (fn === "states") {
        //   setState(targetVal);
        //   setDistricts(res);
        // }
        if (fn === "districts") {
          setDistrict(targetVal);
          setHuds(res);
        }
        if (fn === "hud") {
          setHud(targetVal);
          setBlocks(res);
        }
        if (fn === "block") {
          setBlock(targetVal);
          setVillages(res);
        }
        if (fn === "village") {
          setVillage(targetVal);
          setHabitations(res);
        }
        if (fn === "habitation") {
          setHabitation(targetVal);
          setStreets(res);
        }
        if (fn === "street") {
          setStreet(targetVal);
        }
        if (fn === "placetype") {
          setPlaceType(targetVal);
        }
      });
    }
  };
  const handleSubmit = () => {
    const payload = {
      district,
      hud,
      block,
      village,
      habitation,
      placeType,
      dateOfInspection
    };
    Http.applyFilter(payload).then(resp => {
      setData(resp || []);
    });
  };

  const formClasses = useFormStyles();
  const classes = useStyles();
  const [states, setStates] = React.useState("");
  const [state, setState] = React.useState("");
  const [districts, setDistricts] = React.useState([]);
  const [huds, setHuds] = React.useState([]);
  const [blocks, setBlocks] = React.useState([]);
  const [villages, setVillages] = React.useState([]);
  const [habitations, setHabitations] = React.useState([]);
  const [streets, setStreets] = React.useState([]);
  const [district, setDistrict] = React.useState(0);
  const [dateOfInspection, setDateOfInspection] = React.useState(new Date());
  const [hud, setHud] = React.useState(0);
  const [placeType, setPlaceType] = React.useState("");
  const [block, setBlock] = React.useState(0);

  const [village, setVillage] = React.useState(0);

  const [habitation, setHabitation] = React.useState(0);

  const [street, setStreet] = React.useState(0);
  const [data, setData] = React.useState("");
  return initData ? (
    <div>
      <MuiThemeProvider>
        <Header title="Dashboard" />
      </MuiThemeProvider>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Today</p>
              <h3 className={classes.cardTitle}>
                {initData.today.length} <small>Entries</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>This Month</p>
              <h3 className={classes.cardTitle}>
                {initData.thisMonth.length} Entries
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 30 Days
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer container={true}>
        <GridItem xs={12} sm={12} md={12} className={classes.padContainer}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Filter</h4>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={formClasses.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      District
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="district"
                      value={district}
                      onChange={handleChange.bind(null, "districts")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {(districts || []).map((i, idx) => (
                        <MenuItem value={i.districtId} key={idx}>
                          {i.districtName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Name of the district</FormHelperText>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={formClasses.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      HUD
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="hud"
                      value={hud}
                      onChange={handleChange.bind(null, "hud")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {(huds || []).map((i, idx) => (
                        <MenuItem value={i.hudId} key={idx}>
                          {i.hudName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Select HUD</FormHelperText>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={formClasses.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Block
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="block"
                      value={block}
                      onChange={handleChange.bind(null, "block")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {(blocks || []).map((i, idx) => (
                        <MenuItem value={i.blockId} key={idx}>
                          {i.blockName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Select Block</FormHelperText>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={formClasses.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Village
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="village"
                      value={village}
                      onChange={handleChange.bind(null, "village")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {(villages || []).map((i, idx) => (
                        <MenuItem value={i.villageId} key={idx}>
                          {i.villageName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      Name of the Village / Locality
                    </FormHelperText>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={formClasses.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Habitations
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="habitation"
                      value={habitation}
                      onChange={handleChange.bind(null, "habitation")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {(habitations || []).map((i, idx) => (
                        <MenuItem value={i.habitationId} key={idx}>
                          {i.habitationName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Name of the Habitation</FormHelperText>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={formClasses.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Street
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="street"
                      value={street}
                      onChange={handleChange.bind(null, "street")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {(streets || []).map((i, idx) => (
                        <MenuItem value={i.streetId} key={idx}>
                          {i.streetName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Name of the Hamlet / Street</FormHelperText>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={formClasses.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Place Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="placetype"
                      value={placeType}
                      onChange={handleChange.bind(null, "placetype")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {(localStorage.getItem("appName") === "vector"
                        ? [
                            "House",
                            "Institutions",
                            "Govt Building",
                            "Open Place",
                            "Others"
                          ]
                        : [
                            "Corporation",
                            "Municipalities",
                            "Town Panchayats",
                            "Government Hospitals",
                            "Government Homes",
                            "Railway Stations",
                            "Prisons",
                            "Government Institutions"
                          ]
                      ).map((i, idx) => (
                        <MenuItem value={i} key={idx}>
                          {i}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Type of the place</FormHelperText>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={formClasses.formControl}
                      margin="normal"
                      id="date-picker-dialog"
                      label="Date of Inspection"
                      format="MM/dd/yyyy"
                      value={dateOfInspection}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </GridItem>
              </GridContainer>
            </CardBody>
            <Button color="primary" onClick={handleSubmit}>
              Apply
            </Button>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          {data && (
            <div
              style={{
                marginLeft: "40%"
              }}
            >
              <PieChart
                animate={false}
                animationDuration={500}
                animationEasing="ease-out"
                cx={50}
                cy={50}
                data={[
                  {
                    color:
                      data.length >= 15
                        ? "#49b027"
                        : data.length >= 10
                        ? "#E38627"
                        : "#de2828",
                    value: data.length
                  }
                ]}
                label
                labelPosition={0}
                labelStyle={{
                  fontFamily: "sans-serif",
                  fontSize: "25px"
                }}
                lengthAngle={360}
                lineWidth={20}
                onClick={undefined}
                onMouseOut={undefined}
                onMouseOver={undefined}
                paddingAngle={0}
                radius={50}
                rounded={false}
                startAngle={0}
                totalValue={15}
                viewBoxSize={[100, 100]}
                style={{
                  float: "left"
                }}
              />
              <h4
                style={{
                  float: "right",
                  "padding-top": "10%",
                  "padding-right": "60%"
                }}
              >
                Entries
              </h4>
            </div>
          )}
        </GridItem>
      </GridContainer>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
