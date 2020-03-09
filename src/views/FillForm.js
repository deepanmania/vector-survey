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
// tabs
import PropTypes from "prop-types";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Webcam from "react-webcam";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { usePosition } from "use-position";

import { Http } from "lib";

const videoConstraints = {
  width: 500,
  height: 500,
  facingMode: "environment"
};

const styles = {
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
  { name: "Distribution Pipeline Tap Last", val: "taplast" }
];

const useStyles = makeStyles(styles);

const responseMap = {
  countries: "states",
  states: "districts",
  districts: "hud",
  hud: "block",
  block: "village",
  village: "habitation",
  habitation: "street"
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

  const formValue = Object.assign({}, stateProps);
  useEffect(() => {
    (async () => {
      if (stateProps.id) {
        await Http.getResponse("districts", 33).then(res => {
          setDistricts(res);
        });
        await Http.getResponse("hud", formValue.district).then(res => {
          setHuds(res);
        });
        await Http.getResponse("block", formValue.hud).then(res => {
          setBlocks(res);
        });
        await Http.getResponse("village", formValue.block).then(res => {
          setVillages(res);
        });
        await Http.getResponse("habitation", formValue.village).then(res => {
          setHabitations(res);
        });
        await Http.getResponse("street", formValue.habitation).then(res => {
          setLoaded(true);
          setStreets(res);
        });
      } else {
        Http.getResponse("districts", 33).then(res => {
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
  const classes = useStyles();
  // const [states, setStates] = React.useState("");
  // const [state, setState] = React.useState("");
  // const [districts, setDistricts] = React.useState("");
  // const [district, setDistrict] = React.useState("");
  // const [country, setCountry] = React.useState("");
  const [placeType, setPlaceType] = React.useState("");
  const [positiveHouses, setPositiveHouses] = React.useState(
    formValue.positiveHouses || 0
  );
  const [houseIndex, setHouseIndex] = React.useState(formValue.houseIndex || 0);
  const [containers, setContainers] = React.useState(formValue.containers || 0);
  const [containerIndex, setContainerIndex] = React.useState(
    formValue.containerIndex || 0
  );
  const [breteauIndex, setBreteauIndex] = React.useState(
    formValue.breteauIndex || 0
  );
  const [visitType, setVisitType] = React.useState(formValue.visitType || "");
  const [visitReason, setVisitReason] = React.useState(
    formValue.visitReason || ""
  );
  const [webcamEnabled, setWebcamEnabled] = React.useState(false);
  const [dateOfInspection, setDateOfInspection] = React.useState(new Date());
  const [numberOfHouses, setNumberOfHouses] = React.useState(
    formValue.numberOfHouses || 0
  );
  const { latitude, longitude } = usePosition(true);
  const webcamRef = React.useRef(null);
  const [defaultImage, setDefaultImage] = React.useState(
    formValue.defaultImage ||
      "data:image/jpeg;base64,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"
  );
  const handleSubmit = async (op = "insert", id) => {
    const payload = {
      formType: "survey",
      userId: localStorage.getItem("userId"),
      body: {
        district,
        hud,
        block,
        village,
        habitation,
        placeType,
        dateOfInspection,
        defaultImage,
        positiveHouses,
        houseIndex,
        containers,
        containerIndex,
        breteauIndex,
        numberOfHouses
      }
    };
    await Http.submitVectorFormData(payload, op, id);
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setDefaultImage(imageSrc);
    setWebcamEnabled(false);
  }, [webcamRef]);

  const enableCamera = () => {
    setWebcamEnabled(true);
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
      });
    }
    if (fn === "placetype") {
      setPlaceType(targetVal);
    }
    if (fn === "visitType") {
      setVisitType(targetVal);
    }
    if (fn === "visitReason") {
      setVisitReason(targetVal);
    }
    if (fn === "numberofhouses") {
      setNumberOfHouses(targetVal);
      setHouseIndex((Number(positiveHouses) / Number(targetVal)) * 100);
    }
    if (fn === "positivehouses") {
      setPositiveHouses(targetVal);
      if (Number(targetVal) !== 0) {
        setHouseIndex((Number(targetVal) / Number(numberOfHouses)) * 100);
      }
    }
    if (fn === "houseindex") {
      setHouseIndex(targetVal);
    }
    if (fn === "containers") {
      setContainers(targetVal);
    }
    if (fn === "containerindex") {
      setContainerIndex(targetVal);
    }
    if (fn === "breteauindex") {
      setBreteauIndex(targetVal);
    }
  };

  return (stateProps.id ? (
    loaded
  ) : (
    districts.length
  )) ? (
    <div>
      <MuiThemeProvider>
        <Header title="New Entry" />
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
                <GridItem xs={12} sm={12} md={4}>
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
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Type of Visit
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      value={visitType}
                      onChange={handleChange.bind(null, "visitType")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {["First", "Follow Up"].map((i, idx) => (
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
                      {["Fever", "Dengue", "Mosquito Audit"].map((i, idx) => (
                        <MenuItem value={i} key={idx}>
                          {i}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  {webcamEnabled ? (
                    <div>
                      <Webcam
                        style={{ marginLeft: "46%" }}
                        audio={false}
                        height={300}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={200}
                        mirrored={true}
                        videoConstraints={videoConstraints}
                        // value={image}
                      />
                      <button
                        onClick={capture}
                        // style={{
                        //   marginLeft: "-9%"
                        // }}
                      >
                        Capture photo
                      </button>
                    </div>
                  ) : (
                    <div>
                      <img
                        src={defaultImage}
                        height={200}
                        width={200}
                        style={{
                          marginLeft: "46%"
                        }}
                      />
                      <button
                        onClick={enableCamera}
                        style={{
                          marginLeft: "-8%"
                        }}
                      >
                        Take Photo
                      </button>
                    </div>
                  )}
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} className={classes.padContainer}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Inspection Details</h4>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Number of Houses"
                    id="houses"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number",
                      value: numberOfHouses,
                      onChange: handleChange.bind(null, "numberofhouses")
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Number of Houses with breeding positive"
                    id="positivehouses"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number",
                      value: positiveHouses,
                      onChange: handleChange.bind(null, "positivehouses")
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Computed Indices - House Index"
                    id="houseindex"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number",
                      value: houseIndex,
                      onChange: handleChange.bind(null, "houseindex")
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Number of Container Inspected"
                    id="containers"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number",
                      value: containers,
                      onChange: handleChange.bind(null, "containers")
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Computed Indices - Container Index"
                    id="containerindex"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number",
                      value: containerIndex,
                      onChange: handleChange.bind(null, "containerindex")
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Computed Indices - Breteau Index"
                    id="breteauindex"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number",
                      value: breteauIndex,
                      onChange: handleChange.bind(null, "breteauindex")
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        <CardFooter
          style={{
            width: "100%"
          }}
        >
          <Button
            color="primary"
            style={{
              marginLeft: "50%"
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
    </div>
  ) : (
    <div>Loading...</div>
  );
}
