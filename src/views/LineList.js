import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "views/Header";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import DateFnsUtils from "@date-io/date-fns";
// import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Icon from "@material-ui/core/Icon";

import { Http } from "lib";

const keyMapper = {
  dateOfInspection: "Date of Inspection",
  numberOfHouses: "Number of Houses",
  positiveHouses: "Number of Houses with breeding positive",
  houseIndex: "Computed Indices – House Index",
  containers: "Number of Container Inspected",
  containerIndex: "Computed Indices - Container Index",
  breteauIndex: "Computed Indices - Breteau Index"
};

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
const useStyles = makeStyles(styles);
const useFormStyles = makeStyles(formStyles);

export default function LineList(props) {
  const listClasses = useStyles();
  const classes = useFormStyles();
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
  const responseMap = {
    countries: "states",
    states: "districts",
    districts: "hud",
    hud: "block",
    block: "village",
    village: "habitation",
    habitation: "street"
  };

  const handleClick = id => {
    Http.getVectorEntry(id).then(res => {
      props.history.push({
        pathname: "/fillform",
        state: res
      });
    });
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
      resp = resp.map(i => {
        i.dateOfInspection = moment(i.dateOfInspection, moment.ISO_8601).format(
          "DD/MM/YYYY"
        );
        return i;
      });
      setData(resp);
    });
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
  const handleDateChange = date => {
    setDateOfInspection(date);
  };
  useEffect(() => {
    Http.getResponse("districts", 33).then(res => {
      setDistricts(res);
      Http.getLineListData().then(resp => {
        console.log("!!!!", resp);
        resp = resp.map(i => {
          i.dateOfInspection = moment(
            i.dateOfInspection,
            moment.ISO_8601
          ).format("DD/MM/YYYY");
          return i;
        });
        setData(resp);
      });
    });
  }, []);

  return data ? (
    <div>
      <MuiThemeProvider>
        <Header title="Line List" />
      </MuiThemeProvider>
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
                  <FormControl className={classes.formControl}>
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
                  <FormControl className={classes.formControl}>
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
                  <FormControl className={classes.formControl}>
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
                  <FormControl className={classes.formControl}>
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
                  <FormControl className={classes.formControl}>
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
                  <FormControl className={classes.formControl}>
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
                  <FormControl className={classes.formControl}>
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
                      {[
                        "House",
                        "Institutions",
                        "Govt Building",
                        "Open Place",
                        "Others"
                      ].map((i, idx) => (
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
                      className={classes.formControl}
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
          </Card>
        </GridItem>
      </GridContainer>
      <Button color="primary" onClick={handleSubmit}>
        Apply
      </Button>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={listClasses.cardTitleWhite}>Line List</h4>
            </CardHeader>
            <CardBody>
              {data.length && (
                <Table
                  tableHeaderColor="warning"
                  tableHead={[
                    "S.No",
                    ...Object.keys(data[0]).filter(i => i !== "id"),
                    ...["", ""]
                  ].map(i => keyMapper[i])}
                  tableData={data.map((i, idx) => {
                    const id = i.id;
                    delete i.id;
                    return [
                      idx + 1,
                      ...Object.values(i),
                      <div key={idx} onClick={handleClick.bind(null, id)}>
                        <Icon key={idx}>create</Icon>
                      </div>
                    ];
                  })}
                />
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
