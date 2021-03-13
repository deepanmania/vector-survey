import React, { useEffect } from "react";
// @material-ui/core components
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "views/Header";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import DateFnsUtils from "@date-io/date-fns";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Snackbar from "components/Snackbar/Snackbar.js";
import AddAlert from "@material-ui/icons/AddAlert";
// tabs
import PropTypes from "prop-types";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Webcam from "react-webcam";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { usePosition } from "use-position";

import { Http } from "lib";

const videoConstraints = {
  width: 500,
  height: 500,
  facingMode: "environment",
};

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  formControl: {
    width: "100%",
    "margin-top": "27px",
  },
  padContainer: {
    padding: "0 10%",
  },
};

const waterSampleParams = [
  { name: "Infiltration Gallery", val: "infiltrationgallery" },
  { name: "Infiltration Well", val: "infiltrationwell" },
  { name: "Open Well", val: "openwell" },
  { name: "Bore Well", val: "borewell" },
  { name: "Collection Sump", val: "collectionsump" },
  { name: "Pumping Station", val: "pumpingstation" },
  { name: "Over Head Tank / HDPE Tanks", val: "overheadtank" },
  { name: "RO Plant", val: "roplant" },
  { name: "Distribution Pipeline Tap First", val: "tapfirst" },
  { name: "Distribution Pipeline Tap Middle", val: "tapmiddle" },
  { name: "Distribution Pipeline Tap Last", val: "taplast" },
];

const useStyles = makeStyles(styles);

const responseMap = {
  countries: "states",
  states: "districts",
  districts: "hud",
  hud: "block",
  block: "village",
  village: "habitation",
  habitation: "street",
};

export default function FillForm(props) {
  const stateProps = ((props || {}).location || {}).state || {};
  const [loaded, setLoaded] = React.useState(false);
  const [countries, setCountries] = React.useState([]);
  const [districts, setDistricts] = React.useState([]);
  const [huds, setHuds] = React.useState([]);
  const [blocks, setBlocks] = React.useState([]);
  const [villages, setVillages] = React.useState([]);
  const [habitations, setHabitations] = React.useState([]);
  const [streets, setStreets] = React.useState([]);
  const [messageInfo, setmessageInfo] = React.useState("");
  const [showInfo, setshowInfo] = React.useState(false);

  const formValue = Object.assign({}, stateProps);
  useEffect(() => {
    (async () => {
      if (stateProps.id) {
        await Http.getResponse("districts", 36).then((res) => {
          setDistricts(res);
        });
        await Http.getResponse("hud", formValue.district).then((res) => {
          setHuds(res);
        });
        await Http.getResponse("block", formValue.hud).then((res) => {
          setBlocks(res);
        });
        await Http.getResponse("village", formValue.block).then((res) => {
          setVillages(res);
        });
        await Http.getResponse("habitation", formValue.village).then((res) => {
          setHabitations(res);
        });
        await Http.getResponse("street", formValue.habitation).then((res) => {
          setLoaded(true);
          setStreets(res);
        });
      } else {
        Http.getResponse("districts", 36).then((res) => {
          setDistricts(res);
        });
      }
    })();
  }, []);
  const [district, setDistrict] = React.useState(formValue.district || 0);
  const [hud, setHud] = React.useState(formValue.hud || 0);

  const [block, setBlock] = React.useState(formValue.block || 0);

  const [village, setVillage] = React.useState(formValue.village || 0);

  const [habitation, setHabitation] = React.useState(formValue.habitation || 0);

  const [street, setStreet] = React.useState(formValue.street || 0);

  const [dateOfWork, setDateOfWork] = React.useState(
    formValue.dateOfWork || new Date()
  );
  const [workersEngaged, setWorkersEngaged] = React.useState(
    formValue.workersEngaged || 0
  );
  const [otherWorkers, setOtherWorkers] = React.useState(
    formValue.otherWorkers || 0
  );
  const [housesEngaged, setHousesEngaged] = React.useState(
    formValue.housesEngaged || 0
  );
  const [housesCleared, setHousesCleared] = React.useState(
    formValue.housesCleared || 0
  );
  const [containersDestroyed, setContainersDestroyed] = React.useState(
    formValue.containersDestroyed || 0
  );
  const [dateOfFogging, setDateOfFogging] = React.useState(
    formValue.dateOfFogging || new Date()
  );
  const classes = useStyles();
  // const [states, setStates] = React.useState("");
  // const [state, setState] = React.useState("");
  // const [districts, setDistricts] = React.useState("");
  // const [district, setDistrict] = React.useState("");
  // const [country, setCountry] = React.useState("");
  const [placeType, setPlaceType] = React.useState("");

  const [webcamEnabled, setWebcamEnabled] = React.useState(false);
  const [visitReason, setVisitReason] = React.useState(
    formValue.visitReason || ""
  );
  const [dateOfInspection, setDateOfInspection] = React.useState(new Date());
  const { latitude, longitude } = usePosition(true);
  const webcamRef = React.useRef(null);
  const handleSubmit = async (op = "insert", id) => {
    if (!district || !hud) {
      const wait = (timeout = 2000) => {
        return new Promise((resolve) => setTimeout(() => resolve, timeout));
      };
      setmessageInfo("District, Hud are required to save the entry");
      setshowInfo(true);
      await wait();
      setshowInfo(false);
    }
    const payload = {
      formType: "action",
      userId: localStorage.getItem("userId"),
      body: {
        district,
        hud,
        block,
        village,
        habitation,
        placeType,
        dateOfInspection,
        visitReason,
        dateOfWork,
        workersEngaged,
        otherWorkers,
        housesEngaged,
        housesCleared,
        containersDestroyed,
        dateOfFogging,
      },
    };
    setmessageInfo("Saving");
    setshowInfo(true);
    await Http.submitVectorFormData(payload, op, id).then(() => {
      setshowInfo(false);
      props.history.push({
        pathname: "lineList",
      });
    });
  };
  const handleDateChange = (date) => {
    setDateOfInspection(date);
  };

  const setWaterParamState = (varName, event) => {
    const targetVal = (event.target || {}).value;
    eval("set" + varName)(targetVal);
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
        "street",
      ].includes(fn)
    ) {
      console.log("!!!", fn, event);
      Http.getResponse(responseMap[fn], event.target.value).then((res) => {
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
      });
    }
    if (fn === "placetype") {
      setPlaceType(targetVal);
    }
    if (fn === "visitReason") {
      setVisitReason(targetVal);
    }
  };

  return (stateProps.id ? (
    loaded
  ) : (
    districts.length
  )) ? (
    <div>
      <MuiThemeProvider>
        <Header title="Vector Action" />
      </MuiThemeProvider>
      <GridContainer container={true}>
        <GridItem xs={12} sm={12} md={12} className={classes.padContainer}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Geographic details of Vector Index
              </h4>
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
                      Reason for Visit
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      value={visitReason}
                      onChange={handleChange.bind(null, "visitReason")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {[
                        "Markets",
                        "Industries",
                        "Educational institutions ",
                        "Shopping complex",
                        "Commercial complex",
                        "Railway station",
                        "Bus stand",
                        "Worship area",
                        "Prison",
                        "Locked house",
                      ].map((i, idx) => (
                        <MenuItem value={i} key={idx}>
                          {i}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
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
                        "Others",
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
                      label="Date of Sample Taken"
                      format="MM/dd/yyyy"
                      value={dateOfInspection}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </GridItem>
                {/* <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText={`Latitude ${latitude} | Longitude ${longitude}`}
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  />
                </GridItem> */}
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} className={classes.padContainer}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Action taken Details - DBC Deployment
              </h4>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={classes.formControl}
                      margin="normal"
                      id="dateofwork"
                      label="Date of Work"
                      format="MM/dd/yyyy"
                      value={dateOfWork}
                      onChange={setWaterParamState.bind(null, "DateOfWork")}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Number of DBC workers Engaged"
                    id="dbcworkers"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: workersEngaged,
                      onChange: setWaterParamState.bind(null, "WorkersEngaged"),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Number of other Workers"
                    id="otherworkers"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: otherWorkers,
                      onChange: setWaterParamState.bind(null, "OtherWorkers"),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Number of Houses Engaged"
                    id="housesengaged"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: housesEngaged,
                      onChange: setWaterParamState.bind(null, "HousesEngaged"),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Number of Houses Cleared"
                    id="housescleared"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: housesCleared,
                      onChange: setWaterParamState.bind(null, "HousesCleared"),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Number of Containers destroyed"
                    id="containersdestroyed"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: containersDestroyed,
                      onChange: setWaterParamState.bind(
                        null,
                        "ContainersDestroyed"
                      ),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={classes.formControl}
                      margin="normal"
                      id="dateoffogging"
                      label="Date of Fogging"
                      format="MM/dd/yyyy"
                      value={dateOfFogging}
                      onChange={setWaterParamState.bind(null, "DateOfFogging")}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>

        <CardFooter
          style={{
            width: "100%",
          }}
        >
          <Button
            color="primary"
            style={{
              marginLeft: "50%",
            }}
            onClick={handleSubmit.bind(
              null,
              stateProps.id ? "update" : "create",
              stateProps.id
            )}
          >
            Save Entry
          </Button>
        </CardFooter>
      </GridContainer>
      <Snackbar
        place="tr"
        color="success"
        icon={AddAlert}
        message={messageInfo}
        open={showInfo}
        closeNotification={() => setshowInfo(false)}
        close
      />
    </div>
  ) : (
    <div>Loading...</div>
  );
}
